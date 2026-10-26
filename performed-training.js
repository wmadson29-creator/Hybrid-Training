/* Observed performance and uncertain stimulus interpretation. Planning priors,
   not measured energy-system percentages or laboratory threshold diagnoses. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridPerformedTraining=api;})(typeof globalThis==='undefined'?this:globalThis,function(){
 'use strict';
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,Number(x)||0)),num=x=>{const n=parseFloat(String(x??'').replace(',','.'));return Number.isFinite(n)?n:0},round=x=>Math.round(x*100)/100;
 function interpret(row={},context={}){
  const m=row.metrics||{},intent=String(row.modelPlannedExercise||row.exercise||''),label=String(row.exercise||''),cardio=!!context.cardio,rpe=clamp(context.rpe,0,10),minutes=Math.max(0,num(context.minutes??m.time??m.duration)),
   inactive=context.observed===false||row.warmup||row.isWarmup||/^(skipped|missed)$/i.test(row.status||'');
  const out={version:1,intent:{label,plannedExercise:intent,plannedEffort:num(row.modelPlannedExpectedRpe||row.modelExpectedRpe),plannedMinutes:num(row.modelPlannedDurationMinutes)},actual:{minutes,rpe,averageHr:num(context.hr??m.avgHr),watts:num(m.avgWatts),sets:num(context.sets??row.sets),reps:String(row.reps||'')},inferred:{domain:'unknown',confidence:0,basis:[],conflicts:[],speedSupported:false,mismatch:false},model:{effort:rpe||0,easyCredit:1,powerCredit:1,anaerobicWeight:null,systemicWeight:null},observed:!inactive};
  if(inactive){out.model={effort:0,easyCredit:0,powerCredit:0,anaerobicWeight:0,systemicWeight:0};return out;}
  if(!cardio){
   const reps=num(context.reps??row.reps),timed=/sec|min|\d+:\d{2}/i.test(row.reps||''),rests=(row.setDetails||[]).filter(s=>s&&!s.warmup&&!s.isWarmup&&!/skipped|missed/i.test(s.status||'')).slice(1).filter(s=>s&&!s.warmup&&!s.isWarmup&&!/skipped|missed/i.test(s.status||'')&&s.restSeconds!==''&&s.restSeconds!=null&&Number.isFinite(Number(s.restSeconds))&&Number(s.restSeconds)>=0).map(s=>Number(s.restSeconds)).sort((a,b)=>a-b);
   out.actual.restSeconds=rests.length?rests[Math.floor(rests.length/2)]:null;
   out.inferred={...out.inferred,domain:timed?'isometric/control':reps>15?'resistance endurance':reps>0&&reps<=6?'low-rep resistance':'resistance',confidence:rpe?.75:.35,basis:['Performed sets, reps or hold duration, load and exercise-specific effort determine resistance stimulus.']};
   out.inferred.mismatch=!!(num(row.modelPlannedSets)>0&&out.actual.sets!==num(row.modelPlannedSets)||row.modelPlannedReps&&String(row.modelPlannedReps)!==String(row.reps)||row.modelPlannedWeight&&String(row.modelPlannedWeight)!==String(row.weight));
   out.model.densityFatigue=rests.length?round(clamp(1+Math.max(0,60-out.actual.restSeconds)/300,1,1.18)):1;
   return out;
  }
  if(!(minutes>0)){out.inferred.basis.push('Observed duration is missing; intensity and dose remain uncertain.');out.model.powerCredit=0;return out;}
  const votes=[],vote=(domain,weight,basis)=>{votes.push({domain,weight});out.inferred.basis.push(basis)},p=context.hrProfile||{},hr=out.actual.averageHr,quality=clamp(context.hrReliability??.5,0,1),
   environmental=!!context.environmentalConfound||num(m.temperature)>=85||num(m.altitudeFt)>=5000,
   components=(context.components||[]).filter(c=>!c.skipped&&num(c.rpe)>0),known=components.filter(c=>num(c.rpe)>0),
   easyIntent=/\blss\b|easy|recovery/i.test(intent),speedIntent=/sprint|acceleration|short hills|speed.endurance/i.test(intent),
   intervalCount=num(m.intervals),workSeconds=num(context.workSeconds),actualInterval=intervalCount>0&&workSeconds>0;
  if(rpe>0)vote(rpe<=5.5?'low':rpe>=7.5?'high':'moderate',.75,'Recorded exercise effort');
  if(known.some(c=>num(c.rpe)<=5.5)&&known.some(c=>num(c.rpe)>=7.5))vote('mixed',.85,'Recorded components contain different efforts');
  const hrSupported=quality>=.55&&p.confidence>=.4&&(num(p.easyN)>=3||num(p.thresholdN)>=2),hrWeight=quality*clamp(p.confidence,0,.9)*(environmental?.45:1);
  if(hr>=70&&hr<=220&&hrSupported){
   if(p.thresholdHr>0&&num(p.thresholdN)>=2&&hr>=p.thresholdHr)vote('high',hrWeight,'Average HR above the personal observed threshold reference');
   else if(p.aerobicThresholdHr>0&&num(p.easyN)>=3&&hr<=p.aerobicThresholdHr)vote('low',hrWeight,'Average HR within the personal observed easy range');
   else if(p.aerobicThresholdHr>0&&hr>p.aerobicThresholdHr+5)vote('moderate',hrWeight,'Average HR above the personal observed easy range');
  }else if(hr>0){out.inferred.basis.push('HR alone lacks a sufficiently reliable personal reference');if(hr>=180)out.inferred.needsClarification=true;}
  const critical=num(context.criticalValue),observed=num(context.observedValue),ratio=critical>0&&observed>0?observed/critical:0;
  if(ratio>0&&context.criticalConfidence>=.5&&!environmental)vote(ratio<.84?'low':ratio>=.96?'high':'moderate',clamp(context.criticalConfidence,0,.8),'Comparable measured pace/power against the personal critical-performance estimate');
  if(environmental)out.inferred.basis.push('Heat/altitude can elevate HR; HR evidence receives less weight');
  const domains=[...new Set(votes.filter(v=>v.weight>=.25).map(v=>v.domain))];
  if(domains.includes('low')&&domains.includes('high'))out.inferred.conflicts.push('Effort and objective references disagree');
  if(votes.length){
   const mixed=votes.find(v=>v.domain==='mixed'),sorted=votes.slice().sort((a,b)=>b.weight-a.weight),best=mixed||sorted[0];
   if(!out.inferred.conflicts.length){out.inferred.domain=best.domain;out.inferred.confidence=round(clamp(best.weight+(votes.filter(v=>v.domain===best.domain).length-1)*.12,0,.92));}
   else {out.inferred.domain='uncertain';out.inferred.confidence=.3;}
  }
  const d=out.inferred.domain,c=out.inferred.confidence;
  // A sustained high-effort bout is not evidence of sprint mechanics or speed.
  out.inferred.speedSupported=!!(speedIntent&&actualInterval&&workSeconds<=35&&(rpe>=7.5||ratio>=1.15&&context.criticalConfidence>=.5)&&!out.inferred.conflicts.length);
  out.inferred.mismatch=!!(easyIntent&&d==='high'&&c>=.5||speedIntent&&d==='low'&&c>=.5||out.intent.plannedMinutes>0&&Math.abs(minutes-out.intent.plannedMinutes)>Math.max(5,out.intent.plannedMinutes*.3));
  out.model.powerCredit=speedIntent?(out.inferred.speedSupported?1:d==='unknown'?.2:d==='high'&&rpe>=7.5?.35:0):1;
  if(c>=.5&&['low','moderate','high','mixed'].includes(d)){
   if(!rpe)out.model.effort=d==='high'?7.5:d==='low'?4.5:6;
   out.model.easyCredit=d==='high'?.35:d==='mixed'?.6:d==='moderate'?.75:1;
   out.model.anaerobicWeight=d==='high'?(actualInterval?.65:.28):d==='mixed'?.4:d==='low'?.08:.18;
   out.model.systemicWeight=d==='high'?.68:d==='mixed'?.55:d==='low'?.28:.42;
  }
  if(out.inferred.conflicts.length){out.model.easyCredit=.7;out.model.powerCredit=speedIntent?0:1;}
  return out;
 }
 function fingerprint(fp,result){
  if(!result?.observed||result.inferred.confidence<.5||!result.model.anaerobicWeight&&result.model.anaerobicWeight!==0)return fp;
  const out={...fp,fatigue:{...fp.fatigue},moves:{...fp.moves}};
  out.fatigue.anaerobic=result.model.anaerobicWeight;out.fatigue.systemic=result.model.systemicWeight;
  // Aerobic cost remains present at high intensity. Impact and local anatomy
  // stay modality specific; a hard swim never acquires running-impact stress.
  out.fatigue.aerobic=Math.max(Number(fp.fatigue?.aerobic)||0,.5);
  if(/sprint|acceleration|short hills|speed.endurance/i.test(result.intent.label)){out.moves.power=(Number(out.moves.power)||0)*result.model.powerCredit;out.powerDemand=(Number(out.powerDemand)||0)*result.model.powerCredit;}
  return out;
 }
 return Object.freeze({interpret,fingerprint});
});
