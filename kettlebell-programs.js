/* Dated Armor Building cycles and one-setup daily kettlebell prescriptions. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridKbPrograms=api})(typeof window==='undefined'?null:window,function(){
 'use strict';
 const SESSIONS=['KB Heavy','KB Power','KB Volume'],DAY_NAMES=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
 const clone=x=>JSON.parse(JSON.stringify(x)),same=(a,b)=>Math.abs(Number(a)-Number(b))<.02;
 const valid=s=>/^\d{4}-\d{2}-\d{2}$/.test(String(s))&&Number.isFinite(Date.parse(s+'T12:00:00Z'))&&new Date(s+'T12:00:00Z').toISOString().slice(0,10)===s;
 function context(cycles,date){
  if(!valid(date))return null;
  for(const c of (Array.isArray(cycles)?cycles:[]).slice().sort((a,b)=>String(b.startDate).localeCompare(String(a.startDate)))){
   if(!valid(c?.startDate)||!['armor','armor-barbell'].includes(c.mode)||new Date(c.startDate+'T12:00:00Z').getUTCDay()!==1)continue;
   const days=Math.round((Date.parse(date+'T12:00:00Z')-Date.parse(c.startDate+'T12:00:00Z'))/86400000);
   if(days<0||days>=56)continue;
   const hybrid=c.mode==='armor-barbell',daysOfKb=hybrid?[1,4,6]:[0,2,4],day=days%7,slot=daysOfKb.indexOf(day);
   return {cycle:c,week:Math.floor(days/7)+1,day,slot,hybrid,session:slot>=0?SESSIONS[slot]:hybrid&&[0,3].includes(day)?'Barbell Strength':'Open Training'};
  }
  return null;
 }
 function schedule(c){return DAY_NAMES.map((day,i)=>{const slot=(c.hybrid?[1,4,6]:[0,2,4]).indexOf(i);return [day,slot>=0?SESSIONS[slot]:c.hybrid&&[0,3].includes(i)?'Barbell Strength':'Open Training',slot>=0?prescription(c.week,slot,{hybrid:c.hybrid,short:c.cycle?.pressLadder==='short'}).map(b=>b.type==='press'?b.total+' presses in ladders':b.rounds+' ABC rounds').join(' then '):c.hybrid&&[0,3].includes(i)?'Barbell maintenance':'Adaptive open day']})}
 function ladder(total,short=false){
  const scheme=short?[2,3,5]:[2,3,5,10],out=[];let left=Math.max(0,Math.floor(total)),i=0;
  while(left>0&&out.length<50){const n=Math.min(left,scheme[i++%scheme.length]);out.push(n);left-=n}
  return out;
 }
 function prescription(week,slot,{hybrid=false,short=false}={}){
  week=Math.max(1,Math.min(8,Math.floor(Number(week)||1)));slot=Math.max(0,Math.min(2,Math.floor(Number(slot)||0)));
  const press={type:'press',total:week===1?20:30},abc={type:'abc',rounds:week===1?5:10};
  let blocks;
  if(week<=2)blocks=(week+slot)%2===1?[press,abc]:[abc,press];
  else{
   const table={3:[['press',40],['abc',15],['press',20]],4:[['abc',10],['press',60],['abc',10]],5:[['press',40],['abc',20],['press',40]],6:[['abc',15],['press',80],['abc',10]],7:[['press',short?50:60],['abc',30],['press',short?40:40]],8:[['abc',15],['press',100],['abc',20]]};
   const [type,n]=table[week][slot];blocks=[type==='press'?{type,total:n}:{type,rounds:n}];
  }
  // The second option is explicitly a hybrid adaptation, not the book's peak-dose plan.
  if(hybrid)blocks=blocks.map(b=>b.type==='abc'?{...b,rounds:Math.min(20,b.rounds)}:{...b,total:Math.min(60,b.total)});
  return blocks.map((b,i)=>({...b,id:'abf-w'+week+'-d'+(slot+1)+'-b'+i,...(b.type==='press'?{ladder:ladder(b.total,short)}:{})}));
 }
 function shared(rows,{choices=[],session='',groups=[],ready=true}={}){
  const source=clone(rows),eligible=source.filter(r=>!r.kbWeeklyCore&&Number(r.kg)>0);
  if(!eligible.length||!choices.length)return {rows:source,kg:0,changed:false};
  // Explicit per-exercise overrides keep their meaning, including deliberate different loads.
  if(eligible.some(r=>Number(r.manualKg)>0||r.manualTarget)){if(new Set(eligible.map(r=>r.kg)).size>1)for(const r of eligible){const note='Your explicit manual exercise loads are retained. This manual workout needs bell changes; choose one shared load to avoid them. ';r.targetReason=note+(r.targetReason||'');r.note=note+(r.note||'')}return {rows:source,kg:0,manual:true,changed:false};}
  const floor=n=>choices.filter(x=>x<=n+.01).at(-1)||choices[0];
  let kg=floor(Math.min(...eligible.map(r=>r.kg))),raised=false,held=false;
  const names=[...new Set(eligible.map(r=>r.exercise))];
  // Saved goals describe the plan. Actual repeatable working sets must support it;
  // 0.25 kg allows lb-display rounding without accepting a lower hardware step.
  const comparable=groups.filter(g=>names.every(n=>g.rows.some(r=>r.exercise===n&&!r.secondary&&r.complete))&&g.rows.filter(r=>names.includes(r.exercise)).every(r=>r.shared&&same(r.shared.kg,g.rows.find(x=>x.exercise===names[0]).shared?.kg)&&Number.isFinite(r.actualKg)&&r.actualKg>=Number(r.shared.kg)-.25));
  const last=comparable[0];
  if(last){
   const latestGroup=groups.find(g=>g.rows.some(r=>names.includes(r.exercise))),badRows=[...last.rows,...(latestGroup?.rows||[])].filter(r=>names.includes(r.exercise)&&r.bad);
   // A saved setup cannot override a lower current dose ceiling or a failed
   // lighter actual attempt. Keep the entire day's setup within those bounds.
   kg=floor(Math.min(kg,Number(last.rows.find(r=>r.exercise===names[0]).shared.kg),...badRows.map(r=>r.actualKg).filter(n=>Number.isFinite(n)&&n>0)));
   const bad=badRows.length>0,lower=choices.filter(x=>x<kg-.01).at(-1);
   if(bad&&lower)kg=lower;
   else if(ready&&comparable.length>=2){
    // A newer partial, missing movement or failed attempt blocks older successes.
    const latest=groups.filter(g=>g.rows.some(r=>names.includes(r.exercise))).slice(0,2);
    const earned=latest.length===2&&latest.every((g,i)=>g===comparable[i])&&latest.every(g=>names.every(n=>{const r=g.rows.find(r=>r.exercise===n),goal=r?.shared;return goal&&same(goal.kg,kg)&&r.good&&r.sets>=goal.goalSets&&r.reps>=goal.goalReps&&(!r.ballistic||r.crisp)}));
    const next=choices.find(x=>x>kg+.01),supported=eligible.every(r=>Number(r.kg)>=kg-.01);
    if(earned&&next&&supported){kg=next;raised=true}else held=true;
   }else held=true;
  }
  const why='One weight for this KB day: '+kg+' kg per bell. '+(raised?'Every main movement earned the shared step in two completed full workouts; restart its rep range.':held?'Keep this setup while individual movements build reps or rounds. A shared increase waits for two complete, comfortable full workouts across every main movement.':'Start from the lightest main-movement target and calibrate each exercise at this shared load.');
  for(const r of eligible){
   const old=Number(r.kg),suffix=String(r.reps).match(/\s*\/?\s*(?:side|leg)\b/i)?.[0]||'',n=Number.parseFloat(r.reps),low=Number(r.repLow)||n,high=Number(r.repHigh)||n;
   // No tonnage or implement equivalence: just a bounded rep adjustment at a lighter bell.
   if(Number.isFinite(n)&&!r.armorBlock){
    if(raised&&kg>old+.01)r.reps=String(low)+suffix;
    else if(old>kg+.01&&ready&&high>n)r.reps=String(Math.min(high,n+2))+suffix;
    else if(held&&ready&&old>kg+.01)r.reps=String(high)+suffix;
   }
   r.kg=kg;r.weight=kg+' kg'+(r.load==='double'?' / bell':'');
   r.kbSharedLoad={version:1,session,kg,goalSets:Math.max(Number(r.roundHigh)||0,Number(r.kbDoseContext?.baseSets)||0,Number(r.sets)),goalReps:high,raised};
   const baseWhy=r.kbSetupBaseReason??r.targetReason??'',baseNote=r.kbSetupBaseNote??r.note??'',cue=baseWhy&&baseNote.startsWith(baseWhy)?baseNote.slice(baseWhy.length):baseNote;
   const dose=!same(old,kg)?'This movement uses the shared '+kg+' kg setting for '+r.sets+' × '+r.reps+'. Build its own bounded rep or round target before changing the whole day’s load.':baseWhy;
   r.targetReason=why+' '+dose;r.note=why+' '+dose+' '+cue;delete r.kbSetupBaseReason;delete r.kbSetupBaseNote;delete r.kbSetup;
  }
  return {rows:source,kg,raised,held,why,changed:eligible.some((r,i)=>!same(r.kg,rows.filter(x=>!x.kbWeeklyCore&&Number(x.kg)>0)[i]?.kg))};
 }
 // Standalone ABC progresses the whole matched pair, never one movement's bell.
 // These bounded starting doses are app choices, not another book calendar.
 function abc(options={}){
  const choices=[...new Set((options.choices||[]).map(Number).filter(n=>n>0&&n<=60))].sort((a,b)=>a-b);
  if(!choices.length)return {available:false,reason:'A matched pair of kettlebells is needed.'};
  const h=(options.history||[]).slice(0,2),last=h[0],previous=h[1],snap=n=>choices.filter(x=>x<=n+.25).at(-1)||choices[0];
  let kg=snap(last?.kg>0?last.kg:16),rounds=last?.kg>0&&last?.rounds>0?Math.max(3,Math.min(15,Math.floor(last.rounds))):5;
  let why=last?'Reuse the latest actual ABC load and rounds.':'Start with five rounds; confirm that one clean strict press is comfortable with this pair.';
  const owned=x=>x?.good===true&&x.complete===true&&Number(x.kg)>0&&Math.abs(x.kg-kg)<=.25&&Number(x.rounds)>=rounds;
  if(last?.bad){kg=snap(Math.min(kg,Number(last.kg)||kg)-.5);rounds=Math.max(3,Math.floor(rounds*.7));why='The latest ABC was too hard or incomplete; use a lighter matched pair if available and fewer rounds.';}
  else if(!options.caution&&h.length===2&&owned(last)&&owned(previous)){
   if(rounds<15){rounds++;why='Two independent, complete and comfortable ABC sessions earned one more round at the same load.';}
   else {const next=choices.find(n=>n>kg+.25);if(next){kg=next;rounds=5;why='Two comfortable fifteen-round sessions earned the next shared bell setting; restart at five rounds.';}}
  }
  if(options.caution){rounds=Math.min(rounds,4);why+=' Readiness is reduced, so hold the load and use at most four rounds.';}
  const budget=Number(options.minutes)>0?Number(options.minutes):Infinity,cap=Math.floor((budget-5)/1.5);
  if(cap<3)return {available:false,reason:'Allow at least ten minutes including setup and recovery.'};
  if(rounds>cap){rounds=cap;why+=' The round target fits the saved time limit.';}
  return {available:true,kg,rounds,restSeconds:60,minutes:Math.ceil(5+rounds*1.5),why};
 }
 return Object.freeze({context,schedule,prescription,ladder,shared,abc,SESSIONS});
});
