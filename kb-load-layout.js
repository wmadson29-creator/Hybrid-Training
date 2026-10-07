/* Physical kettlebell allocation only: never change an exercise prescription. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridKbLoadLayout=api;
})(typeof window==='undefined'?null:window,function(){
  'use strict';
  const cache=new Map();
  const same=(a,b)=>Math.abs(a-b)<.001;
  const better=(a,b)=>!b||a.some((v,i)=>v!==b[i]&&a.slice(0,i).every((n,j)=>n===b[j])&&v<b[i]);
  // Changing the 40 lb dial is cheap. Prefer it over borrowing a 70 lb bell
  // when the expensive-adjustment count and exercise order are equivalent.
  const allocationRank=score=>[score[0],score[1],score[3],score[2]];
  function bellsFor(hardware){
    const bells=[];
    if(hardware.dial40?.length)bells.push({id:'dial40',label:'40 lb bell',kind:'dial',weights:hardware.dial40});
    for(let i=0;i<(hardware.heavyCount||0);i++)bells.push({id:'heavy'+(i+1),label:'70 lb bell '+(i+1),kind:'heavy',weights:hardware.heavyWeights||[]});
    return bells;
  }
  function assignments(row,bells){
    const eligible=bells.map((b,i)=>b.weights.some(kg=>same(kg,row.kg))?i:-1).filter(i=>i>=0);
    if(row.load!=='double')return eligible.flatMap(i=>{
      const spare=eligible.find(j=>j!==i&&bells[i].kind==='heavy'&&bells[j].kind==='heavy');
      // A forthcoming paired movement may use the same load. Preparing the
      // spare now avoids another adjustment break without moving exercises.
      return spare===undefined?[[i]]:[[i],[i,spare]];
    });
    const out=[];
    for(let i=0;i<eligible.length;i++)for(let j=i+1;j<eligible.length;j++){
      const a=eligible[i],b=eligible[j];
      // Doubles use the matched 70 lb pair, never a mismatched 40/70 pair.
      if(bells[a].kind==='heavy'&&bells[b].kind==='heavy')out.push([a,b]);
    }
    return out;
  }
  function allocate(rows,order,bells){
    let states=new Map([['start',{kg:bells.map(()=>null),score:[0,0,0,0],steps:[]}]]);
    for(const index of order){
      const next=new Map(),row=rows[index];
      for(const path of states.values())for(const use of assignments(row,bells)){
        const kg=path.kg.slice(),score=path.score.slice(),actions=[];let changedHeavy=false;
        for(const i of use){
          const initial=kg[i]===null,changed=!initial&&!same(kg[i],row.kg);
          if(changed){if(bells[i].kind==='heavy'){score[0]++;changedHeavy=true}else score[2]++}
          actions.push({id:bells[i].id,label:bells[i].label,kind:bells[i].kind,kg:row.kg,from:kg[i],action:initial?'set':changed?'adjust':'keep'});
          kg[i]=row.kg;
        }
        if(changedHeavy)score[1]++;
        if(row.load!=='double'&&bells[use[0]].kind==='heavy')score[3]++;
        const key=kg.join('|'),candidate={kg,score,steps:[...path.steps,{index,actions}]};
        if(better(allocationRank(score),next.has(key)?allocationRank(next.get(key).score):null))next.set(key,candidate);
      }
      states=next;
      if(!states.size)return null;
    }
    let best=null;
    for(const path of states.values())if(better(allocationRank(path.score),best?allocationRank(best.score):null))best=path;
    return best;
  }
  function permutations(items){
    if(items.length<2)return [items];
    return items.flatMap((item,i)=>permutations(items.filter((_,j)=>i!==j)).map(rest=>[item,...rest]));
  }
  function layout(rows,hardware,{group=true}={}){
    if(!rows.length||rows.some(r=>!Number.isFinite(r.kg)||r.kg<=0))return null;
    const key=JSON.stringify([rows.map(r=>[r.kg,r.load,r.conditioning]),hardware,group]);
    if(cache.has(key))return JSON.parse(JSON.stringify(cache.get(key)));
    const bells=bellsFor(hardware),original=rows.map((_,i)=>i),baseline=allocate(rows,original,bells);
    if(!baseline)return null;
    // Preserve the leading movement and the final conditioning block. Bounded
    // enumeration is small for the four/five-movement presets, never a circuit.
    const strength=original.filter(i=>!rows[i].conditioning),conditioning=original.filter(i=>rows[i].conditioning);
    const mayGroup=group&&rows.length<=7&&strength[0]===0&&conditioning.every((i,j)=>i===strength.length+j);
    const orders=mayGroup?permutations(strength.slice(1)).map(order=>[0,...order,...conditioning]):[original];
    let selected=baseline,order=original,score=[baseline.score[0],baseline.score[1],0,baseline.score[3],baseline.score[2]];
    for(const candidateOrder of orders){
      const path=allocate(rows,candidateOrder,bells);if(!path)continue;
      const distance=candidateOrder.reduce((n,index,i)=>n+Math.abs(index-i),0),rank=[path.score[0],path.score[1],distance,path.score[3],path.score[2]];
      if(better(rank,score)){selected=path;order=candidateOrder;score=rank}
    }
    const initialized=new Map();
    selected.steps.forEach(step=>step.actions.forEach(a=>{if(!initialized.has(a.id))initialized.set(a.id,{id:a.id,label:a.label,kind:a.kind,kg:a.kg})}));
    const result={order,steps:selected.steps,initialSetup:[...initialized.values()],heavyChanges:selected.score[0],heavyEvents:selected.score[1],dialChanges:selected.score[2],originalHeavyChanges:baseline.score[0],originalHeavyEvents:baseline.score[1],reordered:order.some((n,i)=>n!==i)};
    cache.set(key,result);if(cache.size>200)cache.delete(cache.keys().next().value);
    return JSON.parse(JSON.stringify(result));
  }
  return Object.freeze({layout});
});
