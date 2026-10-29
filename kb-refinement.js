/* App-authored complementary-work and core planning. Numeric doses are bounded
   coaching priors; they are not validated minimum-effective-volume thresholds. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridKbRefinement=api;})(typeof globalThis==='undefined'?this:globalThis,function(){
 'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)),clamp=(x,a,b)=>Math.max(a,Math.min(b,Number(x)||0));
 const kb=(name,family,kg,primary,assist,note,extra={})=>({name,family,defaultKg:kg,load:'single',primaryMuscles:primary,secondaryMuscles:assist,note,...extra});
 const catalog=[
  kb('Kettlebell Side-to-Side Swing','swing',6,['glutes'],['hamstrings','core'],'A two-hand lateral swing drill used before circular helicopter work. Build a small controlled side-to-side arc from the hips; count one complete lateral pass as one rep. Clear the whole path and learn the motion with a manageable bell before adding speed.',{auto:false,skill:'advanced-rotation',adaptationScale:.45,strengthDemand:.3,stabilizers:['shoulders','grip'],aliases:['Kettlebell Side Swing','Lateral Kettlebell Swing'],sourceUrl:'https://www.kettlebellbody.app/learn/kettlebell-helicopter'}),
  kb('Kettlebell Helicopter','power',6,['glutes','core'],['shoulders','upperBack'],'Advanced two-hand circular kettlebell skill. Learn the side-swing progression and review the full demonstration before attempting the overhead circle. Use clear overhead and lateral space, stop before control deteriorates, and assess the load separately from ordinary swings. The heavy shell may be unsuitable for learning.',{auto:false,skill:'advanced-overhead-circle',adaptationScale:.35,strengthDemand:.3,stabilizers:['grip'],aliases:['KB Helicopter','Two-Hand Kettlebell Helicopter'],sourceUrl:'https://www.kettlebellbody.app/learn/kettlebell-helicopter'}),
  kb('Kettlebell Somersault Squat','squat',14,['quads'],['glutes','core'],'Hold one bell with both hands between the legs and brace the forearms into the hip creases. Keep the torso folded, extend the knees to raise the hips, then bend the knees to return under control. Use a comfortable range with the feet grounded.',{anatomyFamily:'squat',strengthDemand:.5,movementWeights:{squat:1},aliases:['Somersault Squat','KB Somersault Squat']}),
  kb('Two-Hand Kettlebell Biceps Curl','biceps',14,['biceps'],['grip'],'Hold one heavy bell with both hands by the handle, palms up. Curl under control without swinging the torso. Use the same setting as the heavy pair.',{anatomyFamily:'biceps',strengthDemand:.35}),
  kb('Double Kettlebell Standing Calf Raise','calves',14,['calves','gastroc'],['soleus','grip'],'Hold both bells at the sides. Raise both heels together, pause, and lower under control. Reps are total, not per leg.',{load:'double',anatomyFamily:'calves',strengthDemand:.35}),
  kb('Double Kettlebell Suitcase Split Squat','lunge',14,['quads','glutes'],['adductors','core','grip'],'Hold one bell at each side and keep the feet planted in a split stance. Lower and rise under control; complete both legs.',{load:'double',unilateral:true,anatomyFamily:'lunge',strengthDemand:.65}),
  kb('Alternating Double Kettlebell Floor Press','chest_press',14,['chest'],['triceps','shoulders'],'Lie on the floor holding both bells. Alternate controlled presses; the target is for each arm.',{load:'double',unilateral:true,anatomyFamily:'chest_press',strengthDemand:.6}),
  kb('Two-Hand Kettlebell Front Raise','shoulder_accessory',14,['shoulders'],['core','grip'],'Hold one bell with both hands and raise to a comfortable shoulder height without leaning back. Use the daily heavy-bell setting.',{anatomyFamily:'shoulder_accessory',strengthDemand:.35}),
  kb('Feet-Elevated Kettlebell Push-Up','chest_press',0,['chest'],['triceps','shoulders','core'],'Use stable non-rolling kettlebell handles and a secure low support for the feet. Lower the chest under control and press back up. Choose a normal push-up if the support is unstable or wrist loading is uncomfortable.',{load:'bodyweight',anatomyFamily:'chest_press',strengthDemand:.6,bodyweight:true}),
  kb('Double Pause Front Squat','squat',14,['quads','glutes'],['adductors','core'],'Front-rack both bells, pause for two seconds at a controlled depth, then stand. Keep the same heavy-pair setting used elsewhere that day.',{load:'double',anatomyFamily:'squat',strengthDemand:.7,aliases:['KB Pause Squat','Paused Double Kettlebell Squat']}),
  kb('Goblet Pause Squat','squat',12,['quads','glutes'],['adductors','core'],'Hold one bell at the chest and pause for two seconds at a controlled depth before standing.',{anatomyFamily:'squat',strengthDemand:.6,aliases:['Single Kettlebell Pause Squat']}),
  kb('Double Kettlebell Sumo Deadlift','hinge',14,['glutes','hamstrings'],['quads','adductors','grip','core'],'Use a comfortable wider stance with both bells between the feet. Lift by extending hips and knees; keep arms long and return both bells under control.',{load:'double',anatomyFamily:'hinge',strengthDemand:.65,aliases:['Double KB Sumo Deadlift']}),
  kb('Double Swing to Press','combo',14,['glutes','hamstrings','shoulders'],['triceps'],'One cycle is one double-bell swing, one clean into the rack, then one strict press. Settle in the rack before pressing; do not try to press from the swinging path. Keep the day’s shared pair setting.',{load:'double',anatomyFamily:'fullbody',strengthDemand:.65,adaptationScale:.7,movementWeights:{hinge:.6,vPush:.8,power:.4},fatigueWeights:{systemic:.7,anaerobic:.45,technical:.55},aliases:['Double Swing to Clean and Press','Swing to Press']}),
  kb('Single-Arm Swing to Press','combo',8,['glutes','hamstrings','shoulders'],['triceps'],'One cycle is one swing, one clean into a stable rack, then one strict press. Complete both arms; reset before overhead work.',{unilateral:true,anatomyFamily:'fullbody',strengthDemand:.5,adaptationScale:.7,movementWeights:{hinge:.6,vPush:.8,power:.4},fatigueWeights:{systemic:.6,anaerobic:.4,technical:.55},aliases:['Single Kettlebell Swing to Clean and Press']}),
  kb('Kettlebell Gunslinger','combo',6,['glutes','hamstrings','biceps'],['grip'],'Single-arm explosive curl variation: drive through the hips, guide the bell close to the body and return under control. Count each arm separately. Start with the easy-adjust light bell.',{unilateral:true,anatomyFamily:'hinge',adaptationScale:.6,strengthDemand:.4,movementWeights:{hinge:.65,hPull:.25,power:.4},fatigueWeights:{systemic:.55,anaerobic:.4,technical:.45},aliases:['KB Gunslinger','Single-Arm Kettlebell Gunslinger']}),
  kb('Kettlebell Corkscrew Swing','hinge',6,['glutes','hamstrings'],['core','grip'],'Rotational swing: allow the feet and hips to pivot together as the bell follows the arc. Keep the arm long and turn through the hips without wrenching the low back. Complete both sides with a light bell.',{unilateral:true,anatomyFamily:'hinge',adaptationScale:.6,strengthDemand:.35,movementWeights:{hinge:.75,core:.35,power:.4},fatigueWeights:{systemic:.55,anaerobic:.4,technical:.65,axial:.35},aliases:['Rotational Corkscrew Swing','KB Corkscrew Swing']}),
  kb('Kettlebell Sit-Up','core',6,['core'],[],'Hold a light bell close to the chest, rise with controlled trunk flexion and lower without dropping back. This goblet version does not require an overhead hold.',{coreFunctions:['flexion'],anatomyFamily:'core',adaptationScale:.8,strengthDemand:.4,aliases:['Goblet Kettlebell Sit-Up','KB Sit Up','Weighted Kettlebell Sit-Up']}),
  kb('Kettlebell Dead Bug','core',6,['core'],[],'Lie on the back with a light bell held above the chest. Lower and return one leg at a time while keeping the trunk controlled. Reps are per side.',{coreFunctions:['anti-extension'],anatomyFamily:'core',unilateral:true,adaptationScale:.7,strengthDemand:.35,stabilizers:['shoulders','grip'],aliases:['KB Dead Bug']}),
  kb('Kettlebell Crush Press','chest_press',8,['chest'],['triceps','shoulders'],'Lie on the floor and hold one bell securely with both hands. Apply inward pressure while pressing above the chest; lower with control. This single-bell squeeze variation complements the existing double floor press.',{anatomyFamily:'chest_press',strengthDemand:.45,aliases:['Kettlebell Squeeze Press','KB Crush Press']}),
  kb('Double Kettlebell Bench Press','chest_press',14,['chest'],['triceps','shoulders'],'Use a stable flat bench and press both bells with a controlled return. Requires an available bench; preserve the shared heavy-pair setting.',{load:'double',anatomyFamily:'chest_press',strengthDemand:.65,requiresBench:true,aliases:['KB Bench Press','Kettlebell Chest Press']}),
  kb('Single-Arm Kettlebell Curl','biceps',8,['biceps'],['grip'],'Curl one bell without driving through the hips; keep the upper arm controlled and finish both sides.',{anatomyFamily:'biceps',unilateral:true,strengthDemand:.3,aliases:['KB Biceps Curl']}),
  kb('Double Kettlebell Shrug','traps',14,['upperBack'],['grip'],'Hold both bells at your sides and raise and lower the shoulder blades with control. Keep the elbows straight; do not roll the shoulders.',{load:'double',anatomyFamily:'traps',strengthDemand:.45,aliases:['KB Shrugs','Kettlebell Shrugs']}),
  kb('Single-Arm Kettlebell Shrug','traps',10,['upperBack'],['grip'],'With one bell at your side, lift and lower the shoulder blade under control. Keep the trunk upright and complete both sides.',{anatomyFamily:'traps',unilateral:true,strengthDemand:.35}),
  kb('Kettlebell Hammer Curl','biceps',8,['biceps'],['grip'],'Hold the horns with a neutral wrist and curl without swinging the trunk.',{anatomyFamily:'biceps',aliases:['Two-Hand Kettlebell Curl','Kettlebell Curl'],strengthDemand:.3}),
  kb('Kettlebell Overhead Triceps Extension','triceps',6,['triceps','tricepsLong'],[],'Use the light single bell, control elbow extension and keep the ribs stacked. Choose a non-overhead alternative if this position is uncomfortable.',{anatomyFamily:'triceps',strengthDemand:.3}),
  kb('Kettlebell Standing Calf Raise','calves',12,['calves','gastroc'],['soleus'],'Stand on a level surface, lift the heels through a controlled range and lower slowly. Use nearby support for balance if needed.',{anatomyFamily:'calves',strengthDemand:.3}),
  kb('Kettlebell Russian Twist','core',6,['core'],[],'Seated controlled trunk rotation, feet supported initially. Turn only through a comfortable range; reps are per side.',{coreFunctions:['rotation'],unilateral:true,adaptationScale:.7,strengthDemand:.35}),
  kb('Half-Kneeling Kettlebell Chop','core',6,['core'],['shoulders'],'Move a light bell diagonally with controlled trunk/hip motion. Complete both sides without throwing the bell.',{coreFunctions:['rotation','anti-extension'],unilateral:true,adaptationScale:.65,strengthDemand:.3}),
  kb('Bear-Plank Kettlebell Pull-Through','core',6,['core'],['shoulders','grip'],'With knees hovering, draw the bell across the body without rotating the pelvis. Progress from a knees-down drag; requires comfortable wrist loading.',{coreFunctions:['anti-rotation','anti-extension'],unilateral:true,auto:false,skill:'wrist-support',adaptationScale:.65,strengthDemand:.45,aliases:['Bear Plank Kettlebell Drag']}),
  kb('Forearm-Plank Kettlebell Reach and Pull','core',5.5,['core'],['shoulders','lats'],'From a stable forearm plank, reach the light bell forward and draw it back without rolling the trunk. Learn the unloaded version first.',{coreFunctions:['anti-rotation','anti-extension'],unilateral:true,auto:false,skill:'shoulder-support',adaptationScale:.65,strengthDemand:.45}),
  kb('Single-Arm Overhead Kettlebell Sit-Up','core',6,['core'],[],'Keep a light bell steady overhead while rising with trunk control. Learn a comfortable unweighted sit-up first; stop if the shoulder position or neck becomes strained.',{coreFunctions:['flexion','integrated'],unilateral:true,auto:false,skill:'overhead',adaptationScale:.65,strengthDemand:.4,stabilizers:['shoulders','grip']}),
  kb('Kettlebell Side Plank with Top-Leg Raise','core',6,['core','glutes'],[],'A side plank with an overhead bell hold and top-leg raise. Establish the unloaded side plank and leg raise first.',{coreFunctions:['lateral','integrated'],baseSeconds:10,unilateral:true,auto:false,skill:'overhead',adaptationScale:.65,strengthDemand:.45,stabilizers:['shoulders','grip']}),
   kb('Half-Kneeling Kettlebell Windmill','stability',6,['core'],[],'Hold a light bell overhead, hinge sideways under control and return. Learn the unloaded path first; count complete repetitions per side.',{coreFunctions:['lateral','integrated'],unilateral:true,auto:false,skill:'overhead',adaptationScale:.4,fatigueScale:.65,strengthDemand:.3,stabilizers:['shoulders','grip'],aliases:['Half Kneeling Windmill','Kneeling Kettlebell Windmill']}),
  kb('Seated Alternating Kettlebell Press','press',14,['shoulders'],['triceps'],'Sit tall with legs apart and alternate presses. Count reps per side; use the standing alternative if the floor position prevents a stacked torso.',{load:'double',unilateral:true,auto:false,strengthDemand:.6,stabilizers:['core'],aliases:['Alternating Kettlebell Z Press','Seated Kettlebell Z-Press']})
 ];
 const core=[
  {name:'Kettlebell Around the World',pattern:'integrated',seconds:30,high:45,loaded:true,kg:8,sets:2,supportOnly:true},
  {name:'RKC Plank',pattern:'anti-extension',seconds:15,high:30,sets:3},
  {name:'Dead Bug',pattern:'anti-extension',reps:8,high:15,side:true,sets:2},
  {name:'Kettlebell Dead Bug',pattern:'anti-extension',reps:6,high:12,side:true,loaded:true,kg:6,sets:2},
  {name:'Hollow Body Hold',pattern:'anti-extension',seconds:20,high:40,sets:2},
  {name:'Side Plank',pattern:'lateral',seconds:20,high:40,side:true,sets:2},
  {name:'Side Plank Reach-Through',pattern:'lateral',reps:8,high:12,side:true,sets:2},
  {name:'Suitcase Hold',pattern:'lateral',seconds:20,high:30,side:true,loaded:true,kg:12,sets:2},
  {name:'Bird Dog',pattern:'anti-rotation',reps:8,high:15,side:true,sets:2},
  {name:'Kettlebell Front Rack March',pattern:'anti-rotation',seconds:20,high:30,side:true,loaded:true,kg:10,sets:2},
  {name:'Bear-Plank Kettlebell Pull-Through',pattern:'anti-rotation',reps:6,high:10,side:true,loaded:true,kg:6,sets:2,skill:'plank'},
  {name:'Forearm-Plank Kettlebell Reach and Pull',pattern:'anti-rotation',reps:4,high:8,side:true,loaded:true,kg:5.5,sets:2,skill:'plank'},
  {name:'Half-Kneeling Kettlebell Windmill',pattern:'lateral',reps:3,high:5,side:true,loaded:true,kg:6,sets:2,skill:'overhead',supportOnly:true},
  {name:'Turkish Get-Up',pattern:'integrated',reps:1,high:2,side:true,loaded:true,kg:6,sets:2,skill:'overhead',supportOnly:true},
  {name:'Single-Arm Overhead Kettlebell Sit-Up',pattern:'flexion',reps:3,high:6,side:true,loaded:true,kg:5.5,sets:2,skill:'advanced'},
  {name:'Kettlebell Side Plank with Top-Leg Raise',pattern:'lateral',seconds:10,high:20,side:true,loaded:true,kg:5.5,sets:2,skill:'advanced'},
  {name:'Reverse Crunch',pattern:'flexion',reps:10,high:15,sets:2},
  {name:'Kettlebell Sit-Up',pattern:'flexion',reps:6,high:12,loaded:true,kg:6,sets:2},
  {name:'Kettlebell Russian Twist',pattern:'rotation',reps:8,high:12,side:true,loaded:true,kg:6,sets:2},
  {name:'Half-Kneeling Kettlebell Chop',pattern:'rotation',reps:8,high:12,side:true,loaded:true,kg:6,sets:2}
  ,{name:'Bicycle Crunch',pattern:'rotation',reps:12,high:20,side:true,sets:2}
 ];
 const accessories=[
  {exercise:'Push-Up',goal:'chest',sets:2,reps:'10',cost:.65,bodyweight:true},
  {exercise:'Kettlebell Crush Press',goal:'chest',sets:2,reps:'12',cost:.55,light:true},
  {exercise:'Double Kettlebell Bench Press',goal:'chest',sets:2,reps:'10',cost:.65,shared:true,bench:true},
  {exercise:'Kettlebell Hammer Curl',goal:'biceps',sets:2,reps:'12',cost:.4,light:true},
  {exercise:'Single-Arm Kettlebell Curl',goal:'biceps',sets:2,reps:'10/side',cost:.45,light:true},
  {exercise:'Kettlebell Overhead Triceps Extension',goal:'triceps',sets:2,reps:'12',cost:.45,light:true,overhead:true},
  {exercise:'Double Kettlebell Shrug',goal:'traps',sets:2,reps:'12',cost:.45,shared:true},
  {exercise:'Single-Arm Kettlebell Shrug',goal:'traps',sets:2,reps:'12/side',cost:.5,light:true},
  {exercise:'Single-Leg Calf Raise',goal:'calves',sets:2,reps:'12/leg',cost:.4,bodyweight:true},
  {exercise:'Kettlebell Standing Calf Raise',goal:'calves',sets:2,reps:'15',cost:.35,shared:true,lightOptional:true},
  {exercise:'Hamstring Walkout',goal:'hamKneeFlex',sets:2,reps:'8',cost:.55,bodyweight:true},
  {exercise:'Double Bent-Over Row',goal:'upperBack',sets:2,reps:'12',cost:.8,shared:true,armorOnly:true}
 ];
 function recipe(workout){
  const w=clone(workout);if(w.source!=='preset'||w.rows.some(r=>r.manualTarget||Number(r.manualKg)>0))return w;
  w.kbRoutineVersion=212;
  for(const r of w.rows){
   if(w.kbFourDay&&r.kbReview&&r.kbBaseSets)r.sets=r.kbBaseSets;
   if(/swing/i.test(r.exercise)){r.sets=Math.min(5,r.sets);r.roundLow=r.sets;r.roundHigh=6;}
   if(w.kbFourDay){
    if(r.sets>4&&!/swing/i.test(r.exercise))r.sets=4;
    if(/Gorilla|Upright|Pullover/.test(r.exercise))r.sets=Math.min(2,r.sets);
    if(r.kbReview)r.sets=Math.max(1,Math.ceil(r.sets*.65));
   }
  }
  const slot=['A','B','C','D'].indexOf(w.kbProgramDay),week=Math.max(1,Number(w.kbProgramWeek)||1),pauseSlot=w.kbFourDay?1:0,sumoSlot=w.kbFourDay?1:2,swingSlot=w.kbFourDay?3:1;
  if(slot===pauseSlot)for(const r of w.rows)if(r.exercise==='Double Front Squat'){r.exercise='Double Pause Front Squat';r.sets=Math.min(3,r.sets);r.reps='5';r.repLow=4;r.repHigh=6;r.kbVariationWhy='Pause for two seconds in each rep. This is the squat variation for this day; its own actual results guide progression.';}
  if(slot===sumoSlot)for(const r of w.rows)if(r.exercise==='Double RDL'){r.exercise='Double Kettlebell Sumo Deadlift';r.sets=Math.min(3,r.sets);r.reps='8';r.repLow=6;r.repHigh=10;r.kbVariationWhy='The wider-stance deadlift adds a different hip/knee contribution. Other KB days retain the RDL.';}
  if(week%2===0&&slot===(w.kbFourDay?0:2)){const r=w.rows.find(r=>r.exercise==='Double Strict Press');if(r&&r.sets>=3){const count=r.kbReview?1:2;r.kbPracticeFallbackSets=r.sets;r.sets-=count;w.rows.splice(w.rows.indexOf(r)+1,0,{exercise:'Seated Alternating Kettlebell Press',sets:count,reps:'5/side',repLow:4,repHigh:6,kbIntent:'strength',restSeconds:60,kbPracticeVariant:true,kbVariationWhy:'This seated variation shares the same pair setting. Use the standing version if you cannot maintain a comfortable upright torso.'});}}
  if(slot===swingSlot){const r=w.rows.find(r=>/two-hand swing/i.test(r.exercise));if(r&&r.sets>=3){const count=r.kbReview?1:2;r.kbLightSwingFallbackSets=r.sets;r.sets-=count;r.roundLow=r.sets;r.roundHigh=r.sets+1;w.rows.push({exercise:week%3===0?'Single-Arm Snatch':week%3===1?'Kettlebell Gunslinger':'Kettlebell Corkscrew Swing',sets:count,reps:week%3===0?'5/side':'6/side',repLow:5,repHigh:8,kbIntent:'conditioning',restSeconds:60,kbIndependentLoad:true,kbSkipWithoutLight:true,kbVariationWhy:week%3===0?'Swing-style snatch rounds replace part of the swing finish. Drive through the hips, guide the bell close and receive it overhead under control; use the light single bell.':week%3===1?'Gunslinger technique rounds replace part of the swing finish. Use the easy-adjust single bell; keep the heavy pair unchanged.':'Rotational corkscrew rounds replace part of the swing finish. Turn through the feet and hips using the easy-adjust single bell.'});}}
  if(week%3===0&&slot===(w.kbFourDay?3:1)){const r=w.rows.find(r=>r.exercise==='Double Push Press'||r.exercise==='Double Thruster');if(r){r.exercise='Double Swing to Press';r.sets=Math.min(3,r.sets);r.reps='5';r.repLow=4;r.repHigh=6;r.kbIntent='strength-endurance';r.kbVariationWhy='Count one swing + clean + press as one complete cycle. The normal clean-and-press and thruster days remain in the rotation.';}}
  if(week%2===0&&slot===(w.kbFourDay?2:1)){const r=w.rows.find(r=>r.exercise==='Gorilla Row'||r.exercise==='Double Bent-Over Row');if(r&&r.sets>=3){r.kbRowPracticeFallbackSets=r.sets;r.sets-=2;w.rows.splice(w.rows.indexOf(r)+1,0,{exercise:'Renegade Row',sets:2,reps:'5/side',repLow:4,repHigh:6,kbIntent:'strength',restSeconds:60,kbRowPractice:true,kbVariationWhy:'Use stable bell bases and a controlled support position; begin from the knees when needed. The standing/Gorilla row is the fallback if wrist loading is uncomfortable.'});}}
  const supportSlot=0;
  if(slot===supportSlot){const name=week%2?'Halo':'Kettlebell Around the World';w.rows.unshift({exercise:name,sets:2,reps:name==='Halo'?'4/side':'30 sec',kbIntent:'technique',restSeconds:60,kbIndependentLoad:true,kbSkipWithoutLight:true,kbVariationWhy:name==='Halo'?'Light shoulder-control circles before strength; each direction counts as a side. This is preparation, not full pressing or abdominal credit.':'Pass a light bell around the waist and change direction halfway through each set. This coordination work supplements the active core finisher.'});}
  if(week%2===0)for(const r of w.rows)if(r.exercise==='Kettlebell Pullover'){r.exercise='Kettlebell Standing Pullover';r.sets=2;r.reps='6';r.repLow=5;r.repHigh=8;r.kbFallback='Double Floor Press';r.kbVariationWhy='The standing light shoulder-control variation alternates with the lying lat-focused pullover. It does not replace chest pressing or receive full chest/lat credit.';}
  return w;
 }
 const focusGoals=['chest','biceps','triceps','calves','traps','hamKneeFlex','upperBack'];
 function focus(value){
  if(!value||value.version!==1||!Array.isArray(value.goals)||!['mixed','kettlebell'].includes(value.core))return null;
  return {version:1,goals:[...new Set(value.goals.filter(g=>focusGoals.includes(g)))].slice(0,7),core:value.core,moreCore:value.moreCore===true,kbOnly:value.kbOnly!==false,fullSessions:value.fullSessions!==false,skills:[...new Set((Array.isArray(value.skills)?value.skills:[]).filter(s=>['plank','overhead','advanced'].includes(s)))],source:['program','user'].includes(value.source)?value.source:'user'};
 }
 function programFocus(){return {version:1,goals:['chest','biceps','triceps','calves','traps'],core:'kettlebell',moreCore:true,kbOnly:true,fullSessions:true,skills:['plank','overhead'],source:'program'};}
 function choose(context={}){
  const targets={chest:8,biceps:6,triceps:6,calves:4,traps:4,hamKneeFlex:3,upperBack:8},chosen=[],dose={...(context.session||{})},weekly=context.weekly||{},reserved=context.reserved||{},fatigue=context.fatigue||{},existing=new Set(context.existing||[]),usedGoals=new Set();
  const requested=focus(context.focus),priorities=requested?.goals||[],due=priorities[(Math.max(0,Number(context.slot)||0))%Math.max(1,priorities.length)];
  if(context.severe||context.mainMinutes>(priorities.length?52:45)||context.armor&&context.mainMinutes>(priorities.length?45:35))return chosen;
  for(let slot=0;slot<(context.caution?1:2);slot++){
   const scored=accessories.filter(a=>!existing.has(a.exercise)&&!usedGoals.has(a.goal)&&(!a.armorOnly||context.armor)&&(!a.light||context.light)&&(!a.shared||context.pair||a.lightOptional&&context.light)&&(!a.bench||context.bench)&&(!requested?.kbOnly||!a.bodyweight||a.goal==='chest')&&(!a.overhead||!context.shoulderConcern)&&(!context.unavailable||!context.unavailable.includes(a.exercise))&&!(context.hardGoals||[]).includes(a.goal)).map(a=>{
    const focused=priorities.includes(a.goal),local=Number(fatigue[a.goal])||0;if(!focused&&local>=2.5)return {...a,score:-100};
    const now=Number(dose[a.goal])||0,prior=Number(weekly[a.goal])||0,next=Number(reserved[a.goal])||0,target=targets[a.goal],gap=Math.max(0,target-prior-now-next),daily=Math.max(0,3-now),novel=context.recent?.includes(a.exercise)?-.18:.12,
     priority=focused?4+(a.goal===due?3:0)+(a.goal===priorities[(Math.max(0,Number(context.slot)||0)+3)%Math.max(1,priorities.length)]?1.2:0)-Math.min(4,(Number(context.recentGoals?.[a.goal])||0)*2.5):0,
     score=gap/(target||1)*2+daily*.2-(now>=3?1.1:0)-local*.5-next*(focused?.08:.28)-a.cost+novel+priority+(a.lightOptional&&(context.light||context.pair)?.5:0)+(requested?.kbOnly&&!a.bodyweight?.35:0);
    return {...a,score,focused,light:!!(a.light||a.lightOptional&&context.light),shared:!!(a.shared&&!(a.lightOptional&&context.light))};
   }).sort((a,b)=>b.score-a.score||a.exercise.localeCompare(b.exercise));
   const a=scored[0];if(!a||a.score<=.2)break;
   const label={hamKneeFlex:'hamstring knee-flexion',upperBack:'upper-back'}[a.goal]||a.goal,sets=a.focused&&context.easyFeedback>=2&&!context.caution&&context.mainMinutes<42?3:a.sets;
   chosen.push({...a,sets,reason:a.focused?'Your '+label+' focus adds direct work here. Actual effort and recovery guide the next adjustment.':'Adds '+label+' work after accounting for this workout, recent direct/assisted work, local fatigue and the next anchor.'});existing.add(a.exercise);usedGoals.add(a.goal);dose[a.goal]=(Number(dose[a.goal])||0)+sets*.8;
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
 function tempo(name){return /swing to press/i.test(name)?8:/renegade row/i.test(name)?4:/pause.*squat/i.test(name)?5:/half turkish get-up/i.test(name)?20:/turkish get-up/i.test(name)?35:/windmill|overhead.*sit.up/i.test(name)?6:/pull-through|reach and pull/i.test(name)?4:/clean.*press|thruster/i.test(name)?5:/gunslinger|corkscrew/i.test(name)?3:/swing/i.test(name)?2:3;}
 return Object.freeze({catalog,core,accessories,recipe,choose,coreTarget,tempo,focus,programFocus});
});
