/* Hybrid Training v36.131: decision integrity, migrations, dose comparison, and planning horizon. */
(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridDecisionIntegrity=Object.freeze(api);
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';

  const VERSION=1;
  const SCHEMA_VERSION=53;
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
      const key=String(item?.planned||item?.label||'').trim().toLowerCase(),base=(item?.id&&byId.get(String(item.id)))||byName.get(key)||planned[index]||{},plannedDose=doseNumber(item?.plannedDose??base?.plannedDose),actualDose=doseNumber(item?.actualDose),plannedUnit=normalizeUnit(item?.doseUnit||base?.doseUnit),actualUnit=normalizeUnit(item?.actualDoseUnit||item?.doseUnit||base?.doseUnit),comparable=plannedDose>0&&actualDose>=0&&plannedUnit&&plannedUnit===actualUnit,ratio=comparable?clamp(actualDose/plannedDose,0,3):null;
      return {id:String(item?.id||base?.id||'c'+(index+1)),plannedDose,actualDose,doseUnit:actualUnit||plannedUnit,comparable,ratio:ratio===null?null:Math.round(ratio*1000)/1000};
    });
    const comparable=rows.filter(row=>Number.isFinite(row.ratio)),ratio=comparable.length?comparable.reduce((sum,row)=>sum+row.ratio,0)/comparable.length:null;
    let relation='planned-unquantified';
    if(ratio!==null)relation=ratio<.82?'under':ratio>1.18?'over':'as-planned';
    else if(actual.some(item=>doseNumber(item?.actualDose)>0)&&!planned.some(item=>doseNumber(item?.plannedDose)>0))relation='unplanned';
    return {version:1,rows,comparable:comparable.length,total:rows.length,ratio:ratio===null?null:Math.round(ratio*1000)/1000,relation};
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

  function normalizeEquipmentProfiles(settings){
    settings.gymAvailability=record(settings.gymAvailability)?settings.gymAvailability:{};
    settings.gymEquipmentProfiles=record(settings.gymEquipmentProfiles)?settings.gymEquipmentProfiles:{};
    if(!record(settings.gymEquipmentProfiles['Main Gym']))settings.gymEquipmentProfiles['Main Gym']={availability:clone(settings.gymAvailability),createdAt:Date.now()};
    if(!record(settings.gymEquipmentProfiles.Home))settings.gymEquipmentProfiles.Home={availability:{},createdAt:Date.now()};
    if(!record(settings.gymEquipmentProfiles.Travel))settings.gymEquipmentProfiles.Travel={availability:{},createdAt:Date.now()};
    const active=String(settings.activeGymEquipmentProfile||'Main Gym');settings.activeGymEquipmentProfile=settings.gymEquipmentProfiles[active]?active:'Main Gym';
    if(!record(settings.exerciseFavorites))settings.exerciseFavorites={};
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
    state.schemaVersion=Math.max(from,Math.min(target,SCHEMA_VERSION));
    if(state.schemaVersion<target)state.schemaVersion=target;
    return {state,from,to:state.schemaVersion,applied};
  }

  return Object.freeze({
    version:VERSION,schemaVersion:SCHEMA_VERSION,stableStringify,hashString,evidenceRevision,snapshotValid,recommendationPreference,evidenceQuality,
    normalizeUnit,doseNumber,componentDoseProfile,painFlag,painConstraint,summarizeReasons,recommendationDecision,developmentHorizon,migrateState,normalizeEquipmentProfiles
  });
});
