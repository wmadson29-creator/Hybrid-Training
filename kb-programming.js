/* Fixed-hardware circuit reassessment. No time cap, exercise replacement, or
   automatic load progression. Load suggestions remain provisional until observed. */
(function(root,factory){const api=factory(typeof module==='object'&&module.exports?require('./muscle-model.js'):root.HybridMuscleModel);if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridKbProgramming=api;})(typeof globalThis==='undefined'?null:globalThis,function(M){
 'use strict';
 const technical=/get.up|snatch|high pull|gunslinger|corkscrew|clean|swing to press|thruster|push press/i;
 const delicate=/get.up|snatch|gunslinger|corkscrew|front raise|upright row|pullover|triceps extension/i;
 const accessory=/curl|raise|shrug|pullover|triceps extension|upright row/i;
 const plans={three:[
  [['Turkish Get-Up',2,1],['Single-Arm Snatch',3,3],['Double Clean & Press',3,4],['Double Pause Front Squat',3,8],['Double Floor Press',3,10],['Gorilla Row',3,8],['Seated Alternating Kettlebell Press',2,6],['Kettlebell Somersault Squat',2,10],['Two-Hand Kettlebell Biceps Curl',3,10],['Kettlebell Overhead Triceps Extension',2,10],['Double Kettlebell Standing Calf Raise',3,18],['Two-Hand Swing',3,15]],
  [['Double Clean',3,4],['Double Front Squat',4,6],['Alternating Double Kettlebell Floor Press',3,8],['Double RDL',4,10],['Double Bent-Over Row',4,8],['Feet-Elevated Kettlebell Push-Up',3,10],['Double Kettlebell Sumo Deadlift',3,10],['Double Kettlebell Suitcase Split Squat',3,8],['Double Kettlebell Shrug',3,15],['Kettlebell Hammer Curl',3,10],['Two-Hand Swing',3,15]],
  [['Single-Arm High Pull',3,5],['Kettlebell Gunslinger',2,4],['Kettlebell Corkscrew Swing',2,6],['Double Swing to Press',3,4],['Double Thruster',3,6],['Double Strict Press',3,6],['Renegade Row',3,6],['Goblet Squat',3,12],['Kettlebell Upright Row',2,10],['Two-Hand Kettlebell Front Raise',2,8],['Kettlebell Pullover',3,10],['Two-Hand Swing',3,15]]
 ],four:[
  [['Turkish Get-Up',2,1],['Single-Arm High Pull',3,5],['Double Clean & Press',3,4],['Double Floor Press',4,10],['Double Bent-Over Row',4,10],['Kettlebell Upright Row',3,10],['Two-Hand Kettlebell Biceps Curl',3,10],['Kettlebell Overhead Triceps Extension',3,10],['Kettlebell Crush Press',3,12],['Two-Hand Kettlebell Front Raise',2,8]],
  [['Double Clean',3,4],['Double Pause Front Squat',4,6],['Double Kettlebell Sumo Deadlift',4,10],['Double Kettlebell Suitcase Split Squat',3,8],['Double Kettlebell Standing Calf Raise',4,18],['Kettlebell Somersault Squat',3,10],['Goblet Squat',3,12],['Double RDL',4,10],['Double Reverse Lunge',3,8],['Two-Hand Swing',4,15]],
  [['Single-Arm Snatch',3,3],['Kettlebell Gunslinger',2,4],['Kettlebell Corkscrew Swing',2,6],['Double Swing to Press',3,4],['Double Thruster',3,6],['Renegade Row',3,6],['Seated Alternating Kettlebell Press',3,6],['Double Strict Press',3,6],['Kettlebell Pullover',3,10],['Kettlebell Hammer Curl',3,12],['Double Kettlebell Standing Calf Raise',3,18]],
  [['Double Front Squat',4,6],['Double Push Press',3,5],['Feet-Elevated Kettlebell Push-Up',4,10],['Gorilla Row',4,8],['Alternating Double Kettlebell Floor Press',4,8],['Double Kettlebell Shrug',3,15],['Double Bent-Over Row',3,10],['Two-Hand Swing',4,15]]
 ]};
 const phase=n=>/get.up/i.test(n)?0:technical.test(n)?1:/^Two-Hand Swing$/.test(n)?4:accessory.test(n)?3:2;
 function order(rows){
  const pool=rows.map((r,i)=>({r,i,p:M.profile(r.exercise)})),out=[];let last=null;
  while(pool.length){const earliest=Math.min(...pool.map(x=>phase(x.r.exercise))),eligible=pool.filter(x=>phase(x.r.exercise)===earliest);let best=eligible[0],score=-Infinity;
   for(const x of eligible){const similarity=last?M.similarity(x.p,last.p,'fatigue'):0,cumulative=out.reduce((s,y)=>s+M.similarity(x.p,y.p,'fatigue')*y.r.sets,0),strengthPriority=phase(x.r.exercise)===2?(/Double (?:Pause )?Front Squat/.test(x.r.exercise)?8:/Double RDL|Sumo Deadlift/.test(x.r.exercise)?5:/Floor Press|Bent-Over Row/.test(x.r.exercise)?4:/Split Squat|Lunge/.test(x.r.exercise)?2:0):0,rank=strengthPriority-similarity*6-cumulative*.12-x.i*.001;if(rank>score){score=rank;best=x;}}
   out.push(best);last=best;pool.splice(pool.indexOf(best),1);
  }
  // Small alternating blocks provide local recovery without changing a bell.
  let group=0;return out.map((x,i)=>{const prev=out[i-1],next=out[i+1],pair=phase(x.r.exercise)===2||phase(x.r.exercise)===3;let key='';if(pair&&prev?._group&&prev.r.sets===x.r.sets&&M.similarity(x.p,prev.p,'credits')<.45)key=prev._group;else if(pair&&next&&phase(next.r.exercise)===phase(x.r.exercise)&&next.r.sets===x.r.sets&&M.similarity(x.p,next.p,'credits')<.45)key='circuit-'+(++group);x._group=key;return {...x.r,group:key,slow:phase(x.r.exercise)<=1,restSeconds:60,kbIntent:/^Two-Hand Swing$/.test(x.r.exercise)?'conditioning':technical.test(x.r.exercise)?'power':accessory.test(x.r.exercise)?'hypertrophy':'strength'};});
 }
 function redesign(three,four){const old=[three,four],out={};for(const [index,key]of ['three','four'].entries()){const byName=new Map(old[index].flat().map(r=>[r.exercise,r])),wanted=new Set(byName.keys());out[key]=plans[key].map(day=>order(day.map(([exercise,sets,base])=>{if(!byName.has(exercise))throw Error('Unknown circuit exercise '+exercise);return {...byName.get(exercise),exercise,sets,base,light:false};})));const got=new Set(out[key].flat().map(r=>r.exercise));if(got.size!==wanted.size||[...wanted].some(n=>!got.has(n)))throw Error('Circuit exercise membership changed');}return out;}
 function settings(fourDay,slot){return {kg:((fourDay?[12,14,12,14]:[12,14,12])[slot]||12),role:(fourDay?['technical upper','lower strength','technical full body','full-body strength']:['technique and upper volume','compound strength','power and accessories'])[slot],provisional:true};}
 function chooseLoad(specs,choices,history=[],approvedKg=0,fallback=12){
  const available=[...new Set(choices.filter(n=>Number.isFinite(n)&&n>=12&&n<=32))].sort((a,b)=>a-b);if(!available.length)return {kg:0,conflicts:['Two heavy adjustable kettlebells are required.'],provisional:true};
  const evidence=specs.map(spec=>{const rows=history.filter(r=>r.exercise===spec.exercise&&(r.complete||r.bad)&&r.kg>0).slice(0,2);return {spec,rows};}),known=evidence.filter(x=>x.rows.length),ceilings=known.map(x=>Math.min(...x.rows.map(r=>r.kg))),limit=ceilings.length?Math.min(...ceilings):fallback;
  // An accepted block review is authoritative. Otherwise never infer a heavier
  // load from a different exercise or a prior day's slot after redistribution.
  const requested=approvedKg>0?approvedKg:Math.min(fallback,limit),kg=available.filter(n=>n<=requested+.01).at(-1)||available[0],conflicts=[];
  for(const {spec,rows}of evidence){if(rows.some(r=>r.kg<kg-.25||r.bad&&r.kg<=kg+.25))conflicts.push(spec.exercise+': the fixed daily setting exceeds recent clean/tolerated evidence.');else if(delicate.test(spec.exercise)&&!rows.some(r=>r.good&&!r.bad&&r.rpe>0&&r.rpe<=8&&r.kg>=kg-.25))conflicts.push(spec.exercise+': confirm controlled technique at '+kg+' kg before performing the prescribed sets.');}
  return {kg,provisional:known.length<specs.filter(s=>!/push.up/i.test(s.exercise)).length,conflicts,reason:approvedKg>0?'Saved block-review load.':known.length?'Constrained by exercise-specific completed results.':'Provisional starting setting; performance has not established suitability for every movement.'};
 }
 function loadConflicts(name,kg,history=[]){return delicate.test(name)&&!history.some(r=>r.exercise===name&&r.kg>=kg-.25&&r.good&&!r.bad&&r.rpe>0&&r.rpe<=8)?'Confirm controlled technique at this setting. If the empty heavy shell is too heavy, this exercise cannot be performed as prescribed with the available hardware. Keep the card, record the conflict, and revise the next workout’s setting; never change load mid-workout.':'';}
 return Object.freeze({redesign,order,settings,chooseLoad,loadConflicts,phase});
});
