/* Exact symmetric plate stacks; minimizes unload/load moves between lifts. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridBarbellPlates=api})(typeof window==='undefined'?null:window,function(){
 'use strict';
 const sizes=[55,45,25,10,5,2.5],cache=new Map();
 const sum=stack=>stack.reduce((n,p)=>n+p,0);
 function transition(from,to){let kept=0;while(kept<Math.min(from.length,to.length)&&from[kept]===to[kept])kept++;return {keep:to.slice(0,kept),remove:from.slice(kept).reverse(),add:to.slice(kept),moves:from.length+to.length-2*kept}}
 function less(a,b){if(!b)return true;for(let i=0;i<a.length;i++){if(a[i]!==b[i])return a[i]<b[i]}return false}
 function optimize(totals){
  if(!Array.isArray(totals)||totals.length<1||totals.length>3)return null;
  const units=totals.map(total=>(Number(total)-45)/5);
  if(units.some(n=>!Number.isFinite(n)||n<0||Math.abs(n-Math.round(n))>1e-7||n>400))return null;
  const key=totals.join('|');if(cache.has(key))return JSON.parse(JSON.stringify(cache.get(key)));
  const u=units.map(Math.round),max=Math.max(...u),coins=sizes.map(p=>p/2.5),dp=Array(max+1).fill(null);dp[0]=[];
  for(let n=1;n<=max;n++)for(let i=0;i<coins.length;i++)if(n>=coins[i]&&dp[n-coins[i]]){
   const candidate=[...dp[n-coins[i]],sizes[i]].sort((a,b)=>b-a);
   if(!dp[n]||candidate.length<dp[n].length)dp[n]=candidate;
  }
  let best=null,bestRank=null;
  function offer(stacks){
   if(stacks.some((stack,i)=>stack.length!==dp[u[i]].length))return;
   const changes=stacks.slice(1).map((to,i)=>transition(stacks[i],to)),moves=changes.reduce((n,c)=>n+c.moves,0),rank=[moves,Math.max(...stacks.map(s=>s.length)),stacks.reduce((n,s)=>n+s.length,0),stacks[0].length,...stacks.flatMap(s=>[...s.map(p=>-p),0])];
   if(less(rank,bestRank)){best={stacks:stacks.map(s=>s.slice()),changes,movesPerSide:moves,totalPlateMoves:moves*2};bestRank=rank}
  }
  if(u.length===1)offer([dp[u[0]]]);
  else if(u.length===2){
   for(let shared=0;shared<=Math.min(...u);shared++)offer([[...dp[shared],...dp[u[0]-shared]],[...dp[shared],...dp[u[1]-shared]]]);
  }else{
   // The two retained prefixes of the middle stack are necessarily nested.
   // Enumerate their shared weight and the longer prefix's extra weight.
   // Minimal-coin segments cover every possible exact stack without factorial
   // permutation enumeration, including a 55 outside a retained 45/25 base.
   for(let common=0;common<=Math.min(...u);common++)for(const longer of [0,2]){
    const limit=Math.min(u[1],u[longer])-common;
    for(let extra=0;extra<=limit;extra++){
     const base=dp[common],extension=dp[extra],long=[...base,...extension];
     const stacks=u.map((weight,i)=>i===1||i===longer?[...long,...dp[weight-common-extra]]:[...base,...dp[weight-common]]);
     offer(stacks);
    }
   }
  }
  best.totals=totals.map(Number);best.stacks.forEach((s,i)=>{if(Math.abs(sum(s)*2+45-best.totals[i])>1e-7)throw Error('Inexact plate layout')});
  cache.set(key,best);if(cache.size>150)cache.delete(cache.keys().next().value);
  return JSON.parse(JSON.stringify(best));
 }
 return Object.freeze({optimize,transition,sizes:Object.freeze(sizes)});
});
