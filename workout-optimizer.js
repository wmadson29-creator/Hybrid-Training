/* Explicit planning rules; inputs and completed work are never mutated. */
(function(root){'use strict';
 const F=typeof module==='object'&&module.exports?require('./session-fatigue'):root.HybridSessionFatigue;
 const A=typeof module==='object'&&module.exports?require('./actual-load-feedback-v36.126.js'):root.HybridActualLoadFeedback;
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 function observed(v){return v!==null&&v!==undefined&&String(v).trim()!==''&&Number.isFinite(Number(v));}
 function outcome(rows,effort){
  const performedEffort=r=>A.workingEffortRpe(r,effort);
  const usable=(rows||[]).filter(r=>!r.projectedForecast&&!r.projectedPlanRow&&!A.noPerformedWork(r));
  const evidence=usable.filter(r=>performedEffort(r)>0||observed(r.modelPredictionError)||/sloppy/i.test(r.technique||''));
  if(!evidence.length)return {known:false,score:null,rows:usable.length,evidenceRows:0};
  const pred=evidence.filter(r=>observed(r.modelPredictionError)).map(r=>Number(r.modelPredictionError));
  const rpes=evidence.map(performedEffort).filter(n=>n>0),bad=evidence.filter(r=>performedEffort(r)>=9.5||/sloppy/i.test(r.technique||'')).length;
  const mean=a=>a.length?a.reduce((s,v)=>s+v,0)/a.length:0;
  return {known:true,rows:usable.length,evidenceRows:evidence.length,coverage:evidence.length/Math.max(1,usable.length),badRate:bad/evidence.length,avgPredictionError:pred.length?mean(pred):null,avgRpe:rpes.length?mean(rpes):null,score:clamp(1-bad/evidence.length*1.4-Math.max(0,mean(pred))*.22-Math.max(0,mean(rpes)-8.5)*.14,0,1)};
 }
 function validate(samples){
  if(samples.length<6)return {validated:false,trainingSamples:Math.max(0,samples.length-2),heldOut:Math.min(2,samples.length),reason:'Need six observed dose/outcome windows, including two later validation windows.'};
  const train=samples.slice(0,-2),test=samples.slice(-2),good=train.filter(x=>x.outcome>=.62).map(x=>x.dose).sort((a,b)=>a-b);
  if(good.length<3)return {validated:false,trainingSamples:train.length,heldOut:2,reason:'Too few tolerated training windows.'};
  const low=good[Math.floor((good.length-1)*.25)],high=good[Math.floor((good.length-1)*.8)],comparable=test.filter(x=>x.dose>=low*.9&&x.dose<=high*1.1);
  return {validated:comparable.length===2&&comparable.every(x=>x.outcome>=.62),trainingSamples:train.length,heldOut:2,low,high,reason:'Check two later observed outcomes at comparable doses; no projected outcomes.'};
 }
 function penalties(parts){const local=Math.max(0,Number(parts.fatigue)||0),load=Math.max(0,Number(parts.volume)||0,Number(parts.budget)||0),recovery=Math.max(0,Number(parts.sleep)||0,Number(parts.deload)||0);return {total:local+load+recovery,local,load,recovery,avoided:Math.max(0,(parts.fatigue||0)+(parts.volume||0)+(parts.budget||0)+(parts.sleep||0)+(parts.deload||0)-local-load-recovery)};}
 function timeline(rows){
  const events=[],done=[];let i=0;
  const emit=(row,index)=>F.setRows(row).map((s,set)=>({...s,_row:index,_set:set,sets:1,setDetails:undefined}));
  while(i<rows.length){const row=rows[i],group=row.alternatingGroup;let end=i+1;
   if(group)while(end<rows.length&&rows[end].alternatingGroup===group)end++;
   const blocks=rows.slice(i,end).map((r,j)=>emit(r,i+j)),rounds=Math.max(0,...blocks.map(x=>x.length));
   for(let round=0;round<rounds;round++)for(const b of blocks)if(b[round]){const e=b[round];if(e.completedAt>0)done.push(e);else events.push(e)}
   i=end;
  }
  done.sort((a,b)=>a.completedAt-b.completedAt);
  let previousEnd=0;for(const e of done){e.restBeforeSeconds=previousEnd&&e.startedAt>previousEnd?(e.startedAt-previousEnd)/1000:0;e.restSeconds=0;previousEnd=e.completedAt;}
  return [...done,...events];
 }
 function evaluate(rows,resolve,profile,demands,fatigueMuscles){
  if(!rows.some(r=>r.alternatingGroup||r.setDetails?.some(s=>s.completedAt)))return F.evaluate(rows,resolve,profile,demands,fatigueMuscles);
  const events=timeline(rows),evaluated=F.evaluate(events,resolve,profile,demands,fatigueMuscles);
  return rows.map((r,i)=>{const pending=evaluated.filter(e=>e._row===i&&!e.completedAt),all=evaluated.filter(e=>e._row===i),pick=pending.length?pending:all;
   const first=pick[0]?.sessionFatigue||{exposure:0,localExposure:0,sharedExposure:0,priorSets:0,scale:1,extraRest:0};
   return {...r,sessionFatigue:{...first,estimatedSeconds:all.reduce((s,e)=>s+(e.sessionFatigue.estimatedSeconds||0),0)}};
  });
 }
 function shorten(rows,minutes,priority=()=>0){
  const out=rows.map(r=>({...r,setDetails:r.setDetails?.map(s=>({...s}))})),cap=Math.max(0,Number(minutes)||0)*60;
  const cost=r=>{const pending=F.setRows(r).filter(s=>!s.completedAt);return pending.length?pending.reduce((s,x)=>{const n=Number(x.restSeconds??r.restSeconds??90);return s+F.duration(x).seconds+(Number.isFinite(n)?Math.max(0,n):90)},0)+30:0};
  const before=out.reduce((s,r)=>s+cost(r),0);let seconds=before;
  const candidates=out.map((r,i)=>({r,i})).filter(x=>!x.r.pinned).sort((a,b)=>priority(a.r)-priority(b.r)||b.i-a.i);
  for(const {r} of candidates){while(seconds>cap&&cost(r)>0){
   const done=(r.setDetails||[]).filter(s=>s.completedAt),pending=(r.setDetails||[]).filter(s=>!s.completedAt),old=cost(r);
   if(pending.length){pending.pop();r.setDetails=[...done,...pending];r.sets=r.setDetails.length;}else if(done.length)break;else r.sets=Math.max(0,(Number(r.sets)||0)-1);
   if(Number(r.sets)===0)r.status='Skipped';seconds-=old-cost(r);
  }}
  return {rows:out,beforeSeconds:before,remainingSeconds:seconds,fits:seconds<=cap,omitted:out.filter((r,i)=>Number(r.sets)<Number(rows[i].sets)).map(r=>({exercise:r.exercise,setsRemoved:Math.max(0,Number(rows[out.indexOf(r)].sets)-Number(r.sets))}))};
 }
 const api=Object.freeze({outcome,validate,penalties,timeline,evaluate,shorten,observed});if(typeof module==='object'&&module.exports)module.exports=api;else root.HybridWorkoutOptimizer=api;
})(typeof window==='undefined'?globalThis:window);
