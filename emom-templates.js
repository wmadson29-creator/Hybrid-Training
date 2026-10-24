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
 function normalizeRecoveryOverride(value){return value?.version===1&&value.explicit===true&&typeof value.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(value.date)&&Number.isFinite(Date.parse(value.date))&&new Date(value.date).toISOString().slice(0,10)===value.date?{version:1,date:value.date,explicit:true}:null;}
 function normalizeForecastPlan(value){const out=normalizeRecoveryOverride({...value,explicit:true});return out?{version:1,date:out.date}:null;}
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
  const recoveryOverride=normalizeRecoveryOverride(config.recoveryOverride),forecastPlan=normalizeForecastPlan(config.forecastPlan);rows.forEach(r=>{r.emom.minuteSlots=slots.map(x=>({...x}));if(recoveryOverride)r.emom.recoveryOverride=recoveryOverride;if(forecastPlan)r.emom.forecastPlan=forecastPlan;});
  return {...(recoveryOverride?{recoveryOverride}:{}),...(forecastPlan?{forecastPlan}:{}),version:2,durationVersion:config.preservePartial?0:1,requestedMinutes,session:'EMOM',name,templateId:id,rounds:Math.ceil(minutes/slots.length),kg,minutes,intervalSeconds:60,slots,rows,skill:config.skill||t.skill,source:config.source||t.source,url:config.url||t.url||'',note:config.note||t.note,intendedEffort:config.intendedEffort||'Submaximal: finish each work set with reps in reserve',why:config.why||[]};
 }
 function minuteAt(plan,elapsedSeconds){
  const elapsed=Math.max(0,Number(elapsedSeconds)||0),index=Math.floor(elapsed/60),done=index>=plan.minutes,slot=done?null:plan.slots[index%plan.slots.length];
  return {done,minute:Math.min(index+1,plan.minutes),round:Math.min(Math.floor(index/plan.slots.length)+1,plan.rounds),slot,secondsRemaining:done?0:60-Math.floor(elapsed%60)};
 }
 function schedule(plan){return Array.from({length:plan.minutes},(_,i)=>({minute:i+1,round:Math.floor(i/plan.slots.length)+1,...plan.slots[i%plan.slots.length]}))}
 return Object.freeze({version:2,blueprints:Object.freeze(blueprints),allowedMinutes,alignMinutes,templates:Object.freeze(templates),template,build,minuteAt,schedule,normalizeRecoveryOverride,normalizeForecastPlan});
});


