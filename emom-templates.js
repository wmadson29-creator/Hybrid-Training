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
 const clamp=(x,lo,hi,f)=>Number.isFinite(Number(x))?Math.min(hi,Math.max(lo,Number(x))):f;
 function template(id){return templates.find(t=>t.id===id)||templates[0]}
 function build(config={}){
  const t=template(config.templateId),custom=Array.isArray(config.slots)&&config.slots.length,raw=custom?config.slots:t.slots,rounds=Math.round(clamp(config.rounds,1,10,t.rounds)),kg=clamp(config.kg,0,48,8),slots=raw.slice(0,8).map((s,i)=>({...s,rest:!!s.rest||s.exercise==='Rest',exercise:String(s.exercise||'Rest'),reps:s.rest?0:Math.round(clamp(config.reps?.[i]??s.reps,1,s.seconds?40:30,s.seconds?20:5))})),minutes=Math.round(clamp(config.minutes,2,60,rounds*slots.length));
  if(!slots.some(s=>!s.rest))throw Error('Choose at least one work minute.');
  const id=config.templateId||t.id,name=config.name||(custom?'Build-your-own EMOM':t.name),rows=[],byExercise=new Map();
  for(let minute=0;minute<minutes;minute++){
   const i=minute%slots.length,s=slots[i];if(s.rest)continue;
   const key=s.exercise+'|'+i;if(byExercise.has(key)){byExercise.get(key).sets++;continue}
   const row={exercise:s.exercise,sets:1,reps:s.reps+(s.seconds?' sec'+(s.perSide?' / side':''):s.perSide?' / side':''),weight:s.weight||(s.bodyweight?'Bodyweight':kg+' kg'),conditioning:false,restSeconds:20,expectedRpe:clamp(config.expectedRpe,4,8,6.5),meta:'EMOM · minute '+(i+1)+' of each '+slots.length+'-minute round',note:'Complete the prescribed set before the next minute and rest for the remainder. Cards summarize total work across rounds: follow minute order, not all sets of one card together.',emom:{version:1,templateId:id,templateName:name,intervalSeconds:60,cycleMinutes:slots.length,rounds:Math.ceil(minutes/slots.length),plannedMinutes:minutes,slot:i,perSide:!!s.perSide,targetReps:s.reps,seconds:!!s.seconds,source:config.source||t.source}};
   byExercise.set(key,row);rows.push(row);
  }
  rows.forEach(r=>r.emom.minuteSlots=slots.map(x=>({...x})));
  return {version:1,session:'EMOM',name,templateId:id,rounds:Math.ceil(minutes/slots.length),kg,minutes,intervalSeconds:60,slots,rows,skill:config.skill||t.skill,source:config.source||t.source,url:config.url||t.url||'',note:config.note||t.note,intendedEffort:config.intendedEffort||'Submaximal: finish each work set with reps in reserve',why:config.why||[]};
 }
 function minuteAt(plan,elapsedSeconds){
  const elapsed=Math.max(0,Number(elapsedSeconds)||0),index=Math.floor(elapsed/60),done=index>=plan.minutes,slot=done?null:plan.slots[index%plan.slots.length];
  return {done,minute:Math.min(index+1,plan.minutes),round:Math.min(Math.floor(index/plan.slots.length)+1,plan.rounds),slot,secondsRemaining:done?0:60-Math.floor(elapsed%60)};
 }
 function schedule(plan){return Array.from({length:plan.minutes},(_,i)=>({minute:i+1,round:Math.floor(i/plan.slots.length)+1,...plan.slots[i%plan.slots.length]}))}
 return Object.freeze({version:1,templates:Object.freeze(templates),template,build,minuteAt,schedule});
});

