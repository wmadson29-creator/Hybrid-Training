/* Within-workout planning priors, not a measured fatigue percentage or safety threshold. */
(function(root){
 'use strict';
 const A=typeof module==='object'&&module.exports?require('./actual-load-feedback-v36.126.js'):root.HybridActualLoadFeedback;
 const E=typeof module==='object'&&module.exports?require('./training-effects.js'):root.HybridTrainingEffects;
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 function muscles(row,resolve){const raw=resolve(row.exercise,row)||{},out={};for(const [m,v] of Object.entries(raw)){const n=clamp(Number(v)||0,0,1);if(n>0)out[m]=n}return out}
 function overlap(a,b){let dot=0,aa=0,bb=0;for(const v of Object.values(a))aa+=v*v;for(const v of Object.values(b))bb+=v*v;for(const [m,v] of Object.entries(a))dot+=v*(b[m]||0);return aa&&bb?dot/Math.sqrt(aa*bb):0}
 function budget(profile={}){return ({easy:6,medium:8,hard:10,'very hard':12})[profile.difficulty]||8}
 function limit(rows,profile,resolve){const used={},out=[],cap=budget(profile),removed=[];for(const row of rows||[]){if(row.conditioning||row.fatigueCardio){out.push({...row});continue}const weights=muscles(row,resolve);let sets=Math.max(1,Number(row.sets)||1);for(const [m,v] of Object.entries(weights))sets=Math.min(sets,Math.floor((cap-(used[m]||0)+1e-8)/v));if(sets<Math.min(2,Number(row.sets)||1)){removed.push(row.exercise);continue}const r={...row,sets};out.push(r);for(const [m,v] of Object.entries(weights))used[m]=(used[m]||0)+sets*v}return {rows:out,used,cap,removed,adjusted:removed.length>0||out.some((r,i)=>Number(r.sets)!==Number(rows[i]?.sets))}}
 function order(rows,resolve,score,priority){const pool=(rows||[]).map((r,i)=>({r,i,m:muscles(r,resolve),score:score(r)})),out=[],used={};let last={};while(pool.length){const ordinary=pool.filter(x=>!x.r.untimedCoreFinisher),eligible=ordinary.length?ordinary:pool;let best=eligible[0],value=-Infinity;for(const c of eligible){const local=Object.entries(c.m).reduce((s,[m,v])=>s+v*(used[m]||0),0),first=out.length===0&&priority?.(c.r)?85:0,rank=c.score+first-overlap(c.m,last)*70-local*3;if(rank>value){value=rank;best=c}}out.push(best.r);pool.splice(pool.indexOf(best),1);last=best.m;for(const [m,v] of Object.entries(last))used[m]=(used[m]||0)+Math.max(1,Number(best.r.sets)||1)*v}return out}
 function duration(row){
  if(row.fatigueCardio)return {timed:true,sides:1,seconds:clamp(Number(row.fatigueCardio.seconds)||0,0,86400),dose:0};
  const text=String(row.reps??''),n=text.trim()?Math.max(0,A.repQuantity(text)):10,sides=/\/(?:\s*side|\s*leg|\s*arm)|per\s+(?:side|leg|arm)|each\s+(?:side|leg|arm)/i.test(text)?2:1,timed=/\bsec(?:onds?)?\b|\bmin(?:utes?)?\b|^\s*\d+:\d{2}/i.test(text),seconds=timed?n:n*3;
  return {timed,sides,seconds:clamp(seconds*sides,0,600),dose:n>0?clamp(timed?seconds/30:n/10,.4,1.5):0};
 }
 function scaleReps(value,scale){const text=String(value??''),n=A.repQuantity(text);if(!(n>0)||!Number.isFinite(scale))return text;const v=Math.max(1,Math.floor(n*clamp(scale,0,1))),suffix=text.match(/\s*(?:\/|per\s+|each\s+)\s*(?:side|leg|arm)/i)?.[0]||'';return String(v)+(duration({reps:text}).timed?' sec':'')+suffix}
 function rest(row){const n=Number(row.restSeconds??90);return Number.isFinite(n)?clamp(n,0,3600):90}
 function setRows(row){
  if(row.warmup||row.isWarmup||/^(skipped|missed)$/i.test(row.status||''))return [];
  if(row.fatigueCardio)return duration(row).seconds>0?[{...row,setDetails:undefined}]:[];
  if(row.conditioning)return [];
  if(Array.isArray(row.setDetails)&&row.setDetails.length)return A.workingSetDetails(row).map(s=>{const logged=String(s.restSeconds??'').trim()!==''&&Number.isFinite(Number(s.restSeconds));return {...row,...s,reps:s.reps??row.reps,weight:String(s.weight??'').trim()?s.weight:row.weight,effectiveRpe:A.setEffortRpe(row,s,r=>Number(r.effectiveRpe)||A.effortRpe(r)),restSeconds:s.completedAt>0?0:row.restSeconds??90,restBeforeSeconds:logged?clamp(Number(s.restSeconds),0,3600):0,_detailRestBefore:logged,setDetails:undefined}});
  if(duration(row).dose===0)return [];
  return Array.from({length:clamp(Math.round(Number(row.sets)||0),0,100)},()=>row);
 }
 function effortFor(row,fallback){
  const rpe=A.effortRpe(row);
  if(rpe>=1&&rpe<=10)return clamp((rpe-5)/3,.4,1.5);
  return fallback;
 }
 function evaluate(rows,resolve,profile={},resolveDemands=()=>({}),resolveFatigue=null){
  const residual={},shared={},used={},out=[],effort=({easy:.7,medium:1,hard:1.1,'very hard':1.2})[profile.difficulty]||1;let previousExtraRest=0;
  const decay=(map,seconds)=>{const d=Math.pow(.5,Math.max(0,seconds)/720);for(const k of Object.keys(map))map[k]*=d};
  for(const row of rows||[]){
   if(row.warmup||row.isWarmup||/^(skipped|missed)$/i.test(row.status||'')){out.push({...row,sessionFatigue:{exposure:0,localExposure:0,sharedExposure:0,scale:1,extraRest:0,estimatedSeconds:0}});continue}
   const cardio=row.fatigueCardio,weights=muscles(row,resolveFatigue||resolve),demands=resolveDemands(row.exercise,row)||{},sets=setRows(row),detailed=!cardio&&Array.isArray(row.setDetails)&&row.setDetails.length>0,before=clamp(Number(row.restBeforeSeconds)||0,0,3600)+(row.restBeforeFallback&&!row.restBeforeIncludesFatigue?previousExtraRest:0)+(detailed&&sets[0]?._detailRestBefore?sets[0].restBeforeSeconds:0);decay(residual,before);decay(shared,before);
   const den=Object.values(weights).reduce((s,v)=>s+v*v,0),local=den?Object.entries(weights).reduce((s,[m,v])=>s+v*(residual[m]||0),0)/den:0;
   // Shared grip/bracing demands are separate from muscle volume and capped before
   // influencing a target. Coefficients and decay remain explicit planning priors.
   const sharedExposure=Math.min(2,Object.entries(demands).reduce((s,[k,v])=>s+clamp(Number(v)||0,0,1)*(shared[k]||0)*.25,0)),exposure=local+sharedExposure;
   const priorSets=Object.entries(weights).reduce((n,[m,v])=>Math.max(n,(used[m]||0)*v),0),scale=clamp(1-Math.max(0,exposure-1.5)*.025,.8,1),extraRest=exposure>2?Math.min(60,Math.ceil((exposure-2)*5/15)*15):0;
   const after=(set,i)=>set.completedAt>0||sets[i+1]?._detailRestBefore?0:rest(set)+(set.restIncludesFatigue?0:extraRest),plannedSeconds=sets.reduce((s,r,i)=>s+duration(r).seconds+after(r,i)+(detailed&&r._detailRestBefore?r.restBeforeSeconds:0),0)+before-(detailed&&sets[0]?._detailRestBefore?sets[0].restBeforeSeconds:0);
   out.push({...row,sessionFatigue:{exposure:Math.round(exposure*100)/100,localExposure:Math.round(local*100)/100,sharedExposure:Math.round(sharedExposure*100)/100,priorSets:Math.round(priorSets*100)/100,scale,extraRest,estimatedSeconds:Math.round(plannedSeconds),...(cardio?{conditioning:true,durationSource:cardio.source,effortLed:exposure>1.5}:{}),...(row.orderSource?{orderSource:row.orderSource}:{})}});
   if(cardio){
    // A continuous bout is one event, not resistance sets. Prior transient fatigue
    // decays during it; its own end-of-bout cost comes from the shared row model.
    const seconds=duration(row).seconds;decay(residual,seconds);decay(shared,seconds);
    if(seconds>0){for(const [m,v] of Object.entries(weights))residual[m]=(residual[m]||0)+v*Math.max(0,Number(cardio.acuteFatigue)||0);for(const [k,v] of Object.entries(demands))shared[k]=(shared[k]||0)+clamp(Number(v)||0,0,1)*Math.max(0,Number(cardio.domainDose?.[k]??cardio.acuteFatigue)||0);decay(residual,after(row,0));decay(shared,after(row,0));}
    previousExtraRest=extraRest;continue;
   }
   sets.forEach((set,i)=>{if(detailed&&i>0&&set._detailRestBefore){decay(residual,set.restBeforeSeconds);decay(shared,set.restBeforeSeconds)}const time=duration(set),measured=Number.isFinite(set.effectiveRpe)?set.effectiveRpe:A.setEffortRpe(set,set),rpe=measured>0?measured:clamp(5+effort*3,1,10),cost=E.setEffects({reps:A.repQuantity(set.reps),seconds:time.seconds/time.sides,timed:time.timed,rpe,strengthDemand:row.fatigueStrengthDemand??.4}),dose=cost.acuteFatigue*(row.fatigueScale??1);for(const [m,v] of Object.entries(weights))residual[m]=(residual[m]||0)+v*dose;for(const [k,v] of Object.entries(demands))shared[k]=(shared[k]||0)+clamp(Number(v)||0,0,1)*(k==='axial'?cost.fatigueChannels.mechanical*(row.fatigueScale??1):k==='anaerobic'?cost.fatigueChannels.metabolic*(row.fatigueScale??1):k==='technical'?(cost.fatigueChannels.coordination*(row.fatigueScale??1)+dose*.15):k==='systemic'?dose*.55+cost.fatigueChannels.metabolic*(row.fatigueScale??1)*.45:dose);const elapsed=set.completedAt>set.startedAt&&set.startedAt>0?(set.completedAt-set.startedAt)/1000:time.seconds,seconds=elapsed+after(set,i);decay(residual,seconds);decay(shared,seconds)});
   for(const [m,v] of Object.entries(weights))used[m]=(used[m]||0)+v*sets.length;previousExtraRest=extraRest;
  }return out;
 }
 const api=Object.freeze({muscles,overlap,budget,limit,order,duration,scaleReps,setRows,effortFor,evaluate});if(typeof module==='object'&&module.exports)module.exports=api;else root.HybridSessionFatigue=api;
})(typeof window==='undefined'?globalThis:window);