/* AMRAP: time-capped work, explicit actuals, exact-circuit comparisons. */
(function(root,factory){const api=factory();if(root)root.HybridAMRAP=api;if(typeof module==='object'&&module.exports)module.exports={...module.exports,AMRAP:api};})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const clean=(v,n=160)=>String(v??'').replace(/[\u0000-\u001f]/g,' ').trim().slice(0,n),key=v=>clean(v,300).toLowerCase().replace(/\s+/g,' ');
 function normalize(value,{strict=false}={}){
  const fail=m=>{if(strict)throw Error('AMRAP: '+m);return null;};if(!value||typeof value!=='object'||Array.isArray(value))return fail('plan object required');
  if(Number(value.version)!==1)return fail('unsupported version');const minutes=Number(value.minutes);if(!Number.isFinite(minutes)||minutes<1||minutes>60)return fail('time must be 1–60 minutes');
  if(!Array.isArray(value.slots)||value.slots.length<2||value.slots.length>8)return fail('keep 2–8 movements');
  const ids=new Set(),slots=[];for(let i=0;i<value.slots.length;i++){const s=value.slots[i];if(!s||typeof s!=='object')return fail('invalid movement');const id=clean(s.id||'s'+(i+1),40),exercise=clean(s.exercise),dose=Number(s.dose),unit=s.unit;if(!id||ids.has(id)||!exercise||!Number.isFinite(dose)||dose<=0||dose>1000||!['reps','sec'].includes(unit))return fail('invalid movement identity, dose or unit');ids.add(id);slots.push({id,exercise,dose,unit,perSide:s.perSide===true,load:clean(s.load,120),variant:clean(s.variant,120)});}
  const out={version:1,id:clean(value.id||'amrap',80),name:clean(value.name||'AMRAP circuit'),minutes,focus:clean(value.focus||'auto',40),source:clean(value.source||'App-authored Daily Reps-inspired circuit',240),equipment:Array.isArray(value.equipment)?[...new Set(value.equipment.map(x=>clean(x,40)).filter(Boolean))].slice(0,24):[],slots};
  const override=value.recoveryOverride;if(override?.version===1&&override.explicit===true&&typeof override.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(override.date)&&Number.isFinite(Date.parse(override.date))&&new Date(override.date).toISOString().slice(0,10)===override.date)out.recoveryOverride={version:1,date:override.date,explicit:true};if(['recommended','custom','template'].includes(value.mode))out.mode=value.mode;
  const forecast=value.forecastPlan;if(forecast?.version===1&&typeof forecast.date==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(forecast.date)&&Number.isFinite(Date.parse(forecast.date))&&new Date(forecast.date).toISOString().slice(0,10)===forecast.date)out.forecastPlan={version:1,date:forecast.date};
  if(value.target!==undefined){const t=value.target;if(!t||typeof t!=='object'||!Number.isFinite(Number(t.progress))||Number(t.progress)<0||Number(t.progress)>200)return fail('invalid target');out.target={progress:Number(t.progress),kind:['estimated','repeat','progression'].includes(t.kind)?t.kind:'estimated',samples:Math.max(0,Math.min(100,Number(t.samples)||0)),why:clean(t.why,600)};}
  return out;
 }
 function signature(value){const p=normalize(value);return p?JSON.stringify([p.minutes,p.slots.map(s=>[key(s.exercise),s.dose,s.unit,s.perSide,key(s.load),key(s.variant)])]):'';}
 function structure(value){const p=normalize(value,{strict:true});return {version:1,activity:'AMRAP Circuit',source:'amrap',prescription:p.minutes+' min AMRAP',tracking:false,blocks:[{id:'b1',label:p.name,mode:'amrap',rounds:1,capSeconds:p.minutes*60,cue:'Repeat in order. Rest as needed. Keep going after the target; stop at the time cap.',steps:p.slots.map((s,i)=>({id:s.id,componentId:'c'+(i+1),kind:'work',label:s.exercise,dose:s.dose,unit:s.unit,perSide:s.perSide,load:s.load,cue:s.variant}))}],entries:[]};}
 function score(value,workoutStructure,actualSeconds){
  const p=normalize(value),empty={rounds:0,partialReps:0,totalReps:0,holdSeconds:0,progress:0,recorded:false,comparable:false,reason:'No completed work recorded.'};if(!p||!workoutStructure?.tracking)return empty;
  const slots=new Map(p.slots.map(s=>[s.id,s])),rounds=new Map(),entries=(Array.isArray(workoutStructure.entries)?workoutStructure.entries:[]).filter(e=>['complete','partial'].includes(key(e.status))&&Number(e.dose)>0);let totalReps=0,holdSeconds=0,changed=workoutStructure.blocks?.length!==1||Number(workoutStructure.blocks?.[0]?.capSeconds)!==p.minutes*60||JSON.stringify((workoutStructure.blocks?.[0]?.steps||[]).filter(s=>s.kind!=='rest').map(s=>[s.id,key(s.label),Number(s.dose),s.unit,!!s.perSide,key(s.load),key(s.cue)]))!==JSON.stringify(p.slots.map(s=>[s.id,key(s.exercise),s.dose,s.unit,s.perSide,key(s.load),key(s.variant)]));
  for(const e of entries){const s=slots.get(e.stepId),round=Number(e.round);if(!s||!Number.isInteger(round)||round<1||round>200){changed=true;continue;}const n=Number(e.dose),factor=s.perSide&&(e.side==='both'||!e.side)?2:1,unit=e.unit==='seconds'?'sec':e.unit,amount=unit==='min'?n*60:n,normalizedUnit=unit==='min'?'sec':unit;
   if(normalizedUnit==='reps')totalReps+=n*factor;else if(normalizedUnit==='sec')holdSeconds+=amount*factor;
   const match=key(e.actual)===key(s.exercise)&&normalizedUnit===s.unit&&key(e.load)===key(s.load)&&(!s.perSide||e.side==='both'),ratio=match?amount/s.dose:0;
   if(!match||ratio>1.0001)changed=true;if(!rounds.has(round))rounds.set(round,new Map());const map=rounds.get(round);if(map.has(s.id))changed=true;map.set(s.id,{ratio,amount,n,factor,unit:normalizedUnit});
  }
  let full=0,partialReps=0,progress=0,prefix=true;const ordered=[...rounds.keys()].sort((a,b)=>a-b);let expectedRound=1;
  for(const r of ordered){const map=rounds.get(r),complete=p.slots.every(s=>(map.get(s.id)?.ratio||0)>=.9999);if(r!==expectedRound)prefix=false;expectedRound=r+1;if(complete){full++;progress+=1;}else{let fraction=0,stopped=false;for(const s of p.slots){const a=map.get(s.id),ratio=Math.max(0,Math.min(1,a?.ratio||0));if(stopped&&ratio>0)prefix=false;if(!stopped)fraction+=ratio/p.slots.length;if(ratio<.9999)stopped=true;if(a?.unit==='reps')partialReps+=a.n*a.factor;}progress+=fraction;if(r!==ordered.at(-1))prefix=false;}}
  const cap=p.minutes*60,seconds=Number(actualSeconds),timeMatches=Number.isFinite(seconds)&&Math.abs(seconds-cap)<=5,recorded=entries.length>0,bandUnspecified=p.slots.some(s=>/band/i.test(s.exercise)&&/^(exercise ?band|band|bodyweight)?$/i.test(s.load)&&!s.variant),comparable=recorded&&!changed&&prefix&&timeMatches&&!bandUnspecified;
  return {rounds:full,partialReps,totalReps,holdSeconds,progress:Math.round(progress*1e6)/1e6,recorded,comparable,reason:!recorded?empty.reason:bandUnspecified?'Band comparisons need a specified band and setup.':changed?'Exercise, dose, side or load differs from this circuit.':!prefix?'The recorded steps do not form sequential complete rounds and one partial round.':!timeMatches?'A comparison needs the same completed time cap.':'Same circuit, doses, loads, sides and time cap.'};
 }
 function target(value,history=[],roundSeconds=180,caution=false){const p=normalize(value,{strict:true}),sig=signature(p),eligible=history.filter(x=>x.signature===sig&&x.score?.comparable&&x.status==='Complete'&&!x.projectedForecast),last=eligible.at(-1);if(last){const recent=eligible.slice(-2),canPush=recent.length===2&&recent.every(x=>Number(x.effort)>0&&Number(x.effort)<=8),slot=p.slots[Math.min(p.slots.length-1,Math.floor((last.score.progress%1)*p.slots.length))],increment=1/(p.slots.length*slot.dose),baseline=last.score.progress;return {progress:Math.max(0,Math.min(199,caution?baseline*.85:baseline+(canPush?increment:0))),kind:canPush&&!caution?'progression':'repeat',samples:eligible.length,why:caution?'Reduced target for current fatigue; rest and quality take priority.':canPush?'Two comparable completed circuits with controlled effort support a small increase.':'Repeat the last comparable result before raising the target.'};}return {progress:Math.max(.25,Math.min(50,p.minutes*60*.68/Math.max(30,Number(roundSeconds)||180))),kind:'estimated',samples:0,why:'Starting estimate for this mix. A new circuit is not a personal-best comparison; record a baseline.'};}
 function targetText(value,t=value?.target){const p=normalize(value);if(!p||!t)return '';const rounds=Math.floor(t.progress+1e-7),extra=(t.progress-rounds)*p.slots.length,whole=Math.floor(extra+1e-6),fraction=extra-whole,next=p.slots[Math.min(whole,p.slots.length-1)],amount=Math.round(fraction*next.dose);return rounds+' rounds'+(whole?' + '+whole+' movement'+(whole===1?'':'s'):'')+(amount?' + '+amount+' '+next.unit+' '+next.exercise+(next.perSide?' / side':''):'');}
 function roundEntries(value,round){const p=normalize(value,{strict:true});if(!Number.isInteger(round)||round<1||round>200)throw Error('AMRAP: invalid round');return p.slots.map((s,i)=>({id:'b1:'+round+':'+s.id,blockId:'b1',stepId:s.id,round,componentId:'c'+(i+1),actual:s.exercise,dose:s.dose,unit:s.unit,load:s.load,side:s.perSide?'both':'total',status:'complete'}));}
 function clock(minutes,elapsedMs){const cap=Number(minutes)*60000,elapsed=Math.max(0,Number(elapsedMs)||0);return {remainingMs:Math.max(0,cap-elapsed),elapsedMs:Math.min(cap,elapsed),done:elapsed>=cap};}
 // A date-keyed fair draw stays stable on refresh. Previous workouts never choose its side.
 function densityFormat(opportunityKey){
  const text='density-format-v1|'+String(opportunityKey);let h=2166136261;
  for(let i=0;i<text.length;i++){h^=text.charCodeAt(i);h=Math.imul(h,16777619);}
  h^=h>>>16;h=Math.imul(h,0x85ebca6b);h^=h>>>13;h=Math.imul(h,0xc2b2ae35);h^=h>>>16;
  return (h>>>31)===0?'EMOM':'AMRAP';
 }
 return Object.freeze({version:1,normalize,signature,structure,score,target,targetText,roundEntries,clock,densityFormat});
});
