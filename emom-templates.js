/* Hybrid Training — manual EMOM templates. Every Minute On the Minute. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridEMOM=api})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const templates=[
  {id:'single-bell-foundation',name:'Single-bell Foundation',rounds:3,skill:'Swing technique required',source:'App-authored conservative template',note:'Three work minutes and one recovery minute. One bell stays at a load suited to the weakest movement.',slots:[{exercise:'Two-Hand Swing',reps:8},{exercise:'Goblet Squat',reps:5},{exercise:'Single-Arm Row',reps:4,perSide:true},{exercise:'Rest',rest:true}]},
  {id:'single-bell-full-body',name:'Single-bell Full Body',rounds:4,skill:'Familiar rack, press and swing technique',source:'App-authored template',note:'Hinge, press, squat and pull. Use one unchanged bell; reduce reps before rushing transitions.',slots:[{exercise:'Two-Hand Swing',reps:8},{exercise:'Half-Kneeling Press',reps:3,perSide:true},{exercise:'Goblet Squat',reps:5},{exercise:'Single-Arm Row',reps:4,perSide:true}]},
  {id:'trevor-inspired-single-bell',name:'Trevor-inspired Single-bell EMOM',rounds:5,skill:'Advanced: established snatch and overhead control',source:'Adapted from the previously reviewed public workout description; starting reps are app choices, not a verbatim coach prescription',url:'https://www.youtube.com/watch?v=tmX3UZEQdoI',note:'20-minute snatch / push-up / unilateral thruster / row structure. Use submaximal push-ups and a bell appropriate for the weakest overhead task. This is an optional adapted template, not a replacement for fixed strength days.',slots:[{exercise:'Single-Arm Snatch',reps:3,perSide:true},{exercise:'Push-Up',reps:6,bodyweight:true},{exercise:'Single-Arm Kettlebell Thruster',reps:3,perSide:true},{exercise:'Single-Arm Row',reps:4,perSide:true}]},
  {id:'bodyweight-foundation',name:'Bodyweight Foundation',rounds:3,skill:'No special equipment',source:'App-authored template',note:'Submaximal pushing, legs and trunk with an explicit recovery minute. No claim of equivalent heavy pulling work.',slots:[{exercise:'Wall Push-Up',reps:6,bodyweight:true},{exercise:'Bodyweight Squat',reps:8,bodyweight:true},{exercise:'Dead Bug',reps:4,perSide:true,bodyweight:true},{exercise:'Rest',rest:true}]},
  {id:'single-exercise-swings',name:'Single-exercise Swing EMOM',rounds:8,skill:'Established swing technique',source:'App-authored conservative single-exercise template',note:'One short swing set at the beginning of every minute for eight minutes. Rest for the remainder; keep reps and load submaximal.',slots:[{exercise:'Two-Hand Swing',reps:6}]}
 ];
 const extra=[
  ['trevor-two-bell','Trevor-inspired Two-bell Cycle',[['Single-Arm Snatch',3,true],['Double Front Squat',5],['Double Clean & Press',3]],5,'Advanced: snatch and double clean/press technique','Adapted from Trevor Shan public three-minute protocol; doses are app starting choices','https://www.youtube.com/watch?v=NB5cLXRMELM'],
  ['trevor-swings-dips','Trevor-inspired Swings and Dips',[['Two-Hand Swing',10],['Bodyweight Dip',5]],5,'Dip bars and established dip technique','Adapted from Trevor Shan public alternating swing/dip post; two-hand swing and reps are app choices','https://link.me/trevorsinstinct'],
  ['ace-hinge-push','ACE-inspired Hinge / Push Alternation',[['Two-Hand Swing',10],['Push-Up',8]],5,'Established swing technique','ACE pair-work inspiration adapted to separate minute slots; not the original same-minute pair','https://www.acefitness.org/resources/pros/expert-articles/6526/one-weight-workout-kettlebell/'],
  ['kb-squat-pull','Kettlebell Squat / Pull',[['Goblet Squat',8],['Single-Arm Row',6,true]],5],
  ['kb-press-pull-core','Kettlebell Upper / Trunk',[['Single-Arm Floor Press',6,true],['Single-Arm Row',6,true],['Dead Bug',8]],4],
  ['kb-unilateral','Kettlebell Unilateral Balance',[['Single Rack Reverse Lunge',5,true],['Single-Arm Row',6,true],['Half-Kneeling Press',5,true],['Front Plank',25,false,true]],3],
  ['kb-two-bell-balance','Two-bell Balanced Rotation',[['Double Front Squat',6],['Double Floor Press',6],['Double RDL',8],['Gorilla Row',12]],4],
  ['bodyweight-push-pull','Bodyweight Push / Pull',[['Push-Up',8],['Pull-Up',3]],5],
  ['bodyweight-legs-core','Bodyweight Legs / Trunk',[['Reverse Lunge',6,true],['Glute Bridge',14],['Side Plank',15,true,true]],4],
  ['band-balanced','Band Full-body Rotation',[['Band Squat',10],['Band Chest Press',10],['Band Bent-Over Row',10],['Band Pallof Press',6,true]],4],
  ['band-upper','Band Upper-body Rotation',[['Band Chest Press',10],['Band Bent-Over Row',10],['Band Biceps Curl',10],['Band Triceps Overhead Extension',10]],3],
  ['db-balanced','Dumbbell / Bodyweight Balance',[['Bodyweight Squat',12],['Dumbbell Floor Press',8],['One-Arm Dumbbell Row',6,true],['Dead Bug',8]],3],
  ['trunk-balance','Trunk Stability Rotation',[['Dead Bug',8],['Front Plank',25,false,true],['Side Plank',15,true,true]],4]
,
  ['community-clean-pull','Community-inspired Clean / Pull',[['Single-Arm Clean & Press',3,true],['Pull-Up',3]],5,'Established clean/press technique and pull-up bar','Adapted from r/kettlebell user combinations; exercises are separated into minute slots and doses are app choices','https://www.reddit.com/r/kettlebell/comments/1izhkhk/give_me_your_best_2030min_emom/'],
  ['community-bodyweight-three','Community-inspired Bodyweight Three',[['Pull-Up',3],['Push-Up',8],['Reverse Lunge',5,true]],4,'Pull-up bar; choose scalable bodyweight variations','Adapted from r/bodyweightfitness pull/push/split-squat ideas; rotating minutes and reverse lunges are app choices','https://www.reddit.com/r/bodyweightfitness/comments/1te9nd0/15_minute_emom/'],
  ['community-swing-row-press','Community-inspired Swing / Row / Press',[['Two-Hand Swing',10],['Single-Arm Row',6,true],['Half-Kneeling Press',5,true]],4,'Established swing technique','Adapted from r/kettlebell row/swing/press discussions; the safe movement variations and doses are app choices','https://www.reddit.com/r/kettlebell/comments/1oo7qti/this_routine_or_simple_sinister/'],
  ['community-pull-dip','Community-inspired Pull / Dip',[['Pull-Up',3],['Bodyweight Dip',4]],4,'Pull-up and dip bars; established technique','Adapted from r/bodyweightfitness alternating pull-up/dip discussions; lower repeatable starting doses','https://www.reddit.com/r/bodyweightfitness/comments/1fgd13v/emom_workouts_for_building_muscle_with/'] ];
 extra.forEach(([id,name,moves,rounds,skill,source,url])=>templates.push({id,name,rounds,skill:skill||'Use controlled submaximal repetitions',source:source||'App-authored EMOM template informed by ACE balanced movement principles',url:url||'https://www.acefitness.org/resources/pros/expert-articles/6831/halloween-workout-emom/',note:'Start each assigned set on its minute. Scale work to leave transition/rest time; changing the duration keeps complete rounds. Reps shown are starting choices, not a guaranteed effort.',slots:moves.map(([exercise,reps,perSide,seconds])=>({exercise,reps,perSide:!!perSide,seconds:!!seconds,bodyweight:/Push-Up|Pull-Up|Dip|Lunge|Glute Bridge|Dead Bug|Plank/.test(exercise)&&! /Rack/.test(exercise)}))}));
 const clamp=(x,lo,hi,f)=>Number.isFinite(Number(x))?Math.min(hi,Math.max(lo,Number(x))):f;
 const blueprints=[
  {id:'balanced-five',name:'Balanced full body',focus:'fullbody',patterns:['squat','hinge','push','pull','core'],source:'ACE balanced movement selection; app-authored five-slot adaptation'},
  {id:'balanced-four',name:'Four-pattern full body',focus:'fullbody',patterns:['squat','pull','hinge','push'],source:'App-authored balanced rotation informed by ACE EMOM principles'},
  {id:'hinge-push-pull',name:'Hinge, push and pull',focus:'fullbody',patterns:['hinge','push','pull'],source:'App-authored three-slot rotation'},
  {id:'legs-push-pull',name:'Legs, push and pull',focus:'fullbody',patterns:['squat','push','pull'],source:'App-authored three-slot rotation'},
  {id:'unilateral-four',name:'Unilateral balance',focus:'fullbody',patterns:['lunge','pull','push','core'],source:'App-authored unilateral rotation'},
  {id:'posterior-core',name:'Posterior chain and trunk',focus:'fullbody',patterns:['hinge','pull','core'],source:'App-authored complementary rotation'},
  {id:'hinge-push',name:'Swing / hinge and push',focus:'fullbody',patterns:['hinge','push'],source:'ACE / Trevor alternating push and hinge inspiration; one exercise per minute adaptation'},
  {id:'squat-pull',name:'Squat and pull',focus:'fullbody',patterns:['squat','pull'],source:'App-authored complementary two-slot EMOM'},
  {id:'upper-three',name:'Upper body and trunk',focus:'upper',patterns:['push','pull','core'],source:'App-authored alternating upper-body demands'},
  {id:'upper-four',name:'Upper body balance',focus:'upper',patterns:['push','pull','rear_delts','arms'],source:'App-authored four-slot rotation'},
  {id:'push-pull',name:'Push and pull',focus:'upper',patterns:['push','pull'],source:'App-authored opposing-pattern EMOM'},
  {id:'lower-three',name:'Lower body balance',focus:'lower',patterns:['squat','hinge','calves'],source:'App-authored lower-body rotation'},
  {id:'lower-core',name:'Legs and trunk',focus:'lower',patterns:['lunge','hinge','core'],source:'App-authored lower-body rotation'},
  {id:'lower-pair',name:'Squat and hinge',focus:'lower',patterns:['squat','hinge'],source:'App-authored lower-body two-slot rotation'},
  {id:'push-three',name:'Push focus',focus:'push',patterns:['chest_press','shoulder_press','triceps'],source:'App-authored push focus; overlap limits still apply'},
  {id:'pull-three',name:'Pull focus',focus:'pull',patterns:['horizontal_pull','vertical_pull','biceps'],source:'App-authored pull focus; overlap limits still apply'},
  {id:'core-three',name:'Trunk balance',focus:'core',patterns:['core','core','core'],source:'App-authored three distinct trunk movements'},
  {id:'quad-pair',name:'Squat and lunge',focus:'quads',patterns:['squat','lunge'],source:'App-authored knee-dominant EMOM'}
 ];
 function allowedMinutes(cycle,max=60){cycle=Math.max(1,Math.round(Number(cycle)||1));return Array.from({length:Math.floor(max/cycle)},(_,i)=>(i+1)*cycle).filter(x=>x>=2)}
 function alignMinutes(minutes,cycle){const requested=Math.round(clamp(minutes,2,60,16)),choices=allowedMinutes(cycle,requested);if(!choices.length)throw Error('Allow at least '+cycle+' minutes for one complete cycle, or remove minute slots.');return choices.at(-1)}
 function template(id){return templates.find(t=>t.id===id)||templates[0]}
 function build(config={}){
  const t=template(config.templateId),custom=Array.isArray(config.slots)&&config.slots.length,raw=custom?config.slots:t.slots,rounds=Math.round(clamp(config.rounds,1,10,t.rounds)),kg=clamp(config.kg,0,48,8),slots=raw.slice(0,8).map((s,i)=>({...s,rest:!!s.rest||s.exercise==='Rest',exercise:String(s.exercise||'Rest'),reps:s.rest?0:Math.round(clamp(config.reps?.[i]??s.reps,1,s.dose?.estimatedWorkSeconds<=60?60:s.seconds?40:30,s.seconds?20:5))})),requestedMinutes=Math.round(clamp(config.minutes,2,60,rounds*slots.length)),minutes=config.preservePartial?requestedMinutes:alignMinutes(requestedMinutes,slots.length);
  if(!slots.some(s=>!s.rest))throw Error('Choose at least one work minute.');
  const id=config.templateId||t.id,name=config.name||(custom?'Build-your-own EMOM':t.name),rows=[],byExercise=new Map();
  for(let minute=0;minute<minutes;minute++){
   const i=minute%slots.length,s=slots[i];if(s.rest)continue;
   const key=s.exercise+'|'+i;if(byExercise.has(key)){byExercise.get(key).sets++;continue}
   const row={exercise:s.exercise,sets:1,reps:s.reps+(s.seconds?' sec'+(s.perSide?' / side':''):s.perSide?' / side':''),weight:s.weight||(s.bodyweight?'Bodyweight':kg+' kg'),conditioning:false,restSeconds:Number.isFinite(s.dose?.estimatedRestSeconds)?s.dose.estimatedRestSeconds:20,expectedRpe:clamp(config.expectedRpe,4,8,6.5),meta:'EMOM · minute '+(i+1)+' of each '+slots.length+'-minute round',note:'Complete the prescribed set before the next minute and rest for the remainder. Cards summarize total work across rounds: follow minute order, not all sets of one card together.',emom:{version:1,templateId:id,templateName:name,intervalSeconds:60,cycleMinutes:slots.length,rounds:Math.ceil(minutes/slots.length),plannedMinutes:minutes,slot:i,perSide:!!s.perSide,targetReps:s.reps,seconds:!!s.seconds,source:config.source||t.source}};
   byExercise.set(key,row);rows.push(row);
  }
  rows.forEach(r=>r.emom.minuteSlots=slots.map(x=>({...x})));
  return {version:2,durationVersion:config.preservePartial?0:1,requestedMinutes,session:'EMOM',name,templateId:id,rounds:Math.ceil(minutes/slots.length),kg,minutes,intervalSeconds:60,slots,rows,skill:config.skill||t.skill,source:config.source||t.source,url:config.url||t.url||'',note:config.note||t.note,intendedEffort:config.intendedEffort||'Submaximal: finish each work set with reps in reserve',why:config.why||[]};
 }
 function minuteAt(plan,elapsedSeconds){
  const elapsed=Math.max(0,Number(elapsedSeconds)||0),index=Math.floor(elapsed/60),done=index>=plan.minutes,slot=done?null:plan.slots[index%plan.slots.length];
  return {done,minute:Math.min(index+1,plan.minutes),round:Math.min(Math.floor(index/plan.slots.length)+1,plan.rounds),slot,secondsRemaining:done?0:60-Math.floor(elapsed%60)};
 }
 function schedule(plan){return Array.from({length:plan.minutes},(_,i)=>({minute:i+1,round:Math.floor(i/plan.slots.length)+1,...plan.slots[i%plan.slots.length]}))}
 return Object.freeze({version:2,blueprints:Object.freeze(blueprints),allowedMinutes,alignMinutes,templates:Object.freeze(templates),template,build,minuteAt,schedule});
});

