/* User-approved repeating three-week kettlebell circuit. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridKbCircuit=api;})(typeof globalThis==='undefined'?null:globalThis,function(){
 'use strict';
 const row=(exercise,sets,base,group='',side=false,slow=false,light=false)=>({exercise,sets,base,group,side,slow,light});
 const three=[
  [row('Turkish Get-Up',2,1,'',true,true,true),row('Single-Arm High Pull',2,4,'',true,true),row('Double Clean & Press',2,3,'',false,true),row('Two-Hand Swing',3,10),row('Double Pause Front Squat',3,6,'main'),row('Double Floor Press',3,6,'main'),row('Double Bent-Over Row',3,8,'main'),row('Double Strict Press',2,5,'accessory'),row('Double Kettlebell Standing Calf Raise',2,12,'accessory'),row('Two-Hand Kettlebell Biceps Curl',2,8,'accessory')],
  [row('Kettlebell Gunslinger',2,4,'',true,true),row('Double Clean',2,3,'',false,true),row('Double Thruster',2,4,'',false,true),row('Double Kettlebell Sumo Deadlift',3,8,'main'),row('Feet-Elevated Kettlebell Push-Up',3,6,'main'),row('Renegade Row',3,4,'main',true),row('Seated Alternating Kettlebell Press',2,5,'press-legs',true),row('Double Kettlebell Suitcase Split Squat',2,6,'press-legs',true),row('Kettlebell Upright Row',2,8,'arms'),row('Kettlebell Overhead Triceps Extension',2,8,'arms')],
  [row('Single-Arm Snatch',2,3,'',true,true),row('Double Swing to Press',2,3,'',false,true),row('Kettlebell Corkscrew Swing',2,5,'',true,true),row('Double Front Squat',3,6,'main'),row('Alternating Double Kettlebell Floor Press',3,6,'main',true),row('Double RDL',3,8,'main'),row('Two-Hand Kettlebell Front Raise',2,8,'accessory'),row('Goblet Squat',2,8,'accessory'),row('Double Kettlebell Shrug',2,12,'accessory'),row('Kettlebell Pullover',2,8,'accessory'),row('Kettlebell Hammer Curl',2,8,'accessory')]
 ];
 // Repeated foundations supplement the 31; nothing is removed to make room.
 const originalNames=three.flat().map(x=>x.exercise);
 three[0].push(three[0].splice(3,1)[0]);
 three[1].splice(6,0,row('Double Floor Press',3,6,'main'));
 three[1].splice(5,0,row('Gorilla Row',3,6,'main',true));
 // Separate the two rowing movements with chest pressing inside the circuit.
 const floorB=three[1].splice(7,1)[0];three[1].splice(6,0,floorB);
 three[1].push(row('Two-Hand Swing',3,10));
 three[2].splice(6,0,row('Double Bent-Over Row',3,8,'main'));
 three[2].push(row('Double Kettlebell Standing Calf Raise',2,12,'accessory'));
 three[2].push(row('Two-Hand Swing',3,10));
 const byName=new Map(three.flat().map(x=>[x.exercise,x]));
 const names=list=>list.map(n=>({...byName.get(n)}));
 // All 31 remain. The fourth day adds push presses, Gorilla rows and reverse
 // lunges, plus a few repeat exposures to the established compound movements.
 const four=[
  names(['Turkish Get-Up','Single-Arm High Pull','Double Clean & Press','Double Floor Press','Double Bent-Over Row','Double Strict Press','Kettlebell Upright Row','Two-Hand Kettlebell Biceps Curl','Kettlebell Overhead Triceps Extension']),
  [...names(['Kettlebell Gunslinger','Double Pause Front Squat','Double Kettlebell Sumo Deadlift','Double Kettlebell Suitcase Split Squat','Double Kettlebell Standing Calf Raise','Two-Hand Swing','Goblet Squat','Double RDL']),row('Double Reverse Lunge',2,6,'accessory',true)],
  names(['Single-Arm Snatch','Double Clean','Double Thruster','Renegade Row','Seated Alternating Kettlebell Press','Alternating Double Kettlebell Floor Press','Kettlebell Pullover','Double Kettlebell Shrug','Two-Hand Kettlebell Front Raise','Kettlebell Hammer Curl']),
  [...names(['Double Swing to Press','Kettlebell Corkscrew Swing','Double Front Squat','Feet-Elevated Kettlebell Push-Up']),row('Double Push Press',2,5,'main'),row('Gorilla Row',3,6,'main',true),...names(['Two-Hand Swing','Double Floor Press'])]
 ];
 // Without barbell anchors, the KB-only option carries more working volume.
 // Keep the technical get-up dose controlled; add a set to the other blocks.
 for(const list of four)for(const r of list)if(r.exercise!=='Turkish Get-Up')r.sets++;
 four[0].push(row('Kettlebell Crush Press',3,8,'accessory'));
 four[2].push(row('Double Kettlebell Standing Calf Raise',3,12,'accessory'));
 // Keep circuit groups contiguous and use the same number of rounds inside
 // each group. Technical opening blocks and the final swing remain separate.
 for(const list of four){let group=0,lastSets=0;for(let i=0;i<list.length;i++){const r=list[i];if(r.slow||r.exercise==='Two-Hand Swing'){r.group='';lastSets=0;continue;}if(r.sets!==lastSets)group++;r.group='circuit-'+group;lastSets=r.sets;}}
 const core=['Kettlebell Around the World','Kettlebell Sit-Up','Kettlebell Russian Twist','Bear-Plank Kettlebell Pull-Through','Kettlebell Dead Bug','Half-Kneeling Kettlebell Chop'];
 const wave=week=>((Math.max(1,Math.floor(Number(week)||1))-1)%3)+1;
 function sequence(r,week,base=r.base,sets=r.sets){
  const step=wave(week)-1,add=r.exercise==='Turkish Get-Up'?0:r.slow?Math.max(0,step-1):step;
  return Array.from({length:sets},(_,i)=>Number(base)+Math.floor(add/sets)+(i<add%sets?1:0));
 }
 function recipe(slot,{fourDay=false,week=1}={}){
  const specs=(fourDay?four:three)[slot]||three[0];
  return {name:(fourDay?'Four-day':'Three-day')+' KB circuit · Day '+String.fromCharCode(65+slot),source:'preset',kbRoutineVersion:213,kbCircuit:true,kbFourDay:fourDay,kbProgramDay:String.fromCharCode(65+slot),kbProgramWeek:wave(week),rows:specs.map(r=>({...r,reps:String(r.base)+(r.side?'/side':''),kbSetReps:sequence(r,week),restSeconds:r.group?30:90,kbIntent:r.exercise==='Two-Hand Swing'?'conditioning':r.slow?'power':'strength',kbIndependentLoad:r.light}))};
 }
 function chooseCore(random=Math.random){return core[Math.min(5,Math.floor(Math.max(0,random())*6))];}
 function reviewSuggestion(spec,history,currentKg,choices){
  const h=history.slice(0,2),good=h.length===2&&h.every(x=>x.complete&&x.good&&x.rpe>0&&x.rpe<=8&&x.sets>=spec.sets&&x.reps>=spec.base&&Math.abs(x.kg-currentKg)<.26),bad=h.some(x=>x.bad);
  return {sets:spec.sets,reps:spec.base+(good&&!spec.slow?1:0),earned:good,bad,nextKg:good&&!bad?choices.find(x=>x>currentKg+.01)||currentKg:currentKg,reason:bad?'Recent difficulty: repeat or reduce this target.':good?'Two completed comfortable results support a small progression.':'Keep the starting target until actual results support progression.'};
 }
 const requiredNames=[...originalNames,'Gorilla Row'];
 return Object.freeze({three,four,core,originalNames,requiredNames,wave,sequence,recipe,chooseCore,reviewSuggestion});
});
