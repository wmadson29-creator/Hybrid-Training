/* Finite internal plates: minimum count at every target, then minimum ordered
   stack handling across the session. Stack arrays run retained base → access end. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridKbInternalStack=api})(typeof window==='undefined'?null:window,function(){
 'use strict';const cache=new Map();
 function transition(from,to){let kept=0;while(kept<Math.min(from.length,to.length)&&from[kept]===to[kept])kept++;return {keep:to.slice(0,kept),remove:from.slice(kept).reverse(),add:to.slice(kept),moves:from.length+to.length-2*kept}}
 function optimize(targets,inventory){
  const plates=inventory?.plates?.map(Number),base=Number(inventory?.baseKg);
  if(!targets?.length||!plates?.length||plates.length>16||!Number.isFinite(base)||base<=0||plates.some(p=>!Number.isFinite(p)||p<=0)||targets.some(t=>!Number.isFinite(Number(t))))return null;
  const key=JSON.stringify([targets,base,plates]);if(cache.has(key))return JSON.parse(JSON.stringify(cache.get(key)));
  const weights=new Float64Array(2**plates.length),counts=new Uint8Array(weights.length),wanted=targets.map(t=>Number(t)-base),candidates=wanted.map(()=>[]),minimum=wanted.map(()=>Infinity);
  for(let mask=0;mask<weights.length;mask++){
   if(mask){const bit=mask&-mask,i=31-Math.clz32(bit),rest=mask^bit;weights[mask]=weights[rest]+plates[i];counts[mask]=counts[rest]+1}
   wanted.forEach((w,i)=>{if(Math.abs(weights[mask]-w)>.0001)return;if(counts[mask]<minimum[i]){minimum[i]=counts[mask];candidates[i]=[]}if(counts[mask]===minimum[i])candidates[i].push(mask)})
  }
  if(minimum.some(n=>!Number.isFinite(n)))return null;
  // Every bottom plate has one contiguous lifetime. Enumerate interval splits
  // and shared bottom plates, memoizing by interval and consumed inventory.
  // This covers all ordered stacks without enumerating plate permutations.
  const memo=new Map();
  function solve(l,r,used){
   const tag=l+'|'+r+'|'+used;if(memo.has(tag))return memo.get(tag);
   for(let i=l;i<=r;i++)if(!candidates[i].some(mask=>(mask&used)===used)){memo.set(tag,null);return null}
   if(l===r){const mask=candidates[l].find(mask=>(mask&used)===used),stack=plates.map((p,i)=>({p,i})).filter(x=>(mask&~used)&(1<<x.i)).sort((a,b)=>b.p-a.p).map(x=>x.p),result={pushes:stack.length,stacks:[stack]};memo.set(tag,result);return result}
   if(Array.from({length:r-l+1},(_,i)=>minimum[l+i]-counts[used]).every(n=>n===0)){const result={pushes:0,stacks:Array.from({length:r-l+1},()=>[])};memo.set(tag,result);return result}
   let best=null;
   const available=[...new Set(plates.filter((_,i)=>!(used&(1<<i))))].sort((a,b)=>b-a);
   for(const p of available){const i=plates.findIndex((v,i)=>v===p&&!(used&(1<<i))),child=solve(l,r,used|(1<<i));if(child&&(!best||child.pushes+1<best.pushes))best={pushes:child.pushes+1,stacks:child.stacks.map(s=>[p,...s])}}
   for(let k=l;k<r;k++){const a=solve(l,k,used),b=solve(k+1,r,used);if(a&&b&&(!best||a.pushes+b.pushes<best.pushes))best={pushes:a.pushes+b.pushes,stacks:[...a.stacks,...b.stacks]}}
   memo.set(tag,best);return best;
  }
  const result=solve(0,targets.length-1,0);if(!result)return null;
  const changes=result.stacks.slice(1).map((s,i)=>transition(result.stacks[i],s)),out={stacks:result.stacks,counts:minimum,moves:changes.reduce((n,c)=>n+c.moves,0),changes};
  if(cache.size>=64)cache.delete(cache.keys().next().value);cache.set(key,out);return JSON.parse(JSON.stringify(out));
 }
 return Object.freeze({optimize,transition});
});
