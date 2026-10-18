/* Reorders flexible personal sessions from actual evidence. Explicit constraints stay authoritative. */
(function(root,factory){
 const P=typeof module==='object'&&module.exports?require('./training-profile.js'):root.HybridUserProfiles;
 const A=()=>typeof module==='object'&&module.exports?require('./actual-load-feedback-v36.126.js'):root.HybridActualLoadFeedback;const api=factory(P,A);if(typeof module==='object'&&module.exports)module.exports=api;else root.HybridReactiveSchedule=api;
})(typeof window==='object'?window:globalThis,function(P,A){
 'use strict';
 const clone=x=>JSON.parse(JSON.stringify(x)),age=(a,b)=>(Date.parse(b)-Date.parse(a))/86400000;
 function classify(row){
  const s=row.session||'',n=row.exercise||'';
  if(s==='Recovery / Rest'||s==='Active Recovery'||n==='Rest Day')return null;
  if(s==='Conditioning'||row.modelConditioning||row.secondaryTrainingType==='conditioning')return {kind:'cardio',type:/swim/i.test(n)?'swim':/cycl|bike/i.test(n)?'cycle':/row/i.test(n)?'row':/hike|ruck/i.test(n)?'hike':/walk/i.test(n)?'walk':'run'};
  if(s==='EMOM'||s==='AMRAP')return {kind:'cardio',type:'circuits'};
  if(s==='Class / Activity')return {kind:'mobility',type:/pilates/i.test(n)?'pilates':/yoga/i.test(n)?'yoga':'sport'};
  const type=({'Generic Gym':'gym','Home Gym':'homeGym','Barbell Strength':'barbell','Calisthenics':'calisthenics','Strength-Endurance':'se'})[s]||(/^KB /.test(s)?'kettlebell':null);
  return type?{kind:'strength',type}:null;
 }
 function observed(logs,today){
  const groups=new Map();
  for(const r of logs||[]){
   if(!P.validDate(r.date)||r.date>today||r.projectedForecast||r.projectedPlanRow||r.isShortSecondary||r.secondarySessionRole==='short'||r.adaptiveAccessoryFinisher||r.untimedCoreFinisher||!/^(complete|partial)$/i.test(r.status||'')||A().noPerformedWork(r))continue;
   const mode=classify(r);if(!mode)continue;
   const key=r.date+'|'+(r.sessionId||r.sessionTime||r.session)+((r.isFullSecondary||r.secondarySessionRole==='full')?'|full|'+mode.kind+'|'+mode.type:''),prior=groups.get(key),fallback=Number(r.rpe)||({'Too easy':3,Easy:4,Comfortable:6,Challenging:8,'Very hard':9.5,'Max / failed':10})[r.feel]||7,effort=A().workingEffortRpe(r,()=>fallback);
   if(prior){prior.effort=Math.max(prior.effort,effort);continue}
   groups.set(key,{...mode,date:r.date,session:r.session,effort,key,location:r.equipmentContext?.kind==='gym'||mode.type==='gym'||mode.type==='barbell'?'gym':mode.kind==='cardio'?'outdoors':'home',full:!!r.isFullSecondary||r.secondarySessionRole==='full'});
  }
  return [...groups.values()].sort((a,b)=>a.date.localeCompare(b.date)||Number(a.full)-Number(b.full)||a.key.localeCompare(b.key));
 }
 function plan(p,start,input={}){
  const base=P.weekPlan(p,start),today=input.today||start,week=P.monday(start),end=P.day(week,6);
  if(end<today)return base;
  const actual=observed(input.logs,today),within=actual.filter(g=>g.date>=week&&g.date<=end),protectedDates=new Set(input.protectedDates||[]),byDate=new Map(base.map(e=>[e.date,e]));
  const readiness=input.signals?.(today>week?today:week)?.readiness||{};
  if(!actual.some(g=>age(g.date,week)<=21)&&!readiness.caution&&!readiness.recoveryGuard&&!Object.keys(input.contexts||{}).some(d=>d>=week&&d<=end))return base;
  const specs=P.makeSlots(p),byId=new Map(specs.map(s=>[s.id,s])),jobs=base.flatMap(e=>[e.primary,e.secondary].filter(Boolean).map(j=>({...j,date:e.date}))),consumed=new Set();
  // A completed workout consumes a matching target even when performed on a
  // different day. Displaced work may move; an unlogged missed day is not debt.
  for(const g of within){
   const options=jobs.filter(j=>!consumed.has(j.slotId)&&j.kind===g.kind).sort((a,b)=>match(a)-match(b));
   function match(j){return (j.type===g.type?0:20)+(j.date===g.date?0:6)+(j.location===g.location?0:4)+Math.abs(age(j.date,g.date))/10}
   if(options.length)consumed.add(options[0].slotId);
  }
  const completedDates=new Set(within.map(g=>g.date)),fixed=new Set([...protectedDates,...completedDates]),result=clone(base);
  const pending=jobs.filter(j=>!consumed.has(j.slotId)&&!protectedDates.has(j.date)&&(j.date>=today||completedDates.has(j.date)&&byId.get(j.slotId)?.weekday===null));
  // A preplanned second session on a completed day remains optional and fixed.
  for(let i=pending.length-1;i>=0;i--){const j=pending[i];if(completedDates.has(j.date)&&j.sessionRole==='full'){protectedDates.add(j.date);fixed.add(j.date);pending.splice(i,1)}}
  const usedDays=new Set([...completedDates,...[...protectedDates].filter(d=>d>=week&&d<=end&&byDate.get(d)?.primary)]),usedGym=new Set(within.filter(g=>g.location==='gym').map(g=>g.date));
  for(const d of protectedDates)if(d>=week&&d<=end&&[byDate.get(d)?.primary,byDate.get(d)?.secondary].some(j=>j?.location==='gym'))usedGym.add(d);
  const eligible=base.filter(e=>e.date>=today&&(!p.startDate||e.date>=p.startDate)&&!fixed.has(e.date));
  if(!pending.length)return result.map(e=>e.date>=today&&!fixed.has(e.date)?{...e,primary:null,secondary:null,rest:true}:e);
  const signalCache=new Map(),signals=d=>{if(!signalCache.has(d))signalCache.set(d,input.signals?.(d)||{});return signalCache.get(d)};
  function typeCost(job,date,type){
   const s=signals(date),f=s.fatigue||{},muscles=f.muscles||{},domains=f.fatigue||{},r=s.readiness||{},recent=actual.filter(g=>g.date<=date&&age(g.date,date)<=21),same=recent.filter(g=>job.kind==='strength'?g.kind==='strength':g.kind===job.kind&&g.type===type),last=same.at(-1),days=last?age(last.date,date):21;
   const needs=job.kind==='cardio'?{run:{calves:1,quads:.7,hamstrings:.5},hike:{calves:.8,quads:.7},walk:{calves:.3,quads:.2},swim:{shoulders:.8,lats:.8,back:.5},cycle:{quads:.7,glutes:.5},row:{back:.7,hamstrings:.5},circuits:{quads:.5,shoulders:.5}}[type]||{}:job.kind==='strength'?Object.fromEntries(Object.keys(muscles).map(k=>[k,.35])):{};
   const local=Object.entries(needs).reduce((v,[m,w])=>v+(Number(muscles[m])||0)*w,0),impact=['run','hike'].includes(type)?Number(domains.impact)||0:0;
   const restCost=last&&days<3?(3-days)*(last.effort/5)*(job.kind==='strength'?6:4):0;
   const count=Math.max(1,p[job.kind]||1),urgency=Math.min(7,days/(7/count))*Math.exp(-Math.max(0,age(today,date))/5);
   return local*3+impact*4+restCost+(r.recoveryGuard?150:r.caution?(job.kind==='strength'||['run','circuits'].includes(type)?8:2):0)-urgency*3;
  }
  function choices(s){const list=s.type==='auto'?(s.kind==='strength'?p.strengthTypes:s.kind==='cardio'?p.cardioTypes:[p.mobilityType]):[s.type],eq=P.slotEquipment(p,s);return list.filter(t=>P.typeAvailable(p,s.kind,t,eq,s))}
  function bestType(s,d,types=choices(s)){return types.slice().sort((a,b)=>typeCost(s,d,a)-typeCost(s,d,b)||P.hash(d+a)%100-P.hash(d+b)%100)[0]}
  const allowed=(s,d)=>{
   if(!eligible.some(e=>e.date===d))return false;
   const c=input.contexts?.[d]||{};
   if(c.gymAccess==='no'&&s.location==='gym'||c.workoutLocation&&c.workoutLocation!=='auto'&&c.workoutLocation!==s.location)return false;
   return true;
  };
  const rank=(s,d,days)=>{
   const type=bestType(s,d),near=days.flatMap((list,i)=>list.filter(j=>j.kind===s.kind).map(()=>Math.abs(age(P.day(week,i),d)))).reduce((sum,gap)=>sum+(gap<2?12:0),0);
   return typeCost(s,d,type)+near;
  };
  let slots=pending.map(j=>({...byId.get(j.slotId),...j,type:j.prescribedType||byId.get(j.slotId)?.type||j.type,id:j.slotId,role:j.role||'auto'})),scheduled=null;
  // If a disruption makes all targets impossible, omit an unpinned optional
  // session rather than inventing a double or ignoring availability.
  for(let attempt=0;attempt<=pending.length&&slots.length;attempt++){
   const neededDays=Math.min(slots.length,Math.max(0,p.days-usedDays.size),eligible.length);
   if(!neededDays)break;
   const gymVisits=p.gymVisits===null?null:Math.max(0,p.gymVisits-usedGym.size);
   const usedDoubles=[...completedDates].filter(d=>within.filter(g=>g.date===d).length>=2).length,maxDoubles=Math.max(0,(p.doubleMode==='none'?0:p.doubleMode==='sometimes'?1:p.days)-usedDoubles);
   const candidate=P.scheduleWeek(p,start,{slots,neededDays,gymVisits,gymVisitOffset:usedGym.size,maxDoubles,allowed,rank,chooseType:bestType});
   if(!candidate.error){scheduled=candidate.entries;break}
   // Preserve explicit weekdays/times first. Reduced capacity is never made up
   // by silently increasing the requested days or two-session permission.
   const drop=slots.map((s,i)=>({s,i})).reverse().find(({s})=>s.weekday===null&&!s.time&&s.role!=='secondary');
   if(!drop)break;slots.splice(drop.i,1);
  }
  if(!scheduled)return slots.length?base:result.map(e=>e.date>=today&&!fixed.has(e.date)?{...e,primary:null,secondary:null,rest:true}:e);
  const changed=scheduled.some(e=>!fixed.has(e.date)&&JSON.stringify([e.primary?.slotId,e.primary?.type,e.secondary?.slotId,e.secondary?.type])!==JSON.stringify([byDate.get(e.date)?.primary?.slotId,byDate.get(e.date)?.primary?.type,byDate.get(e.date)?.secondary?.slotId,byDate.get(e.date)?.secondary?.type]));
  return result.map(e=>{
   if(e.date<today||fixed.has(e.date))return e;
   const out=scheduled.find(x=>x.date===e.date);
   for(const role of ['primary','secondary'])if(out[role])out[role].adaptiveScheduleReason=changed?'Your schedule responds to completed training, recovery and your remaining targets.':'Your next session reflects recent training, recovery and your weekly targets.';
   return out;
  });
 }
 return Object.freeze({classify,observed,plan});
});
