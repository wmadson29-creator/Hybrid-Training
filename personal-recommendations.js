/* Uses shared physiological signals inside a person's own schedule/equipment constraints. */
(()=>{'use strict';let b={};const cache=new Map(),clamp=(n,a,z)=>Math.max(a,Math.min(z,n));function bind(bridge){b=bridge}
 function revision(){return b.revision?.()||''}
 function recovery(date,job){const readiness=b.adaptiveReadiness(date),context=window.HybridPersonalTraining.context(date,job);return {readiness,context,blocked:!!(readiness.recoveryGuard||context.sickReturn),caution:!!(readiness.caution||context.verySore),reason:context.sickReturn?'Returning from illness: automatic training is reduced to recovery.':readiness.recoveryGuard?'Your recent recovery and training signals favor rest today.':context.verySore?'Marked soreness reduces the recommended dose.':readiness.caution?'Recovery signals favor a lighter dose today.':'Recovery signals allow the planned session.'}}
 function evidence(name,date){return b.strengthHistory(name,date)}
 function score(name,date,p){
  const key=revision()+'|'+date+'|'+name+'|'+p.progression;if(cache.has(key))return cache.get(key);
  const fp=b.utmFingerprint(name),fat=b.utmRecentFatigue(date,10).muscles||{},vol=b.utmEffectiveVolume(date,7)||{},cap=b.utmCapabilityState(name,date),credits=window.HybridTrainingEffects.muscleDoseMap(fp);let need=0,local=0;
  for(const [muscle,share]of Object.entries(credits)){if(share<.3)continue;const range=b.utmDoseResponseForMuscle(muscle,date),low=range.learned?range.low:4.5,high=range.learned?range.high:13;need+=share*(Math.max(0,low-(vol[muscle]||0))*.4-Math.max(0,(vol[muscle]||0)-high))}
  for(const [muscle,share]of Object.entries(fp.fatigueMuscles||fp.muscles||{}))local+=share*Math.max(0,(fat[muscle]||0)-.75);
  const painConstraint=b.v36131PainConstraintForExercise(name,date),pain=!!(painConstraint.suppress||painConstraint.penalty>0),value=need*(p.progression==='maintain'?.35:1)-local*3.2-(painConstraint.suppress?80:Number(painConstraint.penalty)||0)+(cap.exposures>0?Math.min(1,cap.confidence):0),out={value,local,need,pain,capability:cap,muscles:fp.muscles};
  cache.set(key,out);if(cache.size>1800)cache.clear();return out;
 }
 function order(rows,date,p){return rows.slice().sort((a,z)=>Number(!!a.untimedCoreFinisher)-Number(!!z.untimedCoreFinisher)||score(z.exercise,date,p).value-score(a.exercise,date,p).value||((window.HybridUserProfiles.hash(date+a.exercise)%100)-(window.HybridUserProfiles.hash(date+z.exercise)%100)))}
 function timing(rows,session,date){
  if(b.workoutTime){const t=b.workoutTime(rows,session);return {warmup:0,work:t.workMinutes,rest:t.restMinutes,setup:t.setupMinutes,total:t.estimatedMinutes}}
  return {warmup:0,work:0,rest:0,setup:0,total:0};
 }
 function estimate(rows,session,date){return timing(rows,session,date).total}
 function adapt(rows,session,date,job,p,options={}){
  const rec=recovery(date,job);if(rec.blocked)return [];
  const requested=Math.max(1,Number(job.minutes)||40),limit=Number(rec.context.timeBudget)>0?Math.min(requested,Number(rec.context.timeBudget)):requested,target=limit*.94,difficulty=rec.caution||p.experience==='beginner'?'easy':'medium',F=window.HybridSessionFatigue,circuit=session==='Strength-Endurance',maxSets=circuit?3:p.experience==='beginner'?3:p.experience==='intermediate'?4:5,maxRows=p.experience==='beginner'?10:12,maxTotal=p.experience==='beginner'?24:p.experience==='intermediate'?30:36,cap=F.budget({difficulty});
  function prepare(row){const last=evidence(row.exercise,date)[0],r=b.personalDose(row,last,date,p,job);if(!r)return null;const info=score(r.exercise,date,p);r.sets=clamp(Number(p.progression==='maintain'&&last?.sets?last.sets:r.sets)||2,1,maxSets);if(r.calibrationSetCap)r.sets=Math.min(r.sets,r.calibrationSetCap);if(rec.caution||info.local>2)r.sets=Math.max(1,r.sets-1);r.personalModel={fatiguePenalty:Math.round(info.local*100)/100,needScore:Math.round(info.need*100)/100,capabilityConfidence:info.capability.confidence||0,sharedRecovery:rec.readiness.level,painPenalty:info.pain};r.note=[r.note,rec.caution?rec.reason:'',info.local>1?'Recent overlapping work reduces this movement’s dose.':''].filter(Boolean).join(' ');return r}
  const out=order(rows.map(prepare).filter(Boolean),date,p),attempted=new Set(out.map(r=>r.exercise));if(circuit){const rounds=Math.min(...out.filter(r=>r.personalCircuit).map(r=>Number(r.sets)));for(const r of out)if(r.personalCircuit)r.sets=rounds}
  function project(raw){return b.v36161EvaluateSession(raw,{difficulty}).map(r=>{r.restSeconds=(Number.isFinite(Number(r.restSeconds))?Number(r.restSeconds):90)+(r.sessionFatigue?.extraRest||0);if(r.sessionFatigue?.scale<.99)r.reps=F.scaleReps(r.reps,r.sessionFatigue.scale);return r})}
  const muscles=row=>F.muscles(row,name=>window.HybridTrainingEffects.muscleDoseMap(b.utmFingerprint(name)));
  function canAdd(row,sets){const used={};let total=0;for(const r of out){total+=Number(r.sets)||0;for(const[m,v]of Object.entries(muscles(r)))used[m]=(used[m]||0)+Number(r.sets)*v}return total+sets<=maxTotal&&Object.entries(muscles(row)).every(([m,v])=>(used[m]||0)+sets*v<=cap+1e-8)}
  let fitted=project(out),steps=0,extraRowAllowance=0,canExpand=typeof options.recommendNext==='function';
  // Requested minutes guide the exercise mix as well as working sets. Both
  // maintenance and progression profiles receive this fit; load progression
  // remains governed by their separate goal and exact-exercise history.
  while(!rec.caution&&estimate(fitted,session,date)<target&&steps++<60){
   let changed=false;const desiredRows=Math.min(maxRows,Math.max(rows.length,Math.ceil(limit/7))+extraRowAllowance);
   if(canExpand&&out.filter(r=>!r.untimedCoreFinisher).length<desiredRows){
    const next=options.recommendNext(out,{excluded:[...attempted],available:name=>{const info=score(name,date,p);return !info.pain&&info.local<1.4&&canAdd({exercise:name},2)}});
    if(next){attempted.add(next.exercise);const row=prepare(next);if(!row)continue;row.sets=circuit?Number(out.find(r=>r.personalCircuit)?.sets)||2:Math.min(row.sets,Math.max(2,p.experience==='beginner'?2:3));if(!out.some(r=>r.exercise===row.exercise)&&canAdd(row,Number(row.sets))){const at=out.findIndex(r=>r.untimedCoreFinisher),trial=out.slice();trial.splice(at<0?trial.length:at,0,row);const evaluated=project(trial);if(estimate(evaluated,session,date)<=limit){out.splice(0,out.length,...trial);fitted=evaluated;changed=true}}}else canExpand=false;
   }
   if(changed)continue;
   const candidates=circuit?[]:out.filter(r=>!r.untimedCoreFinisher&&Number(r.sets)<Math.min(maxSets,r.calibrationSetCap||maxSets)&&score(r.exercise,date,p).local<1.4&&!score(r.exercise,date,p).pain&&canAdd(r,1)&&!(p.progression==='maintain'&&evidence(r.exercise,date)[0]?.sets&&Number(r.sets)>=Number(evidence(r.exercise,date)[0].sets))).sort((a,z)=>Number(a.sets)-Number(z.sets)||score(z.exercise,date,p).value-score(a.exercise,date,p).value);
   for(const candidate of candidates){candidate.sets++;const evaluated=project(out);if(estimate(evaluated,session,date)<=limit){fitted=evaluated;changed=true;break}candidate.sets--}
   if(!changed&&circuit){const ordinary=out.filter(r=>r.personalCircuit);if(ordinary.length&&ordinary.every(r=>Number(r.sets)<Math.min(maxSets,r.calibrationSetCap||maxSets)&&score(r.exercise,date,p).local<1.4)){const trial=out.map(r=>r.personalCircuit?{...r,sets:Number(r.sets)+1}:r),used={};let total=0;for(const r of trial){total+=Number(r.sets);for(const[m,v]of Object.entries(muscles(r)))used[m]=(used[m]||0)+Number(r.sets)*v}const evaluated=project(trial);if(total<=maxTotal&&Object.values(used).every(v=>v<=cap+1e-8)&&estimate(evaluated,session,date)<=limit){out.splice(0,out.length,...trial);fitted=evaluated;changed=true}}}
   if(!changed){if(canExpand&&out.filter(r=>!r.untimedCoreFinisher).length<desiredRows)continue;if(canExpand&&desiredRows<maxRows){extraRowAllowance++;continue}break}
  }
  // Re-evaluate after each trim so fatigue/rest and the displayed estimate
  // describe the actual final prescription rather than an earlier larger plan.
  while(estimate(fitted,session,date)>limit&&out.length){if(circuit){const ordinary=out.filter(r=>r.personalCircuit);if(ordinary.length&&Number(ordinary[0].sets)>1)ordinary.forEach(r=>r.sets--);else if(out.length>1)out.pop();else break;fitted=project(out);continue}const reducible=out.slice().reverse().find(r=>Number(r.sets)>1);if(reducible)reducible.sets--;else if(out.length>1)out.pop();else break;fitted=project(out)}
  const clock=timing(fitted,session,date),status=clock.total>=limit*.9?'fit':rec.caution||fitted.some(r=>r.personalModel.fatiguePenalty>1.4)?'recovery':'limited',reason=status==='fit'?'Built to fit your requested workout time.':status==='recovery'?'Recovery calls for a shorter workout today.':'Available exercises and useful training volume limit this session. More work would repeat covered movements or exceed the current training dose.';
  for(const r of fitted){let predicted={};try{predicted=b.utmPredictRpe(session,r.exercise,date,Math.max(1,b.trainingWeekForDate(b.parseLocalISO(date))),r)||{}}catch{}r.modelExpectedRpe=Number(predicted.rpe)||0;r.modelPredictionConfidence=Number(predicted.confidence)||0;r.modelPredictionVersion=b.predictionVersion?.()||0;if(r.personalCircuit)r.personalCircuitRounds=Number(r.sets);r.personalRequestedMinutes=requested;r.personalTimeBudget=limit;r.personalEstimatedMinutes=clock.total;r.personalTiming={...clock};r.personalDurationStatus=status;r.personalTimeReason=reason;r.personalSlotId=job.slotId||'';r.workoutLocation=job.location;r.targetReason=[r.targetReason||'', 'Selected for your available time and location using fatigue, recovery, useful volume and direct exercise history.'].filter(Boolean).join(' ')}return fitted;
 }
 window.HybridPersonalModel=Object.freeze({bind,recovery,score,order,timing,estimate,adapt,evidence});
})();
