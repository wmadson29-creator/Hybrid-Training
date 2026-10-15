/* Hybrid Training v36.137: decision integrity, migrations, dose comparison, and planning horizon. */
(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridDecisionIntegrity=Object.freeze(api);
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';

  const VERSION=1;
  const SCHEMA_VERSION=54;
  const record=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
  const finite=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;
  const clamp=(value,low,high)=>Math.max(low,Math.min(high,finite(value)));
  const clone=value=>{try{return JSON.parse(JSON.stringify(value))}catch(_error){return value}};
  const isoDate=value=>/^\d{4}-\d{2}-\d{2}$/.test(String(value||''));
  const dayDiff=(a,b)=>{
    if(!isoDate(a)||!isoDate(b))return 9999;
    return Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000);
  };

  function stableValue(value,seen=new WeakSet()){
    if(value===null||typeof value!=='object')return value;
    if(seen.has(value))return '[circular]';
    seen.add(value);
    if(Array.isArray(value))return value.map(item=>stableValue(item,seen));
    const out={};
    Object.keys(value).sort().forEach(key=>{
      if(value[key]!==undefined)out[key]=stableValue(value[key],seen);
    });
    return out;
  }

  function stableStringify(value){return JSON.stringify(stableValue(value))}

  function hashString(value){
    const text=String(value||'');let hash=2166136261;
    for(let i=0;i<text.length;i++){hash^=text.charCodeAt(i);hash=Math.imul(hash,16777619)}
    return (hash>>>0).toString(36).padStart(7,'0');
  }

  function evidenceRevision(evidence){return 'e'+VERSION+'-'+hashString(stableStringify(evidence||{}))}

  function snapshotValid(snapshot,currentRevision){
    return !!(snapshot?.session&&snapshot.evidenceRevision&&currentRevision&&snapshot.evidenceRevision===currentRevision);
  }

  function recommendationPreference(recommendation){
    const options=Array.isArray(recommendation?.options)?recommendation.options:[],scores=options.map(x=>finite(x?.score,NaN)).filter(Number.isFinite).sort((a,b)=>b-a),margin=scores.length>1?scores[0]-scores[1]:0;
    let label='Slight preference',level='low';
    if(margin>=9){label='Strong preference';level='high'}
    else if(margin>=3.5){label='Moderate preference';level='moderate'}
    return {label,level,margin:Math.round(margin*10)/10,n:scores.length};
  }

  function evidenceQuality(input={}){
    const logs=Math.max(0,finite(input.logs)),recovery=Math.max(0,finite(input.recoveryDays)),direct=Math.max(0,finite(input.directSessions)),feedback=Math.max(0,finite(input.feedback)),backtest=clamp(input.backtestQuality,0,1),coverage=clamp(input.coverage,0,1);
    const samples=clamp(logs/40,0,1)*.28+clamp(recovery/28,0,1)*.20+clamp(direct/8,0,1)*.24+clamp(feedback/8,0,1)*.08+backtest*.12+coverage*.08;
    const score=Math.round(clamp(samples,0,1)*100),label=score>=72?'Strong evidence':score>=42?'Moderate evidence':'Limited evidence';
    return {score,label,level:score>=72?'high':score>=42?'moderate':'low',counts:{logs,recoveryDays:recovery,directSessions:direct,feedback}};
  }

  function normalizeUnit(value){
    const unit=String(value||'').trim().toLowerCase();
    const aliases={rep:'reps',repetition:'reps',repetitions:'reps',round:'rounds',set:'sets',minute:'min',minutes:'min',mins:'min',second:'sec',seconds:'sec',yards:'yd',yard:'yd',meters:'m',meter:'m',kilometers:'km',kilometer:'km',miles:'mi',mile:'mi',length:'lengths'};
    return aliases[unit]||unit;
  }

  function doseNumber(value){
    const match=String(value??'').replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);
    return match?Number(match[0]):0;
  }

  function componentDoseProfile(actualComponents=[],plannedComponents=[]){
    const planned=Array.isArray(plannedComponents)?plannedComponents:[],actual=Array.isArray(actualComponents)?actualComponents:[],byId=new Map(),byName=new Map();
    planned.forEach((item,index)=>{
      const row={...item,index};
      if(item?.id)byId.set(String(item.id),row);
      const key=String(item?.planned||item?.label||'').trim().toLowerCase();if(key)byName.set(key,row);
    });
    const rows=actual.map((item,index)=>{
      const key=String(item?.planned||item?.label||'').trim().toLowerCase(),base=(item?.id&&byId.get(String(item.id)))||byName.get(key)||planned[index]||{},plannedDose=doseNumber(base?.plannedDose??item?.plannedDose),actualDose=doseNumber(item?.actualDose),plannedUnit=normalizeUnit(base?.doseUnit||item?.doseUnit),actualUnit=normalizeUnit(item?.actualDoseUnit||item?.doseUnit||base?.doseUnit),sameMovement=!item?.actual||!base?.planned||item.actual===base.planned,comparable=String(item?.actualDose??'').trim()!==''&&plannedDose>0&&actualDose>=0&&plannedUnit&&plannedUnit===actualUnit&&sameMovement,ratio=comparable?clamp(actualDose/plannedDose,0,3):null;
      return {id:String(item?.id||base?.id||'c'+(index+1)),plannedDose,actualDose,doseUnit:actualUnit||plannedUnit,comparable,ratio:ratio===null?null:Math.round(ratio*1000)/1000};
    });
    const comparable=rows.filter(row=>Number.isFinite(row.ratio)),ratio=comparable.length?comparable.reduce((sum,row)=>sum+row.ratio,0)/comparable.length:null;
    let relation='planned-unquantified';
    if(ratio!==null)relation=ratio<.82?'under':ratio>1.18?'over':'as-planned';
    else if(actual.some(item=>doseNumber(item?.actualDose)>0)&&!planned.some(item=>doseNumber(item?.plannedDose)>0))relation='unplanned';
    const substituted=actual.some(item=>item?.actual&&item?.planned&&item.actual!==item.planned&&!['skipped','missed'].includes(String(item.status||'').toLowerCase())),skipped=actual.filter(item=>['skipped','missed'].includes(String(item?.status||'').toLowerCase())).length;
    return {version:1,rows,comparable:comparable.length,total:rows.length,ratio:ratio===null?null:Math.round(ratio*1000)/1000,relation:substituted?'substituted':relation,substituted,skipped};
  }

  // Structured conditioning records targets separately from explicitly logged work.
  // Units are converted only within the same physical quantity and same movement.
  const STRUCTURE_UNITS=['reps','sec','min','m','yd','km','mi','rounds','sets','lengths'];
  const structureText=(value,max=500)=>String(value??'').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g,'').slice(0,max);
  function normalizeWorkoutStructure(value,{strict=false,planOnly=false}={}){
    if(value===undefined||value===null)return null;
    const fail=message=>{if(strict)throw new Error('Invalid workout structure: '+message);return null};
    if(!record(value)||value.version!==1||!Array.isArray(value.blocks)||value.blocks.length>16)return fail('blocks or version');
    const ids=new Set(),blocks=[];
    for(const [i,b] of value.blocks.entries()){
      if(!record(b)||!Array.isArray(b.steps)||b.steps.length>64||!Number.isInteger(Number(b.rounds))||Number(b.rounds)<1||Number(b.rounds)>200)return fail('block '+(i+1));
      const id=structureText(b.id||'b'+(i+1),40),stepIds=new Set(),steps=[];
      if(ids.has(id))return fail('duplicate block');ids.add(id);
      for(const [j,s] of b.steps.entries()){
        if(!record(s))return fail('step');
        const sid=structureText(s.id||'s'+(j+1),40),unit=normalizeUnit(s.unit||'reps');
        if(stepIds.has(sid)||!STRUCTURE_UNITS.includes(unit))return fail('step identity or unit');stepIds.add(sid);
        const dose=structureText(s.dose??'',40),pattern=Array.isArray(s.doses)?s.doses.map(x=>structureText(x,40)):[];
        if(pattern.length>200||[dose,...pattern].some(x=>x!==''&&(!Number.isFinite(Number(x))||Number(x)<0||Number(x)>1e7)))return fail('step amount');
        steps.push({id:sid,componentId:structureText(s.componentId,40),kind:s.kind==='rest'?'rest':'work',label:structureText(s.label,160),dose,unit,doses:pattern,perSide:s.perSide===true,load:structureText(s.load,120),cue:structureText(s.cue,500)});
      }
      blocks.push({id,label:structureText(b.label||'Block '+(i+1),160),mode:['rounds','ladder','amrap','sequence','intervals','until-distance'].includes(b.mode)?b.mode:'rounds',rounds:Number(b.rounds),capSeconds:clamp(b.capSeconds,0,86400),cue:structureText(b.cue,1000),steps});
    }
    if(blocks.reduce((n,b)=>n+b.rounds*b.steps.length,0)>2048)return fail('too many target steps');
    const out={version:1,activity:structureText(value.activity,240),source:structureText(value.source||'custom',24),prescription:structureText(value.prescription,3000),tracking:!planOnly&&value.tracking===true,blocks,entries:[]};
    if(planOnly)return out;
    if(value.entries!==undefined&&(!Array.isArray(value.entries)||value.entries.length>2048))return fail('entries');
    const entryIds=new Set();
    for(const e of value.entries||[]){
      if(!record(e))return fail('entry');
      const b=blocks.find(b=>b.id===e.blockId),s=b?.steps.find(s=>s.id===e.stepId),round=Number(e.round),id=structureText(e.id,120);
      if(!s||!Number.isInteger(round)||round<1||round>b.rounds||id!==b.id+':'+round+':'+s.id||entryIds.has(id))return fail('entry reference');entryIds.add(id);
      const dose=structureText(e.dose??'',40),unit=normalizeUnit(e.unit||s.unit),status=String(e.status||'');
      if(!STRUCTURE_UNITS.includes(unit)||!['','started','complete','partial','skipped'].includes(status)||dose!==''&&(!Number.isFinite(Number(dose))||Number(dose)<0||Number(dose)>1e7))return fail('entry amount, unit or status');
      const r={id,blockId:b.id,stepId:s.id,round,componentId:structureText(e.componentId||s.componentId,40),actual:structureText(e.actual,160),dose,unit,load:structureText(e.load,120),side:['both','left','right','total'].includes(e.side)?e.side:(s.perSide?'both':'total'),status,rpe:structureText(e.rpe,12),notes:structureText(e.notes,500),durationSeconds:structureText(e.durationSeconds??'',40)};
      if(r.rpe!==''&&(!Number.isFinite(Number(r.rpe))||Number(r.rpe)<1||Number(r.rpe)>10))return fail('entry effort');
      if(r.durationSeconds!==''&&(!Number.isFinite(Number(r.durationSeconds))||Number(r.durationSeconds)<0||Number(r.durationSeconds)>86400))return fail('entry time');
      for(const k of ['startedAt','completedAt','startedElapsedMs'])if(e[k]!==undefined){if(!Number.isFinite(Number(e[k]))||Number(e[k])<0||Number(e[k])>1e15)return fail('entry timestamp');r[k]=Number(e[k])}
      out.entries.push(r);
    }
    return out;
  }
  function structureSlots(value){
    const s=normalizeWorkoutStructure(value);if(!s)return [];
    const out=[];for(const b of s.blocks)for(let round=1;round<=b.rounds;round++)for(const step of b.steps){
      if(out.length>=2048)return out;
      out.push({...step,id:b.id+':'+round+':'+step.id,blockId:b.id,round,stepId:step.id,dose:step.doses.length?String(step.doses[(round-1)%step.doses.length]):step.dose});
    }return out;
  }
  function performedStructureEntries(value){
    const s=normalizeWorkoutStructure(value);if(!s?.tracking)return [];
    const byStep=new Map(s.blocks.flatMap(b=>b.steps.map(step=>[b.id+':'+step.id,step])));
    return s.entries.filter(e=>byStep.get(e.blockId+':'+e.stepId)?.kind!=='rest'&&['complete','partial'].includes(e.status)&&!(e.dose!==''&&Number(e.dose)===0));
  }
  function structureQuantity(value,unit){
    const u=normalizeUnit(unit),scales={sec:['time',1],min:['time',60],m:['distance',1],yd:['distance',.9144],km:['distance',1000],mi:['distance',1609.344]};
    const [kind,factor]=scales[u]||[u,1];return {kind,amount:Number(value)*factor};
  }
  function structureDoseProfile(value,plannedValue,components=[],actualMinutes=null){
    const s=normalizeWorkoutStructure(value),plan=normalizeWorkoutStructure(plannedValue)||s;
    if(!s||!plan)return null;
    const names=new Map((Array.isArray(components)?components:[]).map(c=>[c.id,c])),entries=new Map(s.entries.map(e=>[e.id,e])),slots=structureSlots(plan).filter(x=>x.kind!=='rest'),rows=[],variableBlocks=new Set(plan.blocks.filter(b=>['amrap','until-distance'].includes(b.mode)).map(b=>b.id));
    let substituted=false;
    for(const slot of slots){
      const e=entries.get(slot.id),c=names.get(slot.componentId)||{},actualName=e?.actual||c.actual||c.planned||'',plannedName=slot.label||c.planned||actualName,performed=e&&['complete','partial'].includes(e.status),sameMovement=!performed||!actualName||!plannedName||actualName===plannedName;
      if(performed&&!sameMovement)substituted=true;
      const p=structureQuantity(slot.dose,slot.unit),a=structureQuantity(e?.dose,e?.unit||slot.unit),sameLoad=!slot.load||String(e?.load||'')===slot.load;
      const known=!variableBlocks.has(slot.blockId)&&slot.dose!==''&&p.amount>0,zero=s.tracking&&(!e||['started','skipped',''].includes(e.status)||e.dose!==''&&Number(e.dose)===0),sideFactor=e?.side==='both'&&slot.perSide?1:slot.perSide?.5:1;
      const comparable=s.tracking&&known&&sameMovement&&sameLoad&&(zero||performed&&e.dose!==''&&p.kind===a.kind),ratio=comparable?(zero?0:clamp(a.amount*sideFactor/p.amount,0,3)):null;
      rows.push({id:slot.id,componentId:slot.componentId,comparable,ratio,performed:!!performed,substituted:performed&&!sameMovement});
    }
    let extraRatio=0;
    for(const e of s.entries.filter(e=>['complete','partial'].includes(e.status)&&!slots.some(slot=>slot.id===e.id))){
      const b=plan.blocks.find(b=>b.id===e.blockId),step=b?.steps.find(step=>step.id===e.stepId);if(!step||step.kind==='rest'||variableBlocks.has(b.id))continue;
      const c=names.get(step.componentId)||{},plannedName=step.label||c.planned,sameMovement=(!e.actual||!plannedName||e.actual===plannedName);if(!sameMovement){substituted=true;continue}
      const dose=step.doses.length?step.doses[(e.round-1)%step.doses.length]:step.dose,p=structureQuantity(dose,step.unit),a=structureQuantity(e.dose,e.unit);
      if(dose!==''&&p.amount>0&&e.dose!==''&&p.kind===a.kind)extraRatio+=clamp(a.amount/p.amount,0,3)*(step.perSide&&e.side!=='both'?.5:1);
    }
    const caps=plan.blocks.filter(b=>b.mode==='amrap'&&b.capSeconds>0),capSeconds=caps.reduce((n,b)=>n+b.capSeconds,0),capUnverified=capSeconds>0&&(caps.length>1||!(Number(actualMinutes)>0)),capIncomplete=capSeconds>0&&Number(actualMinutes)>0&&Number(actualMinutes)*60+1<capSeconds,capRatio=capSeconds>0&&!capUnverified?clamp(Number(actualMinutes)*60/capSeconds,0,3):null;
    const quantified=rows.filter(x=>x.comparable),ratio=quantified.length?clamp((quantified.reduce((n,x)=>n+x.ratio,0)+extraRatio)/quantified.length,0,3):capRatio,performed=performedStructureEntries(s),complete=!capIncomplete&&slots.length>0&&structureSlots(s).filter(x=>x.kind!=='rest').every(slot=>entries.get(slot.id)?.status==='complete');
    const completedAMRAP=s.activity==='AMRAP Circuit'&&capSeconds>0&&!capUnverified&&!capIncomplete&&performed.length>0;
    return {version:1,tracking:s.tracking,rows,ratio,capSeconds,capUnverified,capIncomplete,relation:substituted?'substituted':ratio===null?'planned-unquantified':ratio<.82?'under':ratio>1.18?'over':'as-planned',substituted,complete:completedAMRAP||complete,performed:performed.length,total:slots.length,quantified:quantified.length,coverage:rows.length?quantified.length/rows.length:0};
  }

  const PAIN_AREA_MUSCLES={
    shoulder:['shoulders','chest','triceps','upperBack','lats'],elbow:['biceps','triceps','grip'],wrist_hand:['grip','biceps','triceps'],chest:['chest','shoulders','triceps'],upper_back:['upperBack','lats','shoulders'],low_back:['core','glutes','hamstrings','hamHipExt'],hip_groin:['glutes','adductors','quads','hamstrings'],knee:['quads','hamstrings','glutes','calves'],ankle_achilles:['calves','gastroc','soleus','tibialis'],foot:['calves','tibialis'],other:[]
  };

  function painFlag(row){
    const level=String(row?.painLevel||'').toLowerCase(),reason=String(row?.changeReason||'').toLowerCase();
    return reason==='pain_discomfort'||level==='moderate'||level==='sharp-stop'||level==='sharp / stop';
  }

  function painConstraint(candidate={},rows=[],dateISO=''){
    const name=String(candidate?.name||'').toLowerCase(),muscles=new Set((candidate?.muscles||[]).map(x=>String(x))),related=new Set((candidate?.related||[]).map(x=>String(x).toLowerCase())),hits=[];
    for(const row of Array.isArray(rows)?rows:[]){
      if(!painFlag(row)||!isoDate(row?.date)||!isoDate(dateISO))continue;
      const age=dayDiff(row.date,dateISO);if(age<0||age>42)continue;
      if(finite(row?.painResolvedAt)>finite(row?.completedAt||row?.sessionTimestamp||0))continue;
      const exercise=String(row?.exercise||'').toLowerCase(),area=String(row?.painAreaKey||'other'),areaMuscles=PAIN_AREA_MUSCLES[area]||[],overlap=areaMuscles.some(m=>muscles.has(m));
      const direct=!!name&&exercise===name,relation=related.has(exercise),match=direct?1:relation?.72:overlap?.48:0;if(!match)continue;
      const sharp=/sharp|stop/.test(String(row?.painLevel||'').toLowerCase()),decay=Math.max(.12,1-age/(sharp?28:16)),weight=match*decay*(sharp?2.2:1.25);hits.push({row,age,sharp,weight,direct,area});
    }
    const score=hits.reduce((sum,x)=>sum+x.weight,0),recentSharp=hits.some(x=>x.sharp&&x.age<=14),repeated=hits.length>=2&&score>=1.15,suppress=recentSharp&&score>=1.2||repeated&&score>=1.65,penalty=Math.round(clamp(score*(suppress?8:5),0,24)*10)/10,reasons=[];
    if(recentSharp)reasons.push('A recent sharp-pain stop overlaps this movement. It stays available manually but is not an automatic pick yet.');
    else if(repeated)reasons.push('Repeated recent pain notes overlap this movement, so it is temporarily de-prioritized.');
    else if(hits.length)reasons.push('A recent pain note creates a temporary caution for this movement.');
    return {penalty,suppress,hits:hits.length,recentSharp,repeated,reasons,areas:[...new Set(hits.map(x=>x.area))]};
  }

  const REASON_RULES=[
    [/fixed|anchor/i,'Fits the fixed program schedule.'],
    [/recover|fatigue|readiness|fresh/i,'Matches current recovery and fatigue.'],
    [/run-specific|endurance|aerobic.*overdue|rolling.*run/i,'Protects endurance progress.'],
    [/speed|sprint|quality/i,'Addresses speed and hard-conditioning need.'],
    [/gym|strength.*variety|muscle/i,'Fills a strength-development need.'],
    [/equipment|pool|outdoor|travel|available/i,'Fits available equipment and location.'],
    [/tomorrow|next fixed|future|interference/i,'Fits the next scheduled workouts.'],
    [/actual|completed|under-plan|over-plan/i,'Reflects what was actually completed.'],
    [/feedback|prefer|rather/i,'Uses your prior recommendation feedback.']
  ];

  function summarizeReasons(reasons=[],limit=3){
    const source=(Array.isArray(reasons)?reasons:[]).filter(Boolean),short=[];
    for(const reason of source){
      const rule=REASON_RULES.find(([rx])=>rx.test(String(reason))),text=rule?rule[1]:String(reason).replace(/\s+/g,' ').trim();
      if(text&&!short.includes(text))short.push(text.length>140?text.slice(0,137)+'…':text);
      if(short.length>=limit)break;
    }
    return {short,details:source};
  }

  function recommendationDecision(input={}){
    const shown=input.shown||{},chosen=input.chosen||{};
    return {
      version:1,id:String(input.id||('decision-'+finite(input.at,Date.now()).toString(36))),date:String(input.date||''),at:finite(input.at,Date.now()),evidenceRevision:String(input.evidenceRevision||''),
      shownSession:String(shown.session||''),shownLabel:String(shown.label||shown.session||''),shownTarget:String(shown.target||''),shownScore:Number.isFinite(Number(shown.score))?Number(shown.score):null,
      chosenSession:String(chosen.session||''),chosenLabel:String(chosen.label||chosen.session||''),chosenTarget:String(chosen.target||''),choice:String(input.choice||'manual'),feedback:String(input.feedback||''),feedbackNote:String(input.feedbackNote||''),outcomeSessionId:String(input.outcomeSessionId||''),completedAt:finite(input.completedAt,0)||null
    };
  }

  function developmentHorizon(input={}){
    const start=String(input.startDate||''),weeks=clamp(Math.round(finite(input.weeks,3)),2,4),anchors=Array.isArray(input.anchors)?input.anchors:[],needs=record(input.needs)?input.needs:{},commitHours=72;
    const priorities=Object.entries(needs).map(([key,value])=>({key,value:finite(value)})).sort((a,b)=>b.value-a.value).slice(0,4),weeksOut=[];
    for(let index=0;index<weeks;index++)weeksOut.push({week:index+1,startOffsetDays:index*7,endOffsetDays:index*7+6,anchors:anchors.filter(x=>finite(x?.offsetDays)>=index*7&&finite(x?.offsetDays)<=index*7+6),priorities:priorities.map(x=>x.key)});
    return {version:1,startDate:start,weeks,commitHours,priorities,weeks:weeksOut,note:'Only the next 72 hours are treated as a firm adaptive commitment. Later flexible days are re-scored from completed work, recovery, and fixed anchors.'};
  }

  function selectRecoveryObservation(current,history=[],asOfTimestamp=null){
    if(asOfTimestamp===null||asOfTimestamp===undefined||asOfTimestamp==='')return current||null;
    const limit=Number(asOfTimestamp);if(!Number.isFinite(limit))return current||null;
    const rows=[...(Array.isArray(history)?history:[]),...(record(current)?[current]:[])].filter(record);
    return rows.filter(row=>finite(row.observedAt||row._savedAt,0)<=limit).sort((a,b)=>finite(a.observedAt||a._savedAt,0)-finite(b.observedAt||b._savedAt,0)).at(-1)||null;
  }

  function mergeDayContext(existing={},patch={},updatedAt=Date.now()){
    const prior=record(existing)?existing:{},change=record(patch)?patch:{},next={...prior,...change};
    if(Object.prototype.hasOwnProperty.call(change,'traveling')){
      next.traveling=!!change.traveling;
      if(next.traveling)next.environment='travel_indoor';
      else if(!Object.prototype.hasOwnProperty.call(change,'environment')&&next.environment==='travel_indoor')next.environment='normal';
    }
    if(Object.prototype.hasOwnProperty.call(change,'environment'))next.traveling=String(change.environment)==='travel_indoor';
    next.updatedAt=finite(updatedAt,Date.now());
    return next;
  }

  function dayContextSummary(context={}){
    if(!record(context))return {meaningful:false,parts:[],text:''};
    const parts=[],add=value=>{if(value&&!parts.includes(value))parts.push(value)},environment=String(context.environment||'');
    if(context.workoutLocation==='home')add('Primary at home');else if(context.workoutLocation==='gym')add('Primary at gym');
    if(context.traveling===true||environment==='travel_indoor')add('Traveling');
    else if(environment&&environment!=='normal')add(({hot:'Hot conditions',extreme_heat:'Extreme heat',poor_air:'Poor air',storms:'Storms'}[environment]||environment.replaceAll('_',' ')));
    if(context.sickReturn===true)add('Sick / returning');
    if(context.verySore===true)add('Very sore');
    if(context.limitedEquipment===true)add('Limited equipment');
    if(context.gymAccess==='no')add('No gym');else if(context.gymAccess==='on_site')add('Gym on-site');
    if(context.poolAccess==='no')add('No pool');else if(context.poolAccess==='yes')add('Pool available');
    if(context.gymEquipmentProfile)add(String(context.gymEquipmentProfile)+' equipment profile');
    const kb={none:'No kettlebells','40single':'40 lb kettlebell only','70single':'One 70 lb kettlebell','70pair':'Pair of 70 lb kettlebells'}[context.kbMode];if(kb)add(kb);
    const minutes=finite(context.timeBudget,0);if(minutes>0)add(Math.round(minutes)+' min available');
    if(context.timeOfDay&&context.timeOfDay!=='auto')add(String(context.timeOfDay).replace(/^./,x=>x.toUpperCase()));
    if(context.fedState&&context.fedState!=='auto')add(({fasted:'Fasted',light:'Light meal',fed:'Fed',full:'Very full'}[context.fedState]||String(context.fedState)));
    return {meaningful:parts.length>0,parts,text:parts.join(' • '),updatedAt:finite(context.updatedAt||context._savedAt,0)||null};
  }

  function normalizeEquipmentProfiles(settings){
    settings.gymAvailability=record(settings.gymAvailability)?settings.gymAvailability:{};
    settings.gymEquipmentProfiles=record(settings.gymEquipmentProfiles)?settings.gymEquipmentProfiles:{};
    if(!record(settings.gymEquipmentProfiles['Main Gym']))settings.gymEquipmentProfiles['Main Gym']={availability:clone(settings.gymAvailability),createdAt:Date.now()};
    if(!record(settings.gymEquipmentProfiles.Home))settings.gymEquipmentProfiles.Home={availability:{},createdAt:Date.now()};
    if(!record(settings.gymEquipmentProfiles.Travel))settings.gymEquipmentProfiles.Travel={availability:{},createdAt:Date.now()};
    const active=String(settings.activeGymEquipmentProfile||'Main Gym');settings.activeGymEquipmentProfile=settings.gymEquipmentProfiles[active]?active:'Main Gym';
    if(!record(settings.exerciseFavorites))settings.exerciseFavorites={};
  }

  function explicitSecondaryRow(row){
    const role=String(row?.secondarySessionRole||'').toLowerCase();
    return role==='short'||role==='full'||row?.isShortSecondary===true||row?.isFullSecondary===true||row?.adaptiveSecondaryBlock===true;
  }

  function repairHistoricalPrimaryIntent(input){
    const state=record(input)?input:{},settings=record(state.settings)?state.settings:(state.settings={}),logs=Array.isArray(state.logs)?state.logs:[],byDate={},repairs=[];
    logs.forEach(row=>{if(isoDate(row?.date))(byDate[row.date]||(byDate[row.date]=[])).push(row)});
    settings.workoutIntent=record(settings.workoutIntent)?settings.workoutIntent:{};
    settings.dayOverrides=record(settings.dayOverrides)?settings.dayOverrides:{};
    Object.entries(byDate).forEach(([date,rows])=>{
      const usable=rows.filter(row=>!['skipped','missed'].includes(String(row?.status||'complete').toLowerCase())),secondary=usable.filter(explicitSecondaryRow),primary=usable.filter(row=>!explicitSecondaryRow(row));
      if(!secondary.length||!primary.length)return;
      const primarySessions=[...new Set(primary.map(row=>String(row?.session||'').trim()).filter(Boolean))],secondarySessions=new Set(secondary.map(row=>String(row?.session||'').trim()).filter(Boolean));
      if(primarySessions.length!==1)return;
      const primarySession=primarySessions[0],intent=record(settings.workoutIntent[date])?settings.workoutIntent[date]:{},selected=String(intent.selectedSession||intent.session||''),override=String(settings.dayOverrides[date]||''),staleIntent=!!selected&&selected!==primarySession&&secondarySessions.has(selected),staleOverride=!!override&&override!==primarySession&&secondarySessions.has(override);
      if(!staleIntent&&!staleOverride)return;
      settings.workoutIntent[date]={...intent,originalSession:String(intent.originalSession||intent.originalScheduledSession||primarySession),selectedSession:primarySession,mode:'integrity-repair',label:'Completed '+primarySession,source:'schema-54',changedAt:finite(intent.changedAt,0)||Date.now()};
      if(staleOverride)settings.dayOverrides[date]=primarySession;
      repairs.push({date,primarySession,replacedSession:selected||override,reason:'secondary-only completion had replaced the completed primary'});
    });
    return {state,repairs,count:repairs.length};
  }

  function migrateState(input,target=SCHEMA_VERSION){
    const state=record(input)?input:{},settings=record(state.settings)?state.settings:(state.settings={}),applied=[],from=Math.max(0,Math.floor(finite(state.schemaVersion,0)));
    if(from<51){
      Object.values(record(settings.workoutIntent)?settings.workoutIntent:{}).forEach(intent=>{
        if(!record(intent))return;
        if(intent.selectedSession===undefined&&intent.session!==undefined)intent.selectedSession=intent.session;
        if(intent.originalSession===undefined&&intent.originalScheduledSession!==undefined)intent.originalSession=intent.originalScheduledSession;
      });
      applied.push(51);
    }
    if(from<52){
      settings.recoveryObservationHistory=record(settings.recoveryObservationHistory)?settings.recoveryObservationHistory:{};
      Object.entries(record(state.dailyRecovery)?state.dailyRecovery:{}).forEach(([date,row])=>{
        if(!record(row))return;
        const observedAt=finite(row.observedAt||row._savedAt,0);if(observedAt&&!row.observedAt)row.observedAt=observedAt;
        if(!row.observedTime&&observedAt)row.observedTime=new Date(observedAt).toISOString();
      });
      applied.push(52);
    }
    if(from<53){
      settings.recommendationDecisions=record(settings.recommendationDecisions)?settings.recommendationDecisions:{};
      normalizeEquipmentProfiles(settings);
      applied.push(53);
    }
    if(from<54){
      const repaired=repairHistoricalPrimaryIntent(state);
      if(repaired.count){
        settings.integrityRepairLog=Array.isArray(settings.integrityRepairLog)?settings.integrityRepairLog:[];
        settings.integrityRepairLog.push(...repaired.repairs.map(item=>({...item,appliedAt:Date.now(),schemaVersion:54})));
        settings.integrityRepairLog=settings.integrityRepairLog.slice(-100);
      }
      applied.push(54);
    }
    state.schemaVersion=Math.max(from,Math.min(target,SCHEMA_VERSION));
    if(state.schemaVersion<target)state.schemaVersion=target;
    return {state,from,to:state.schemaVersion,applied};
  }

  return Object.freeze({
    version:VERSION,schemaVersion:SCHEMA_VERSION,stableStringify,hashString,evidenceRevision,snapshotValid,recommendationPreference,evidenceQuality,
    normalizeUnit,doseNumber,componentDoseProfile,normalizeWorkoutStructure,structureSlots,performedStructureEntries,structureDoseProfile,painFlag,painConstraint,summarizeReasons,recommendationDecision,developmentHorizon,selectRecoveryObservation,mergeDayContext,dayContextSummary,migrateState,normalizeEquipmentProfiles,repairHistoricalPrimaryIntent
  });
});
