/* Three-week program overlays. Pure prescriptions; never writes completed work. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridTrainingRotation=api;})(typeof globalThis==='undefined'?null:globalThis,function(){
 'use strict';
 const VERSION=223,DAY_NAMES=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
 const PROGRAMS=Object.freeze({
  'kb-five':{name:'KB 5 + 2 open',days:['full','upper','open','lower','pull','density','open']},
  'kb-barbell-ws':{name:'KB 3 + Barbell · Wed / Sat',days:['open','upper','barbell','full','open','barbell','full']},
  'kb-barbell-ts':{name:'KB 3 + Barbell · Tue / Sat',days:['full','barbell','open','upper','full','barbell','open']},
  'kb-six':{name:'KB 6 · Functional + bodybuilding',days:['full','push','full','pull','full','legs','open']},
  'kb-gym-three':{name:'KB 3 + Gym 2',days:['full','gym-upper','full','open','gym-lower','full','open']},
  'kb-gym-four':{name:'KB 4 + Gym 2',days:['full','gym-upper','full','gym-lower','upper','full','open']}
 });
 const labels={full:'Functional full body',upper:'Chest, upper body and accessories',lower:'Lower body and power',pull:'Back, shoulders and arms',push:'Bodybuilding · push',legs:'Bodybuilding · legs',barbell:'Tactical Barbell',density:'KB EMOM / AMRAP','gym-upper':'Gym · upper body and weak links','gym-lower':'Gym · legs and weak links',open:'Adaptive open day'};
 const isTgu=n=>/turkish|get[ -]?up/i.test(String(n));
 const valid=d=>/^\d{4}-\d{2}-\d{2}$/.test(d||'')&&Number.isFinite(Date.parse(d+'T12:00:00Z'))&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;
 const shift=(d,n)=>new Date(Date.parse(d+'T12:00:00Z')+n*86400000).toISOString().slice(0,10);
 const diff=(a,b)=>Math.round((Date.parse(b+'T12:00:00Z')-Date.parse(a+'T12:00:00Z'))/86400000);
 const hash=s=>{let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0;};
 const clone=v=>JSON.parse(JSON.stringify(v));
 function normalize(value,{strict=false}={}){
  if(value===undefined)return [];
  if(!Array.isArray(value)||value.length>120){if(strict)throw Error('Invalid rotating-program schedule.');return [];}
  const ids=new Set(),out=[];
  for(const c of value){
   if(c?.version!==1||!PROGRAMS[c.mode]||!/^[-\w]{1,100}$/.test(c.id||'')||ids.has(c.id)||!valid(c.startDate)||new Date(c.startDate+'T12:00:00Z').getUTCDay()!==1||c.endDate&&(!valid(c.endDate)||c.endDate<c.startDate)){
    if(strict)throw Error('Each program needs a unique ID, known program and Monday start.');continue;
   }
   ids.add(c.id);out.push({version:1,id:c.id,mode:c.mode,startDate:c.startDate,...(c.endDate?{endDate:c.endDate}:{}),baseWeek:Math.max(1,Math.min(9999,Math.floor(Number(c.baseWeek)||1))),allowLight:c.allowLight!==false,formats:c.formats!==false,challenge:c.challenge!==false});
  }
  out.sort((a,b)=>a.startDate.localeCompare(b.startDate));
  if(strict&&out.some((c,i)=>i&&(!out[i-1].endDate||out[i-1].endDate>=c.startDate)))throw Error('Rotating programs overlap.');
  return out;
 }
 function context(programs,date,travel=[]){
  if(!valid(date))return null;
  const c=normalize(programs).filter(c=>date>=c.startDate&&(!c.endDate||date<=c.endDate)).at(-1);if(!c)return null;
  const weeks=[...new Set(travel.map(t=>t.startDate).filter(valid))].sort(),todayWeek=shift(date,-((new Date(date+'T12:00:00Z').getUTCDay()+6)%7));
  if(weeks.includes(todayWeek))return null;
  const pauses=weeks.filter(w=>w>=c.startDate&&w<todayWeek).length,elapsed=Math.max(0,Math.floor(diff(c.startDate,date)/7)-pauses),day=(new Date(date+'T12:00:00Z').getUTCDay()+6)%7,role=PROGRAMS[c.mode].days[day],week=elapsed%3+1,block=Math.floor(elapsed/3),kbDays=PROGRAMS[c.mode].days.map((r,i)=>!['open','barbell','gym-upper','gym-lower'].includes(r)?i:-1).filter(i=>i>=0),slot=kbDays.indexOf(day);
  const session=role==='barbell'?'Barbell Strength':role.startsWith('gym')?'Generic Gym':role==='open'?'Open Training':role==='density'?(elapsed%2?'AMRAP':'EMOM'):['KB Heavy','KB Power','KB Volume'][Math.max(0,slot)%3];
  let blockStart=shift(todayWeek,-(week-1)*7);for(const w of weeks.slice().reverse())if(w>=blockStart&&w<todayWeek)blockStart=shift(blockStart,-7);
  let next=shift(todayWeek,(4-week)*7);for(const w of weeks)if(w>=todayWeek&&w<next)next=shift(next,7);
  return {cycle:c,mode:c.mode,date,day,role,label:labels[role],session,slot,week,block,elapsedWeeks:elapsed,blockStart,next,bodybuilding:c.mode==='kb-six'&&['push','pull','legs'].includes(role),barbell:c.mode.startsWith('kb-barbell'),name:PROGRAMS[c.mode].name};
 }
 function schedule(c){return DAY_NAMES.map((d,i)=>{const role=PROGRAMS[c.mode].days[i],slot=PROGRAMS[c.mode].days.slice(0,i).filter(r=>!['open','barbell','gym-upper','gym-lower'].includes(r)).length;return [d,role==='barbell'?'Barbell Strength':role.startsWith('gym')?'Generic Gym':role==='open'?'Open Training':role==='density'?(c.elapsedWeeks%2?'AMRAP':'EMOM'):['KB Heavy','KB Power','KB Volume'][slot%3],labels[role]];});}
 const POOLS={
  squat:['Double Front Squat','Double Pause Front Squat','Goblet Squat','Kettlebell Somersault Squat'],
  hinge:['Double RDL','Double Kettlebell Sumo Deadlift','Double Deadlift','Single-Leg RDL'],
  chest:['Double Floor Press','Alternating Double Kettlebell Floor Press','Kettlebell Crush Press','Feet-Elevated Kettlebell Push-Up'],
  row:['Double Bent-Over Row','Gorilla Row','Renegade Row','Single-Arm Row'],
  press:['Double Strict Press','Double Push Press','Seated Alternating Kettlebell Press','Single-Arm Strict Press'],
  power:['Double Clean','Double Clean & Press','Double Thruster','Single-Arm High Pull','Kettlebell Ballistic Row','Double Swing to Press','Single-Arm Snatch','Kettlebell Gorilla High Pull'],
  lunge:['Double Reverse Lunge','Double Kettlebell Suitcase Split Squat','Single Rack Reverse Lunge'],
  biceps:['Two-Hand Kettlebell Biceps Curl','Kettlebell Hammer Curl','Single-Arm Kettlebell Curl'],
  triceps:['Kettlebell Overhead Triceps Extension','Kettlebell Crush Press'],
  shoulders:['Kettlebell Upright Row','Two-Hand Kettlebell Front Raise','Kettlebell Lateral Raise'],
  calves:['Double Kettlebell Standing Calf Raise','Kettlebell Standing Calf Raise'],
  traps:['Double Kettlebell Shrug','Single-Arm Kettlebell Shrug'],
  swing:['Two-Hand Swing','Double Swing']
 };
 const SLOTS={full:['power','squat','chest','row','hinge','press','biceps','calves','swing'],upper:['power','chest','row','press','chest','shoulders','biceps','triceps','traps'],lower:['power','squat','hinge','lunge','squat','calves','traps','swing'],pull:['row','row','hinge','shoulders','biceps','traps','biceps','calves'],push:['chest','press','chest','shoulders','triceps','triceps','calves','biceps'],legs:['squat','hinge','lunge','squat','calves','hinge','calves','traps']};
 const benchmark={squat:'Double Front Squat',hinge:'Double RDL',chest:'Double Floor Press',row:'Double Bent-Over Row'};
 function select(c,{available=()=>true,score=()=>0,recent=[],history=[]}={}){
  const used=new Set(),slots=SLOTS[c.role]||SLOTS.full,rows=[];
  for(const [index,family]of slots.entries()){
   const candidates=(POOLS[family]||[]).filter(n=>!used.has(n)&&!isTgu(n)&&available(n,c));
   const anchor=benchmark[family],first=slots.indexOf(family)===index;
   candidates.sort((a,b)=>{const value=n=>(first&&n===anchor?40:0)+score(n,c)-recent.filter(x=>x.exercise===n).length*1.5+(hash(c.cycle.id+'|'+c.block+'|'+(first&&anchor?'anchor':c.week)+'|'+c.slot+'|'+n)%1000)/100;return value(b)-value(a);});
   const name=candidates[0];if(!name)continue;used.add(name);
   const last=history.find(r=>r.exercise===name),bad=last?.bad,technical=family==='power',accessory=['biceps','triceps','shoulders','calves','traps'].includes(family),base=technical?4:family==='swing'?10:family==='calves'?15:accessory?10:8,sets=technical?3:index<5?4:3;
   // Keep foundations stable within a block. Wave repetitions, never all axes at once.
   const add=bad?0:technical?(c.week===3?1:0):c.week-1;
   rows.push({exercise:name,family,sets,base,reps:base+add,kbIntent:technical?'power':family==='swing'?'conditioning':accessory?'hypertrophy':'strength',restSeconds:60,light:!!(c.cycle.allowLight&&['biceps','triceps','shoulders'].includes(family)&&!/Two-Hand|Crush/.test(name))});
  }
  return rows;
 }
 function format(c,{requested='',history=[],recovery=false,upcomingLower=false,recentChallenge=false}={}){
  if(requested)return requested;
  if(!c.cycle.formats||c.bodybuilding||c.role!=='full')return 'sets';
  // A challenge is an occasional alternative, at most one opportunity per block.
  if(c.cycle.challenge&&c.week===3&&c.slot===0&&!recovery&&!upcomingLower&&!recentChallenge&&history.length>=3)return 'rep-target';
  return ['circuit','sets','complex'][(c.block+c.week+c.slot)%3];
 }
 const middle=a=>{const x=a.filter(Number.isFinite).sort((a,b)=>a-b);return x.length?x[Math.floor(x.length/2)]:0;};
 function repTargets(specs,{history=[],kg=12,recovery=false,caution=false,upcomingLower=false,week=1,goal='conditioning',recentHingeReps=0}={}){
  goal=['conditioning','endurance','challenge'].includes(goal)?goal:'conditioning';
  return specs.map(s=>{
   const swing=/swing/i.test(s.exercise),hinge=/swing|rdl|deadlift/i.test(s.exercise),technical=/snatch|clean|high pull|ballistic|thruster/i.test(s.exercise),matching=history.filter(r=>r.exercise===s.exercise&&r.complete&&r.good&&!r.bad&&r.kg>=kg-.25).slice(0,4),totals=matching.map(r=>r.totalReps||r.sets*r.reps||0).filter(n=>n>0),prior=middle(totals),effort=middle(matching.map(r=>Number(r.rpe)||7)),heavy=kg>=24,cap=hinge?(upcomingLower?60:150):120;
   const initial=(swing?60:hinge?40:50)*(heavy?.6:1),earned=matching.length>=2&&effort<=8?prior*(goal==='challenge'&&week===3?1.1:goal==='endurance'?1.025:1):prior||initial;
   let total=Math.min(cap,earned,technical?48:Infinity);
   if(recovery)total*=.6;else if(caution)total*=.8;
   if(hinge&&upcomingLower)total*=.75;
   if(hinge&&recentHingeReps>=240)total*=.7;
   total=Math.max(8,Math.round(total/5)*5);
   const observed=middle(matching.map(r=>Number(r.cleanSetReps)||Number(r.reps)||0)),maxSize=technical?6:swing?15:hinge?10:12,minSize=technical?2:hinge?4:5;
   let size=Math.round(observed?(effort>=8?observed*.7:observed*.85):(swing?10:hinge?6:8));
   size=Math.max(minSize,Math.min(maxSize,size,total));if(heavy||recovery)size=Math.max(minSize,Math.floor(size*.8));
   const actualRest=middle(matching.map(r=>Number(r.observedRestSeconds)||0).filter(n=>n>=20&&n<=240));
   let rest=goal==='endurance'?45:goal==='challenge'?75:60;
   if(heavy||effort>=8||recovery||hinge&&upcomingLower)rest+=30;
   if(actualRest)rest=Math.max(rest,Math.round(actualRest/15)*15);
   rest=Math.max(30,Math.min(150,rest));
   const setReps=[];for(let left=total;left>0;left-=size)setReps.push(Math.min(left,size));
   const factors=[prior?'Median of '+matching.length+' comparable completed workouts: '+prior+' reps.':'Provisional total at this load; no comparable completed workload.',goal+' emphasis',heavy?'heavier bell: smaller sets':'',recovery?'reduced recovery':caution?'recovery caution':'',hinge&&upcomingLower?'lower-body anchor tomorrow':'',hinge&&recentHingeReps>=240?'substantial recent hinge work':''].filter(Boolean);
   return {...s,sets:setReps.length,reps:size,setReps,totalReps:total,restSeconds:rest,targetGoal:goal,estimatedEffort:goal==='challenge'?8:goal==='endurance'?6:7,reason:factors.join(' · ')+'. '+setReps.length+' manageable sets; rest '+rest+' seconds. This is conditioning/endurance practice or an occasional challenge, not a default strength/hypertrophy dose.'};
  });
 }
 function calibrate({load,reps=8,sets=3,feel='',rpe=0,bad=false,slight=false,step=5,assistance=false,choices=[]}={}){
  if(!(load>0)||bad)return null;
  const clearly=rpe>0?rpe<=4.5:/too easy|very easy|definitely/i.test(feel),small=rpe>0?rpe<=6:slight||/slightly|\beasy\b/i.test(feel);
  if(!clearly&&!small)return null;
  const factor=clearly?1.15:1.05,change=Math.max(step,Math.min(load*.25,load*(factor-1))),target=assistance?Math.max(0,load-change):load+change;
  const sorted=[...new Set(choices)].sort((a,b)=>a-b),next=sorted.length?(assistance?sorted.filter(v=>v<load&&v>=target-step/2).at(0):sorted.filter(v=>v>load&&v<=target+step/2).at(-1)):assistance?Math.max(0,Math.round(target/step)*step):(clearly?Math.ceil(target/step):Math.floor(target/step))*step;
  return {load:Number.isFinite(next)?next:load,reps,sets,calibrated:true,clear:clearly,reason:(clearly?'Clearly underloaded':'Slightly easy')+' actual work calibrates the next load from '+load+'; sets and reps stay anchored to demonstrated work.'};
 }
 function transfer(target,candidates,{targetReps=8}={}){
  const usable=candidates.filter(c=>c.good&&c.load>0&&c.reps>=4&&c.reps<=20&&c.similarity>=.55&&c.sameImplement&&c.sameLoading&&c.sameMachine!==false).sort((a,b)=>b.similarity-a.similarity).slice(0,3);
  if(!usable.length)return null;
  // A deliberately discounted starting estimate, with no cross-machine stack
  // equivalence or summed pair-to-single equivalence.
  const values=usable.map(c=>c.load*Math.min(1,(30+c.reps)/(30+targetReps))*.8*c.similarity),n=values.sort((a,b)=>a-b)[Math.floor(values.length/2)];
  return {load:n,sources:usable.map(c=>c.exercise),confidence:'provisional',reason:'Related completed work gives a discounted starting estimate. Confirm this exercise at the proposed load; equipment and hand loading must match.'};
 }
 function reviews(value,{strict=false}={}){if(value==null)return {};if(typeof value!=='object'||Array.isArray(value)||Object.keys(value).length>1200){if(strict)throw Error('Invalid program reviews.');return {};}const out={};for(const [key,r]of Object.entries(value)){if(!/^[-\w]{1,100}\|\d{1,4}$/.test(key)||!r||!/^[-\w]{1,100}$/.test(r.cycleId)||!Number.isInteger(r.block)||r.block<0||r.block>9999||!['continue','switch','end'].includes(r.choice)){if(strict)throw Error('Invalid program review.');continue;}const loads={};for(const [slot,kg]of Object.entries(r.loads||{})){if(!/^[0-6]$/.test(slot)||!Number.isFinite(kg)||kg<3.5||kg>32){if(strict)throw Error('Invalid next-block bell setting.');continue;}loads[slot]=kg;}out[key]={cycleId:r.cycleId,block:r.block,nextBlock:r.block+1,choice:r.choice,reviewedAt:Math.max(0,Number(r.reviewedAt)||0),loads};}return out;}
 function metadata(value){let v=value;if(typeof v==='string'){try{v=JSON.parse(v)}catch(__hybridComputeError){return null;}}if(v?.version!==1||!PROGRAMS[v.mode]||!/^[-\w]{1,100}$/.test(v.cycleId||'')||!valid(v.date)||!['sets','circuit','complex','rep-target'].includes(v.format)||!Number.isInteger(v.week)||v.week<1||v.week>3||!Array.isArray(v.setReps)||!v.setReps.length||v.setReps.length>40||v.setReps.some(n=>!Number.isInteger(n)||n<1||n>40))return null;return {version:1,mode:v.mode,cycleId:v.cycleId,date:v.date,slot:Number.isInteger(v.slot)&&v.slot>=0&&v.slot<=6?v.slot:undefined,week:v.week,format:v.format,group:String(v.group||'').slice(0,160),setReps:v.setReps.slice(),totalReps:v.setReps.reduce((a,b)=>a+b,0),light:!!v.light,family:String(v.family||'').replace(/[^a-z-]/g,'').slice(0,30),goal:['conditioning','endurance','challenge'].includes(v.goal)?v.goal:'',restSeconds:Math.max(0,Math.min(300,Number(v.restSeconds)||0)),estimatedEffort:Math.max(0,Math.min(10,Number(v.estimatedEffort)||0))};}
 return Object.freeze({VERSION,PROGRAMS,labels,POOLS,SLOTS,valid,shift,diff,hash,normalize,context,schedule,select,format,repTargets,calibrate,transfer,reviews,metadata,isTgu,clone});
});
