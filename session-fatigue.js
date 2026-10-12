/* Within-workout planning priors, not a measured fatigue percentage or safety threshold. */
(function(root){
 'use strict';
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 function muscles(row,resolve){const raw=resolve(row.exercise)||{},out={};for(const [m,v] of Object.entries(raw)){const n=clamp(Number(v)||0,0,1);if(n>=.15)out[m]=n>=.85?1:n*.5}return out}
 function overlap(a,b){let dot=0,aa=0,bb=0;for(const v of Object.values(a))aa+=v*v;for(const v of Object.values(b))bb+=v*v;for(const [m,v] of Object.entries(a))dot+=v*(b[m]||0);return aa&&bb?dot/Math.sqrt(aa*bb):0}
 function budget(profile={}){return ({easy:6,medium:8,hard:10,'very hard':12})[profile.difficulty]||8}
 function limit(rows,profile,resolve){const used={},out=[],cap=budget(profile),removed=[];for(const row of rows||[]){const weights=muscles(row,resolve);let sets=Math.max(1,Number(row.sets)||1);for(const [m,v] of Object.entries(weights))sets=Math.min(sets,Math.floor((cap-(used[m]||0)+1e-8)/v));if(sets<Math.min(2,Number(row.sets)||1)){removed.push(row.exercise);continue}const r={...row,sets};out.push(r);for(const [m,v] of Object.entries(weights))used[m]=(used[m]||0)+sets*v}return {rows:out,used,cap,removed,adjusted:removed.length>0||out.some((r,i)=>Number(r.sets)!==Number(rows[i]?.sets))}}
 function order(rows,resolve,score,priority){const pool=(rows||[]).map((r,i)=>({r,i,m:muscles(r,resolve),score:score(r)})),out=[],used={};let last={};while(pool.length){const ordinary=pool.filter(x=>!x.r.untimedCoreFinisher),eligible=ordinary.length?ordinary:pool;let best=eligible[0],value=-Infinity;for(const c of eligible){const local=Object.entries(c.m).reduce((s,[m,v])=>s+v*(used[m]||0),0),first=out.length===0&&priority?.(c.r)?85:0,rank=c.score+first-overlap(c.m,last)*70-local*3;if(rank>value){value=rank;best=c}}out.push(best.r);pool.splice(pool.indexOf(best),1);last=best.m;for(const [m,v] of Object.entries(last))used[m]=(used[m]||0)+Math.max(1,Number(best.r.sets)||1)*v}return out}
 function duration(row){
  const text=String(row.reps||''),n=Math.max(0,Number.parseFloat(text)||10),sides=/\/(?:\s*side|\s*leg|\s*arm)|per\s+(?:side|leg|arm)|each\s+(?:side|leg|arm)/i.test(text)?2:1;
  const timed=/\bsec(?:onds?)?\b|\bmin(?:utes?)?\b/i.test(text),seconds=timed?n*(/\bmin/i.test(text)?60:1):n*3;
  return {timed,sides,seconds:clamp(seconds*sides,0,600),dose:clamp(timed?seconds/30:n/10,.4,1.5)};
 }
 function rest(row){const n=Number(row.restSeconds??90);return Number.isFinite(n)?clamp(n,0,3600):90}
 function setRows(row){
  const details=Array.isArray(row.setDetails)?row.setDetails.filter(s=>s&&!/^(skipped|missed)$/i.test(s.status||'')&&Number.parseFloat(s.reps??row.reps)>0):null;
  if(Array.isArray(row.setDetails)&&row.setDetails.length)return details.map(s=>({...row,...s,setDetails:undefined}));
  return Array.from({length:clamp(Math.round(Number(row.sets)||0),0,100)},()=>row);
 }
 function effortFor(row,fallback){
  const rpe=Number(row.effectiveRpe)||Number(row.rpe),rir=String(row.rir??'');
  if(rpe>=1&&rpe<=10)return clamp((rpe-5)/3,.4,1.5);
  if(!duration(row).timed&&/^(?:[0-4]|5\+)$/.test(rir))return clamp((5-(rir==='5+'?5:Number(rir)))/3,.4,1.5);
  return fallback;
 }
 function evaluate(rows,resolve,profile={},resolveDemands=()=>({})){
  const residual={},shared={},used={},out=[],effort=({easy:.7,medium:1,hard:1.1,'very hard':1.2})[profile.difficulty]||1;
  const decay=(map,seconds)=>{const d=Math.pow(.5,Math.max(0,seconds)/720);for(const k of Object.keys(map))map[k]*=d};
  for(const row of rows||[]){
   if(row.conditioning||row.warmup||/^(skipped|missed)$/i.test(row.status||'')){out.push({...row,sessionFatigue:{exposure:0,localExposure:0,sharedExposure:0,scale:1,extraRest:0}});continue}
   const weights=muscles(row,resolve),demands=resolveDemands(row.exercise)||{},before=clamp(Number(row.restBeforeSeconds)||0,0,3600);decay(residual,before);decay(shared,before);
   const den=Object.values(weights).reduce((s,v)=>s+v*v,0),local=den?Object.entries(weights).reduce((s,[m,v])=>s+v*(residual[m]||0),0)/den:0;
   // Shared grip/bracing demands are separate from muscle volume and capped before
   // influencing a target. Coefficients and decay remain explicit planning priors.
   const sharedExposure=Math.min(2,Object.entries(demands).reduce((s,[k,v])=>s+clamp(Number(v)||0,0,1)*(shared[k]||0)*.25,0)),exposure=local+sharedExposure;
   const priorSets=Object.entries(weights).reduce((n,[m,v])=>Math.max(n,(used[m]||0)*v),0),scale=clamp(1-Math.max(0,exposure-1.5)*.025,.8,1),extraRest=exposure>2?Math.min(60,Math.ceil((exposure-2)*5/15)*15):0;
   const sets=setRows(row),plannedSeconds=sets.reduce((s,r)=>s+duration(r).seconds+rest(r)+extraRest,0);
   out.push({...row,sessionFatigue:{exposure:Math.round(exposure*100)/100,localExposure:Math.round(local*100)/100,sharedExposure:Math.round(sharedExposure*100)/100,priorSets:Math.round(priorSets*100)/100,scale,extraRest,estimatedSeconds:Math.round(plannedSeconds)}});
   for(const set of sets){const time=duration(set),dose=time.dose*effortFor(set,effort);for(const [m,v] of Object.entries(weights))residual[m]=(residual[m]||0)+v*dose;for(const [k,v] of Object.entries(demands))shared[k]=(shared[k]||0)+clamp(Number(v)||0,0,1)*dose;const seconds=time.seconds+rest(set)+extraRest;decay(residual,seconds);decay(shared,seconds)}
   for(const [m,v] of Object.entries(weights))used[m]=(used[m]||0)+v*sets.length;
  }return out;
 }
 const api=Object.freeze({muscles,overlap,budget,limit,order,duration,setRows,effortFor,evaluate});if(typeof module==='object'&&module.exports)module.exports=api;else root.HybridSessionFatigue=api;
})(typeof window==='undefined'?globalThis:window);
