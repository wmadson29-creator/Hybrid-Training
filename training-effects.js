/* Separate adaptation and fatigue planning priors. None are measured physiological units. */
(function(root,factory){
 const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridTrainingEffects=api;
})(typeof globalThis==='undefined'?this:globalThis,function(){
 'use strict';
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,Number(x)||0));
 function curve(x,points){x=Number(x)||0;if(x<=points[0][0])return points[0][1];for(let i=1;i<points.length;i++){const [a,u]=points[i-1],[b,v]=points[i];if(x<=b)return u+(v-u)*(x-a)/(b-a)}return points.at(-1)[1]}
 function effort(rpe,goal){
  const r=Number(rpe);if(!(r>0&&r<=10))return .8;
  if(goal==='fatigue')return curve(r,[[1,.25],[4,.42],[6,.62],[8,.95],[9,1.12],[10,1.4]]);
  if(goal==='strength')return curve(r,[[1,.45],[4,.65],[6,.85],[8,.96],[9,1],[10,1]]);
  return curve(r,[[1,.18],[4,.35],[6,.62],[8,.92],[9,1],[10,1.02]]);
 }
 function anatomy(name,definition,fp={}){
  const ex=definition||{},p=ex.exerciseProfile||{},n=String(name||'').toLowerCase(),raw=fp.muscles||{},primary=new Set(p.primary||ex.primaryMuscles||[]),assist=new Set(p.assist||ex.secondaryMuscles||[]),stabilizers=new Set([...(p.stabilizers||[]),...(ex.stabilizers||[])]);
  if(!primary.size){for(const [m,v]of Object.entries(raw)){if(v>=.82)primary.add(m);else if(v>=.38)assist.add(m);else if(v>0)stabilizers.add(m)}}
  // Holding the torso or implement is relevant to fatigue, but is different from
  // direct trunk/grip work. Broad families cannot turn wrist curls into biceps work.
  if(/wrist|forearm|dead hang/.test(n)){primary.clear();primary.add('grip');assist.clear();for(const m of Object.keys(raw))if(m!=='grip')stabilizers.add(m)}
  if(/dead hang/.test(n)){stabilizers.add('lats');stabilizers.add('shoulders');stabilizers.delete('biceps');stabilizers.delete('upperBack')}
  if(/carry|suitcase hold|farmer.*hold/.test(n)){primary.add('grip');primary.add('core')}
  if(/hanging.*(?:raise|l-sit|wiper)|toes-to-bar/.test(n)){primary.clear();primary.add('core');for(const m of ['grip','lats','shoulders']){assist.delete(m);stabilizers.add(m)}}
  if(!primary.has('core')&&assist.has('core')){assist.delete('core');stabilizers.add('core')}
  if(!primary.has('grip')&&assist.has('grip')){assist.delete('grip');stabilizers.add('grip')}
  if(/tibialis|dorsiflexion/.test(n)){primary.clear();primary.add('tibialis');assist.clear();stabilizers.delete('calves');stabilizers.delete('gastroc');stabilizers.delete('soleus')}
  if(/pullover|straight-arm.*pulldown/.test(n)&&!/standing pullover/.test(n)){primary.clear();primary.add('lats');assist.delete('biceps');stabilizers.delete('biceps')}
  if(/hip thrust|glute bridge|frog pump|glute drive/.test(n)){primary.clear();primary.add('glutes');assist.delete('hamstrings');assist.add('hamHipExt')}
  for(const m of primary){assist.delete(m);stabilizers.delete(m)}for(const m of assist)stabilizers.delete(m);
  const credits={},involvement={},fatigueMuscles={},put=(m,credit,involve,stress)=>{credits[m]=credit;involvement[m]=involve;fatigueMuscles[m]=stress};
  primary.forEach(m=>put(m,1,1,1));assist.forEach(m=>put(m,.5,.55,.6));stabilizers.forEach(m=>put(m,m==='grip'?.15:.1,m==='grip'?.4:.25,m==='grip'?.65:m==='core'?.45:.35));
  // Functional subdivisions remain separate diagnostic channels, never additional
  // whole-muscle sets to be summed into the parent channel.
  const parents={hamKneeFlex:'hamstrings',hamHipExt:'hamstrings',tricepsLong:'triceps',tricepsOther:'triceps',gastroc:'calves',soleus:'calves'};
  for(const [m,parent]of Object.entries(parents))if(!(m in credits)&&raw[m]>0&&parent in credits)put(m,credits[parent]*raw[m],involvement[parent]*raw[m],fatigueMuscles[parent]*raw[m]);
  return {primary:[...primary],assist:[...assist],stabilizers:[...stabilizers],credits,involvement,fatigueMuscles};
 }
 function muscleDoseMap(fp={}){const raw=fp.muscleCredits||fp.muscles||{},scale=fp.muscleCredits?(fp.adaptationScale??1):1;return Object.fromEntries(Object.entries(raw).map(([m,v])=>[m,clamp(v,0,1)*clamp(scale,0,1)]))}
 function setEffects({reps=0,seconds=0,timed=false,rpe=0,power=0,strengthDemand=.4,adaptationScale=1,technique='',restSeconds=null}={}){
  const count=clamp(reps,0,300),sec=clamp(seconds,0,1800),scale=clamp(adaptationScale,0,1),demand=clamp(strengthDemand,0,1),ballistic=clamp(power,0,1);
  const hypertrophyRep=timed?curve(sec,[[0,0],[5,.35],[20,.7],[45,.9],[90,.9],[180,.8]]):curve(count,[[0,0],[1,.45],[3,.7],[6,1],[30,1],[50,.85],[100,.65]]);
  const strengthRep=timed?curve(sec,[[0,0],[5,.5],[20,.7],[45,.65],[90,.5],[180,.35]]):curve(count,[[0,0],[1,1.08],[3,1.08],[6,1],[10,.84],[20,.6],[35,.42],[100,.25]]);
  const effectiveSets=hypertrophyRep*effort(rpe,'hypertrophy')*scale;
  const strengthStimulus=strengthRep*effort(rpe,'strength')*(.55+demand*.55)*scale;
  // Recovery cost uses performed work and effort independently of adaptation
  // credit. Long near-failure sets need not earn more maximal-strength credit.
  const work=timed?curve(sec,[[0,0],[5,.55],[20,.85],[45,1.1],[90,1.35],[180,1.6]]):curve(count,[[0,0],[1,.65],[3,.8],[8,1],[15,1.12],[30,1.3],[60,1.5],[100,1.65]]);
  const acuteFatigue=work*effort(rpe,'fatigue')*(.72+demand*.38);
  const quality=/sloppy|poor|failed/i.test(technique)?.25:/crisp/i.test(technique)?1:.75;
  const powerReps=timed?0:curve(count,[[0,0],[1,1],[5,1],[10,.8],[20,.55],[40,.3],[100,.12]]);
  const powerEffort=Number(rpe)>8?curve(rpe,[[8,1],[9,.8],[10,.5]]):1;
  const rest=restSeconds===null||restSeconds===''||!Number.isFinite(Number(restSeconds))?.85:curve(Number(restSeconds),[[0,.5],[30,.6],[60,.75],[120,.9],[180,1]]);
  const powerStimulus=ballistic*powerReps*quality*powerEffort*rest;
  const enduranceStimulus=(timed?clamp(sec/45,0,1.8):clamp(count/15,0,2))*effort(rpe,'hypertrophy')*scale;
  return {effectiveSets,strengthStimulus,hypertrophyStimulus:effectiveSets*(.70+demand*.25),acuteFatigue,powerStimulus,enduranceStimulus,
   fatigueChannels:{local:acuteFatigue,mechanical:acuteFatigue*(timed?.55:strengthRep),metabolic:acuteFatigue*clamp(timed?sec/60:count/20,.1,1.5),coordination:acuteFatigue*ballistic},estimated:true};
 }
 return Object.freeze({curve,effort,anatomy,muscleDoseMap,setEffects});
});
