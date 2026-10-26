/* App-authored complementary-work and core planning. Numeric doses are bounded
   coaching priors; they are not validated minimum-effective-volume thresholds. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridKbRefinement=api;})(typeof globalThis==='undefined'?this:globalThis,function(){
 'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)),clamp=(x,a,b)=>Math.max(a,Math.min(b,Number(x)||0));
 const kb=(name,family,kg,primary,assist,note,extra={})=>({name,family,defaultKg:kg,load:'single',primaryMuscles:primary,secondaryMuscles:assist,note,...extra});
 const catalog=[
  kb('Kettlebell Hammer Curl','biceps',8,['biceps'],['grip'],'Hold the horns with a neutral wrist and curl without swinging the trunk.',{anatomyFamily:'biceps',aliases:['Two-Hand Kettlebell Curl','Kettlebell Curl'],strengthDemand:.3}),
  kb('Kettlebell Overhead Triceps Extension','triceps',6,['triceps','tricepsLong'],[],'Use the light single bell, control elbow extension and keep the ribs stacked. Choose a non-overhead alternative if this position is uncomfortable.',{anatomyFamily:'triceps',strengthDemand:.3}),
  kb('Kettlebell Standing Calf Raise','calves',12,['calves','gastroc'],['soleus'],'Stand on a level surface, lift the heels through a controlled range and lower slowly. Use nearby support for balance if needed.',{anatomyFamily:'calves',strengthDemand:.3}),
  kb('Kettlebell Russian Twist','core',6,['core'],[],'Seated controlled trunk rotation, feet supported initially. Turn only through a comfortable range; reps are per side.',{coreFunctions:['rotation'],unilateral:true,adaptationScale:.7,strengthDemand:.35}),
  kb('Half-Kneeling Kettlebell Chop','core',6,['core'],['shoulders'],'Move a light bell diagonally with controlled trunk/hip motion. Complete both sides without throwing the bell.',{coreFunctions:['rotation','anti-extension'],unilateral:true,adaptationScale:.65,strengthDemand:.3}),
  kb('Bear-Plank Kettlebell Pull-Through','core',6,['core'],['shoulders','grip'],'With knees hovering, draw the bell across the body without rotating the pelvis. Progress from a knees-down drag; requires comfortable wrist loading.',{coreFunctions:['anti-rotation','anti-extension'],unilateral:true,auto:false,skill:'wrist-support',adaptationScale:.65,strengthDemand:.45,aliases:['Bear Plank Kettlebell Drag']}),
  kb('Forearm-Plank Kettlebell Reach and Pull','core',5.5,['core'],['shoulders','lats'],'From a stable forearm plank, reach the light bell forward and draw it back without rolling the trunk. Learn the unloaded version first.',{coreFunctions:['anti-rotation','anti-extension'],unilateral:true,auto:false,skill:'shoulder-support',adaptationScale:.65,strengthDemand:.45}),
  kb('Single-Arm Overhead Kettlebell Sit-Up','core',6,['core'],[],'Keep a light bell steady overhead while rising with trunk control. Learn a comfortable unweighted sit-up first; stop if the shoulder position or neck becomes strained.',{coreFunctions:['flexion','integrated'],unilateral:true,auto:false,skill:'overhead',adaptationScale:.65,strengthDemand:.4,stabilizers:['shoulders','grip']}),
  kb('Kettlebell Side Plank with Top-Leg Raise','core',6,['core','glutes'],[],'A side plank with an overhead bell hold and top-leg raise. Establish the unloaded side plank and leg raise first.',{coreFunctions:['lateral','integrated'],baseSeconds:10,unilateral:true,auto:false,skill:'overhead',adaptationScale:.65,strengthDemand:.45,stabilizers:['shoulders','grip']}),
  kb('Half-Kneeling Kettlebell Windmill','stability',6,['core'],[],'Hold a light bell overhead, hinge sideways under control and return. Learn the unloaded path first; this is stability/coordination work, not a lat pullover.',{coreFunctions:['lateral','integrated'],baseSeconds:10,unilateral:true,auto:false,skill:'overhead',adaptationScale:.4,fatigueScale:.65,strengthDemand:.3,stabilizers:['shoulders','grip'],aliases:['Half Kneeling Windmill','Kneeling Kettlebell Windmill']}),
  kb('Seated Alternating Kettlebell Press','press',8,['shoulders'],['triceps'],'Sit tall with legs apart and alternate presses. Count reps per side; do not force the floor position if mobility prevents a stacked torso.',{load:'double',unilateral:true,auto:false,strengthDemand:.6,stabilizers:['core'],aliases:['Alternating Kettlebell Z Press','Seated Kettlebell Z-Press']})
 ];
 const core=[
  {name:'Kettlebell Around the World',pattern:'integrated',seconds:30,high:45,loaded:true,kg:8,sets:2,supportOnly:true},
  {name:'RKC Plank',pattern:'anti-extension',seconds:15,high:30,sets:3},
  {name:'Dead Bug',pattern:'anti-extension',reps:8,high:15,side:true,sets:2},
  {name:'Hollow Body Hold',pattern:'anti-extension',seconds:20,high:40,sets:2},
  {name:'Side Plank',pattern:'lateral',seconds:20,high:40,side:true,sets:2},
  {name:'Suitcase Hold',pattern:'lateral',seconds:20,high:30,side:true,loaded:true,kg:12,sets:2},
  {name:'Bird Dog',pattern:'anti-rotation',reps:8,high:15,side:true,sets:2},
  {name:'Kettlebell Front Rack March',pattern:'anti-rotation',seconds:20,high:30,side:true,loaded:true,kg:10,sets:2},
  {name:'Bear-Plank Kettlebell Pull-Through',pattern:'anti-rotation',reps:6,high:10,side:true,loaded:true,kg:6,sets:2,skill:true},
  {name:'Reverse Crunch',pattern:'flexion',reps:10,high:15,sets:2},
  {name:'Kettlebell Russian Twist',pattern:'rotation',reps:8,high:12,side:true,loaded:true,kg:6,sets:2},
  {name:'Half-Kneeling Kettlebell Chop',pattern:'rotation',reps:8,high:12,side:true,loaded:true,kg:6,sets:2}
 ];
 const accessories=[
  {exercise:'Push-Up',goal:'chest',sets:2,reps:'10',cost:.65,bodyweight:true},
  {exercise:'Kettlebell Hammer Curl',goal:'biceps',sets:2,reps:'12',cost:.4,light:true},
  {exercise:'Kettlebell Overhead Triceps Extension',goal:'triceps',sets:2,reps:'12',cost:.45,light:true,overhead:true},
  {exercise:'Single-Leg Calf Raise',goal:'calves',sets:2,reps:'12/leg',cost:.4,bodyweight:true},
  {exercise:'Kettlebell Standing Calf Raise',goal:'calves',sets:2,reps:'15',cost:.42,shared:true},
  {exercise:'Hamstring Walkout',goal:'hamKneeFlex',sets:2,reps:'8',cost:.55,bodyweight:true},
  {exercise:'Double Bent-Over Row',goal:'upperBack',sets:2,reps:'12',cost:.8,shared:true,armorOnly:true}
 ];
 function recipe(workout){
  const w=clone(workout);if(w.source!=='preset'||w.rows.some(r=>r.manualTarget||Number(r.manualKg)>0))return w;
  w.kbRoutineVersion=211;
  for(const r of w.rows){
   if(w.kbFourDay&&r.kbReview&&r.kbBaseSets)r.sets=r.kbBaseSets;
   if(/swing/i.test(r.exercise)){r.sets=Math.min(5,r.sets);r.roundLow=r.sets;r.roundHigh=6;}
   if(w.kbFourDay){
    if(r.sets>4&&!/swing/i.test(r.exercise))r.sets=4;
    if(/Gorilla|Upright|Pullover/.test(r.exercise))r.sets=Math.min(2,r.sets);
    if(r.kbReview)r.sets=Math.max(1,Math.ceil(r.sets*.65));
   }
  }
  return w;
 }
 function choose(context={}){
  const targets={chest:8,biceps:6,triceps:6,calves:4,hamKneeFlex:3,upperBack:8},chosen=[],dose={...(context.session||{})},weekly=context.weekly||{},reserved=context.reserved||{},fatigue=context.fatigue||{},existing=new Set(context.existing||[]),usedGoals=new Set();
  if(context.severe||context.mainMinutes>45||context.armor&&context.mainMinutes>35)return chosen;
  for(let slot=0;slot<(context.caution?1:2);slot++){
   const scored=accessories.filter(a=>!existing.has(a.exercise)&&!usedGoals.has(a.goal)&&(!a.armorOnly||context.armor)&&(!a.light||context.light)&&(!a.shared||context.pair)&&(!a.overhead||!context.shoulderConcern)&&(!context.unavailable||!context.unavailable.includes(a.exercise))).map(a=>{
    const local=Number(fatigue[a.goal])||0;if(local>=2.5)return {...a,score:-100};
    const now=Number(dose[a.goal])||0,prior=Number(weekly[a.goal])||0,next=Number(reserved[a.goal])||0,target=targets[a.goal],gap=Math.max(0,target-prior-now-next),daily=Math.max(0,3-now),novel=context.recent?.includes(a.exercise)?-.18:.12,
     score=gap/(target||1)*2+daily*.2-(now>=3?1.1:0)-local*.5-next*.28-a.cost+novel+(context.preferredGoals?.includes(a.goal)?.12:0);
    return {...a,score};
   }).sort((a,b)=>b.score-a.score||a.exercise.localeCompare(b.exercise));
   const a=scored[0];if(!a||a.score<=.2)break;
   chosen.push({...a,reason:'Adds '+({hamKneeFlex:'hamstring knee-flexion',upperBack:'upper-back'}[a.goal]||a.goal)+' work after accounting for this workout, recent direct/assisted work, local fatigue and the next anchor.'});existing.add(a.exercise);usedGoals.add(a.goal);dose[a.goal]=(Number(dose[a.goal])||0)+a.sets*.8;
  }
  return chosen;
 }
 function coreTarget(def,history=[],{limited=false}={}){
  const timed=!!def.seconds,base=def.seconds||def.reps,last=history[0],good=r=>r&&r.complete&&r.rpe>0&&r.rpe<=8&&Number(r.sets)>=2&&!r.bad,n=last&&Number(last.amount)>0?Math.min(def.high,Number(last.amount)):base,step=timed?5:1,
   comparable=history.slice(0,2),earned=comparable.length===2&&comparable.every(good),bad=!!last?.bad;
  let amount=last?Math.max(timed?5:3,n):base;
  if(earned&&!limited)amount=Math.min(def.high,amount+step);
  if(bad)amount=Math.max(timed?5:3,amount-step);
  const sets=limited?2:last?Math.min(def.sets||2,Math.max(2,Number(last.sets)||2)):def.sets||2;
  return {sets,reps:amount+(timed?' sec':'')+(def.side?'/side':''),amount,timed,progression:earned&&!limited&&amount>n?'earned':bad?'easier':last?'consolidate':'starting',reason:bad?'Recent difficulty calls for an easier variation or a shorter repeatable effort.':last?amount>=def.high&&earned?'The current duration/rep window is owned; progress suitable leverage or a harder accessible variation instead of extending it indefinitely.':'Repeatable direct core performance controls progression; a short old finisher is not treated as a fitness ceiling.':'Start with multiple controlled working sets; progress duration/reps before leverage or load.'};
 }
 function tempo(name){return /half turkish get-up/i.test(name)?20:/turkish get-up/i.test(name)?35:/windmill|overhead.*sit.up/i.test(name)?6:/pull-through|reach and pull/i.test(name)?4:/clean.*press|thruster/i.test(name)?5:/swing/i.test(name)?2:3;}
 return Object.freeze({catalog,core,accessories,recipe,choose,coreTarget,tempo});
});
