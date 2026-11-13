/* Explicit day exceptions and calendar progression decisions. Never writes actual work. */
(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridAnchorSchedule=api;})(typeof window==='undefined'?null:window,function(){
 'use strict';
 const valid=d=>/^\d{4}-\d{2}-\d{2}$/.test(d||'')&&Number.isFinite(Date.parse(d+'T12:00:00Z'))&&new Date(d+'T12:00:00Z').toISOString().slice(0,10)===d;
 const shift=(d,n)=>new Date(Date.parse(d+'T12:00:00Z')+n*86400000).toISOString().slice(0,10);
 const monday=d=>shift(d,-((new Date(d+'T12:00:00Z').getUTCDay()+6)%7));
 const sessions=['Barbell Strength','Generic Gym','Calisthenics','Strength-Endurance','Conditioning','KB Heavy','KB Power','KB Volume','EMOM','AMRAP'];
 const modes=['70pair','70single','none'];
 function changes(value,{strict=false}={}){
  if(value===undefined)return {};if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length>4000){if(strict)throw Error('Invalid anchor day changes.');return {};}
  const out={},targets=new Set();
  for(const [date,r]of Object.entries(value)){
   const ok=valid(date)&&r?.version===1&&['skip','replace','move','equipment'].includes(r.action)&&sessions.includes(r.originalSession)&&/^(legacy|rotation:[-\w]+|armor:[-\w]+|travel:[-\w]+)$/.test(r.scope||'')&&Number.isFinite(r.createdAt)&&r.createdAt>0&&(!r.followupSession||sessions.includes(r.followupSession))&&(!r.session||sessions.includes(r.session))&&(r.action!=='replace'||sessions.includes(r.session))&&(r.action!=='equipment'||modes.includes(r.kbMode))&&(r.action!=='move'||valid(r.targetDate)&&r.targetDate!==date&&Math.abs((Date.parse(r.targetDate)-Date.parse(date))/86400000)<=7&&!targets.has(r.targetDate));
   if(!ok){if(strict)throw Error('Invalid anchor change on '+date+'.');continue;}
   out[date]={version:1,action:r.action,originalSession:r.originalSession,scope:r.scope,createdAt:r.createdAt,...(r.action==='replace'?{session:r.session,...(modes.includes(r.kbMode)?{kbMode:r.kbMode}:{})}:{}),...(r.action==='move'?{targetDate:r.targetDate,sourceTrainingWeek:Math.max(1,Math.floor(Number(r.sourceTrainingWeek)||1))}:{}),...(r.action==='equipment'?{kbMode:r.kbMode,...(r.session?{session:r.session}:{})}:{}),...(r.followupSession?{followupSession:r.followupSession}:{})};if(r.action==='move')targets.add(r.targetDate);
  }return out;
 }
 function decisions(value,{strict=false}={}){
  if(value===undefined)return {};if(!value||typeof value!=='object'||Array.isArray(value)||Object.keys(value).length>2000){if(strict)throw Error('Invalid progression choices.');return {};}
  const out={};for(const [key,r]of Object.entries(value)){
   const ok=r?.version===1&&valid(r.week)&&/^(legacy|rotation:[-\w]+|armor:[-\w]+)$/.test(r.scope||'')&&key===r.scope+'|'+r.week&&['hold','advance'].includes(r.choice)&&Number.isFinite(r.createdAt)&&r.createdAt>0;
   if(!ok){if(strict)throw Error('Invalid weekly progression choice.');continue;}out[key]={version:1,scope:r.scope,week:r.week,choice:r.choice,createdAt:r.createdAt};
  }return out;
 }
 function heldWeeks(value,scope,travel=[]){const away=new Set(travel.map(t=>t.startDate));return [...new Set(Object.values(decisions(value)).filter(r=>r.scope===scope&&r.choice==='hold'&&!away.has(r.week)).map(r=>r.week))].sort();}
 function holdsBefore(value,scope,date,travel=[]){return heldWeeks(value,scope,travel).filter(w=>shift(w,7)<=date).length;}
 function toDate(value,date){const c=changes(value);return Object.entries(c).map(([source,r])=>({...r,sourceDate:source})).find(r=>r.action==='move'&&r.targetDate===date)||null;}
 function planChange(input){
  const {date,action,originalSession,scope,choice,travel,targetDate,targetFixed,targetBlocked}=input;
  if(!valid(date)||!sessions.includes(originalSession)||!['skip','replace','move','equipment'].includes(action))throw Error('Choose a valid anchor and change.');
  if(!travel&&!['hold','advance'].includes(choice))throw Error('Choose whether to repeat this program week or advance as scheduled.');
  if(action==='replace'&&!sessions.includes(input.session))throw Error('Choose a replacement workout.');
  if(action==='equipment'&&!modes.includes(input.kbMode))throw Error('Choose the kettlebells available today.');
  if(action==='move'){
   if(!valid(targetDate)||targetDate===date||Math.abs((Date.parse(targetDate)-Date.parse(date))/86400000)>7)throw Error('Choose a different date within seven days.');
   if(valid(input.today)&&targetDate<input.today)throw Error('Choose today or a future date. A workout cannot be moved into the past.');
   if(targetFixed)throw Error('That date has a fixed anchor. Choose an open day.');if(targetBlocked)throw Error('That date already has a workout or a day change. Choose another day.');
   if(travel&&(targetDate<travel.start||targetDate>shift(travel.start,6)))throw Error('Move this travel workout within the same travel week. Your regular program keeps its return date.');
  }
  const at=Number(input.now)||Date.now(),record={version:1,action,originalSession,scope,createdAt:at,...(action==='replace'?{session:input.session,...(/^KB /.test(input.session)&&modes.includes(input.kbMode)?{kbMode:input.kbMode}:{})}:{}),...(action==='move'?{targetDate,sourceTrainingWeek:input.sourceTrainingWeek}:{}),...(action==='equipment'?{kbMode:input.kbMode,...(input.session?{session:input.session}:{})}:{})};
  return {record:changes({[date]:record},{strict:true})[date],decision:travel?null:{version:1,scope,week:input.weekStart||monday(date),choice,createdAt:at}};
 }
 function timeline(start,date,travel=[],holds=[]){
  const today=shift(start,7*Math.floor((Date.parse(date)-Date.parse(start))/604800000)),away=new Set(travel),held=new Set(holds);let stage=0,current=null,blockStart=start;
  for(let w=start,i=0;i<10000;i++,w=shift(w,7)){
   if(!away.has(w)){
    if(stage%3===0&&(!current||stage<=current.elapsedWeeks)&&!held.has(shift(w,-7)))blockStart=w;
    if(w===today)current={elapsedWeeks:stage,week:stage%3+1,block:Math.floor(stage/3),blockStart};
    if(current&&w>today&&Math.floor(stage/3)>current.block)return {...current,next:w};
    if(!held.has(w))stage++;
   }
  }throw Error('Program timeline is too long.');
 }
 return Object.freeze({valid,shift,monday,changes,decisions,heldWeeks,holdsBefore,toDate,planChange,sessions,modes,timeline});
});
