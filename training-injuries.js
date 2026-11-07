/* Persistent joint/injury constraints. Planning heuristics, not diagnosis or rehabilitation. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.HybridInjuries=api;})(typeof self!=='undefined'?self:this,function(){
 'use strict';
 const REGIONS={knee:'Knee',hip:'Hip / groin',ankle:'Ankle / foot',back:'Back',shoulder:'Shoulder',elbow:'Elbow',wrist:'Wrist / hand',neck:'Neck',other:'Other / not sure'};
 const MOVEMENTS={knee_bend:'Squatting / bending the knee',hinge:'Hinging / bending forward',impact:'Running / jumping',leg_load:'Standing / leg loading',overhead:'Reaching / pressing overhead',push:'Pushing',pull:'Pulling',grip:'Gripping',support:'Weight on hands / arms',rotation:'Twisting',trunk:'Bracing / trunk work',kneeling:'Kneeling'};
 const FLAGS={weight_bearing:'Cannot bear weight or use the limb',swelling:'Large swelling, deformity or sudden severe pain',instability:'Locking, giving way or new instability',hot_joint:'Hot / red joint with fever or feeling unwell',nerve:'New numbness or weakness after an injury'};
 const iso=s=>typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(Date.parse(s+'T12:00:00Z'))&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s;
 function normalize(x={}){if(!x||typeof x!=='object'||!iso(x.startDate)||!REGIONS[x.region])return null;return {id:String(x.id||'').slice(0,100),region:x.region,side:['left','right','both','na'].includes(x.side)?x.side:'na',severity:['mild','moderate','severe'].includes(x.severity)?x.severity:'moderate',startDate:x.startDate,resolvedDate:iso(x.resolvedDate)&&x.resolvedDate>=x.startDate?x.resolvedDate:'',movements:[...new Set((Array.isArray(x.movements)?x.movements:[]).filter(k=>MOVEMENTS[k]))],painfulExercises:[...new Set((Array.isArray(x.painfulExercises)?x.painfulExercises:[]).map(s=>String(s).trim().slice(0,120)).filter(Boolean))].slice(0,20),redFlags:[...new Set((Array.isArray(x.redFlags)?x.redFlags:[]).filter(k=>FLAGS[k]))],notes:String(x.notes||'').slice(0,1000),updatedAt:Number(x.updatedAt)||0};}
 function active(records,date){return (Array.isArray(records)?records:[]).map(normalize).filter(x=>x&&x.startDate<=date&&(!x.resolvedDate||date<x.resolvedDate));}
 function traits(name,fp={}){
  const n=String(name||'').toLowerCase(),t=new Set(),add=(yes,...keys)=>{if(yes)keys.forEach(k=>t.add(k));},m=fp.moves||{},f=fp.fatigue||{};
  add(/squat|lunge|step[ -]?up|step[ -]?down|leg press|leg extension|wall sit|thruster|burpee|somersault/.test(n)||m.squat>.25||m.lunge>.25,'knee_bend','leg_load');
  add(/hinge|deadlift|\brdl\b|swing|clean|snatch|good morning|hip thrust|bridge|hamstring|leg curl|nordic/.test(n)||m.hinge>.25,'hinge','leg_load');
  add(/run|sprint|jump|hop|bound|pogo|box jump|burpee|skipping|basketball|pickleball|tennis|soccer|football|dance/.test(n)||f.impact>.35,'impact','leg_load','knee_bend');
  add(/walk|hike|cycle|cycling|bike|elliptical|stair|calf|soleus|tibialis|carry|march|standing|upright|gunslinger/.test(n),'leg_load');
  add(/overhead|shoulder press|strict press|push press|jerk|snatch|thruster|halo|pullover|pike|handstand|front raise|lateral raise|pull.up|pull-up|chin.up|pulldown/.test(n)||m.vPush>.25,'overhead');
  add(/press|push.up|push-up|dip|fly|pec|thruster/.test(n)||m.hPush>.25||m.vPush>.25,'push');
  add(/row|pull|chin|curl|clean|snatch|swing|high pull/.test(n)||m.hPull>.25||m.vPull>.25,'pull');
  add(/barbell|dumbbell|kettlebell|\bkb\b|\bdb\b|press|pull|row|curl|swing|clean|snatch|carry|grip|extension|raise|shrug|deadlift|rack|goblet/.test(n)||f.grip>.2,'grip');
  add(/push.up|push-up|plank|crawl|mountain climber|burpee|handstand|dip|renegade|ab wheel/.test(n),'support','trunk');
  add(/twist|rotation|rotate|corkscrew|helicopter|side.swing|around.the.world|windmill|wood.?chop/.test(n),'rotation','trunk');
  add(/core|ab |crunch|sit.up|sit-up|plank|dead bug|hollow|leg raise|knee raise|v.up|v-up|pullover|turkish|windmill/.test(n)||m.core>.25,'trunk');
  add(/kneeling|nordic|ab wheel|bird dog/.test(n),'kneeling');
  add(/swim|swimming|butterfly|breaststroke/.test(n),'leg_load','overhead','push','pull','trunk');
  add(/rower|rowing machine|ergometer/.test(n),'leg_load','knee_bend','hinge','pull','trunk');
  add(/clean|snatch|swing|thruster|push press|jerk|gunslinger|high pull/.test(n)||fp.powerDemand>.6,'ballistic');
  add(/squat|deadlift|bent.over|rdl|standing|carry|swing|clean|snatch|good morning|shrug|turkish/.test(n)||f.axial>.3,'spinal_load');
  add(/squat|deadlift|standing|bent.over|gorilla|rdl|swing|clean|snatch|carry|shrug|curl|upright row|front raise|triceps extension|helicopter|around.the.world/.test(n)&&!/seated|lying|floor|bench|supported/.test(n),'leg_load');
  return [...t];
 }
 const regionPatterns={knee:['knee_bend','impact','kneeling','leg_load'],hip:['hinge','knee_bend','impact','leg_load','rotation'],ankle:['leg_load','impact','kneeling'],back:['hinge','spinal_load','rotation','trunk','impact'],shoulder:['overhead','push','pull','support','grip'],elbow:['push','pull','grip','support'],wrist:['grip','support'],neck:['spinal_load','overhead','impact','trunk'],other:[]};
 function decision(name,records,date,fp={}){
  const concerns=active(records,date);if(!concerns.length)return {suppress:false,reduce:false,penalty:0,reasons:[],concerns:[],urgent:false};
  const ts=traits(name,fp),hits=[],reasons=[];let suppress=false,reduce=false,urgent=false;
  for(const x of concerns){
   const direct=x.painfulExercises.some(n=>n.toLowerCase()===String(name).toLowerCase()),trigger=x.movements.some(k=>ts.includes(k)),patterns=regionPatterns[x.region]||[],related=patterns.some(k=>ts.includes(k))||x.region==='other'||x.severity==='severe'&&['knee','hip','ankle'].includes(x.region)&&ts.includes('leg_load');
   // Concerning features hold all automatic training while the person seeks assessment.
   if(x.redFlags.length){urgent=true;suppress=true;hits.push(x.id);reasons.push(REGIONS[x.region]+': concerning symptoms reported; automatic training is held pending medical assessment.');continue;}
   if(!direct&&!trigger&&!related)continue;
   hits.push(x.id);const label=REGIONS[x.region]+(x.side==='na'?'':' ('+x.side+')');
   if(direct||trigger||x.severity!=='mild'||ts.includes('ballistic')||ts.includes('impact')||x.region==='other'){suppress=true;reasons.push(label+': '+(direct?'reported painful exercise':trigger?'reported aggravating movement':x.severity+' concern')+'; omit this movement.');}
   else{reduce=true;reasons.push(label+': mild concern; use a smaller, controlled dose only if pain-free. Stop if symptoms appear or worsen.');}
  }
  return {suppress,reduce:reduce&&!suppress,penalty:suppress?100:reduce?12:0,reasons,concerns:[...new Set(hits)],urgent};
 }
 function adaptRows(rows,records,date,fingerprint=()=>({})){
  if(!active(records,date).length)return rows;
  const adjusted=(rows||[]).flatMap(row=>{const d=decision(row.exercise,records,date,fingerprint(row.exercise));if(d.suppress)return [];if(!d.reduce||row.injuryAdjusted)return [{...row,injuryConstraint:d}];
   // A conservative dose heuristic, not a pain threshold or a rehabilitation prescription.
   const sets=Math.max(1,Math.floor((Number(row.sets)||1)*.6)),sd=row.setDetails?.slice(0,sets),note=d.reasons.join(' '),meta=row.rotatingPlan?{...row.rotatingPlan,format:'sets',group:'',setReps:(row.rotatingPlan.setReps||[]).slice(0,sets),totalReps:(row.rotatingPlan.setReps||[]).slice(0,sets).reduce((n,v)=>n+Number(v),0)}:undefined;
   return [{...row,sets,...(sd?{setDetails:sd}:{}),...(meta?{rotatingPlan:meta}:{}),alternatingGroup:'',kbCircuitPlan:undefined,injuryAdjusted:true,injuryConstraint:d,note:note+' '+(row.note||''),targetReason:note+' '+(row.targetReason||''),restSeconds:Math.max(90,Number(row.restSeconds)||0),...(row.conditioning?{injuryDurationScale:.6}:{}),kbIntent:undefined}];
  });
  const changed=adjusted.length!==(rows||[]).length||adjusted.some(r=>r.injuryAdjusted);
  if(!changed)return adjusted;
  // Removing a linked step or reducing its rounds breaks the original circuit contract.
  // Use coherent independent sets instead of silently retaining a partial complex.
  return adjusted.map(row=>{
   const linked=!!row.alternatingGroup||!!row.kbCircuitPlan||['complex','circuit','rep-target'].includes(row.rotatingPlan?.format);
   if(!linked)return row;
   const count=Number(row.sets)||row.setDetails?.length||1,setReps=(row.rotatingPlan?.setReps||[]).slice(0,count),meta=row.rotatingPlan?{...row.rotatingPlan,format:'sets',group:'',setReps,totalReps:setReps.reduce((n,v)=>n+Number(v),0)}:undefined;
   const note='Injury-adjusted controlled sets. Follow the displayed set and rep targets independently, with at least 90 seconds between working sets. This session does not use the original linked circuit, continuous complex or rep challenge. '+(row.injuryConstraint?.reasons||[]).join(' ');
   return {...row,alternatingGroup:'',kbCircuitPlan:undefined,...(meta?{rotatingPlan:meta}:{}),restSeconds:Math.max(90,Number(row.restSeconds)||0),note,targetReason:note+' '+(row.targetReason||''),...(row.kbSharedLoad?{kbSharedLoad:{...row.kbSharedLoad,goalSets:count}}:{})};
  });
 }
 return Object.freeze({REGIONS,MOVEMENTS,FLAGS,normalize,active,traits,decision,adaptRows});
});
