/* Hybrid Training v36.131: actual-versus-planned load feedback; stable filename retained. */
(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridActualLoadFeedback=Object.freeze(api);
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';

  const clamp=(value,low,high)=>Math.max(low,Math.min(high,Number(value)||0));
  const number=value=>{
    const match=String(value??'').replace(/,/g,'').match(/-?\d+(?:\.\d+)?/);
    return match?Number(match[0]):0;
  };
  const averageNumbers=value=>{
    const values=(String(value??'').match(/\d+(?:\.\d+)?/g)||[]).map(Number).filter(Number.isFinite);
    if(!values.length)return 0;
    return values.length>1?(values[0]+values[1])/2:values[0];
  };
  const lower=value=>String(value??'').trim().toLowerCase();
  const status=row=>lower(row?.status||'complete');
  const metrics=row=>(row?.metrics&&typeof row.metrics==='object')?row.metrics:{};
  let decisionApi=typeof globalThis!=='undefined'?globalThis.HybridDecisionIntegrity:null;
  if(!decisionApi&&typeof require==='function'){try{decisionApi=require('./decision-integrity-v36.131.js')}catch(_error){}}

  function parsePlannedMinutes(value){
    if(Number.isFinite(Number(value))&&Number(value)>0)return Number(value);
    const text=lower(value).replace(/[–—]/g,'-');
    if(!text)return 0;
    const clock=text.match(/\b(\d{1,2}):(\d{2})\b/);
    if(clock)return Number(clock[1])*60+Number(clock[2]);
    const hourRange=text.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\+?\s*(?:h|hr|hrs|hour|hours)\b/);
    if(hourRange)return (Number(hourRange[1])+Number(hourRange[2]))*30;
    const singleHour=text.match(/(\d+(?:\.\d+)?)\s*(?:h|hr|hrs|hour|hours)\b/);
    const minuteRange=text.match(/(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\+?\s*(?:m|min|mins|minute|minutes)\b/);
    if(minuteRange)return (Number(minuteRange[1])+Number(minuteRange[2]))/2+(singleHour?Number(singleHour[1])*60:0);
    const singleMinute=text.match(/(\d+(?:\.\d+)?)\+?\s*(?:m|min|mins|minute|minutes)\b/);
    if(singleHour||singleMinute)return (singleHour?Number(singleHour[1])*60:0)+(singleMinute?Number(singleMinute[1]):0);
    return 0;
  }

  function isCardioRow(row){
    if(typeof row?.modelConditioning==='boolean')return row.modelConditioning;
    const session=lower(row?.session),type=lower(row?.secondaryTrainingType),m=metrics(row);
    if(type==='conditioning')return true;
    // Legacy strength rows sometimes received a bogus planned "duration" parsed from
    // a bare rep target (for example 3 reps became 3 minutes). Session identity wins
    // over that old field unless the row explicitly declares itself conditioning.
    if(session==='barbell strength'||session==='generic gym'||session==='calisthenics'||session==='strength-endurance'||session.startsWith('kb '))return false;
    if(['conditioning','active recovery','class / activity'].includes(session)||Number(m.time)>0||Number(m.duration)>0||Number(row?.modelPlannedDurationMinutes)>0)return true;
    return /(?:\brun(?:ning)?\b|\bwalk(?:ing)?\b|swim|bike|cycle|cycling|rowing|rower|\berg\b|ruck|sprint|hill|stair|elliptical|cardio|aerobic|\blss\b)/i.test(String(row?.exercise||''));
  }

  function structuredActualDoseExists(row){
    const m=metrics(row);
    return (Array.isArray(m.components)&&m.components.some(c=>String(c?.actual||c?.planned||'').trim()||number(c?.actualDose)>0))||
      (Array.isArray(m.swimStrokeBlocks)&&m.swimStrokeBlocks.length>0)||number(m.intervals)>0;
  }

  function plannedStructureExists(row){
    if(Array.isArray(row?.modelPlannedComponents)&&row.modelPlannedComponents.length)return true;
    if(!structuredActualDoseExists(row))return false;
    return !!String(row?.modelPlannedExercise||row?.modelPlannedTarget||'').trim();
  }

  function actualMinutes(row){
    const m=metrics(row),direct=Number(m.time)||Number(m.duration)||0;
    if(direct>0)return direct;
    const fallback=Number(row?.effectiveDurationMinutes)||Number(row?.trackedSessionDurationMinutes)||Number(row?.sessionDurationMinutes)||0;
    return fallback>0?fallback:0;
  }

  function plannedMinutes(row){
    const direct=Number(row?.modelPlannedDurationMinutes)||0;
    if(direct>0)return direct;
    return parsePlannedMinutes(row?.modelPlannedTarget)||parsePlannedMinutes(row?.modelPlannedReps);
  }

  function validSetDetails(row){
    return Array.isArray(row?.setDetails)?row.setDetails.filter(set=>set&&(number(set.reps)>0||number(set.weight)>0||number(set.rpe)>0)):[];
  }

  function actualSets(row){
    const details=validSetDetails(row);
    return details.length||Math.max(0,number(row?.sets));
  }

  function actualReps(row){
    const details=validSetDetails(row),values=details.map(set=>averageNumbers(set.reps)).filter(value=>value>0);
    return values.length?values.reduce((sum,value)=>sum+value,0)/values.length:averageNumbers(row?.reps);
  }

  function plannedStrengthExists(row){
    return number(row?.modelPlannedSets)>0||averageNumbers(row?.modelPlannedReps)>0||number(row?.modelPlannedWeight)>0;
  }

  function actualStrengthExists(row){
    return actualSets(row)>0||actualReps(row)>0||number(row?.weight)>0;
  }

  function comparableExercise(row){
    const planned=String(row?.modelPlannedExercise||'').trim(),actual=String(row?.exercise||'').trim();
    return !planned||!actual||planned===actual;
  }

  function explicitActualDose(row){
    if(isCardioRow(row))return actualMinutes(row)>0||structuredActualDoseExists(row);
    if(validSetDetails(row).length)return true;
    if(!plannedStrengthExists(row))return actualStrengthExists(row);
    const setChanged=number(row?.sets)>0&&number(row?.sets)!==number(row?.modelPlannedSets),
      repChanged=actualReps(row)>0&&Math.abs(actualReps(row)-averageNumbers(row?.modelPlannedReps))>.01,
      loadChanged=number(row?.weight)>0&&Math.abs(number(row?.weight)-number(row?.modelPlannedWeight))>.01;
    return setChanged||repChanged||loadChanged;
  }

  function completionFactor(row){
    const value=status(row);
    if(value==='skipped')return 0;
    if(value==='missed')return .25;
    if(value==='partial')return explicitActualDose(row)?1:.62;
    return 1;
  }

  function responseQuality(row){
    const m=metrics(row),rpe=Number(row?.rpe)||0,feel=lower(row?.feel),technique=lower(row?.technique),sessionFeel=lower(row?.sessionFeel),pain=lower(row?.painLevel),decoupling=Number(m.decouplingPct),state=status(row),
      costly=state==='missed'||rpe>=9.5||/(?:too hard|bad|grindy|failed|maximal)/.test(feel)||technique==='sloppy'||sessionFeel==='very rough'||/(?:moderate|sharp|stop)/.test(pain)||(Number.isFinite(decoupling)&&decoupling>=10),
      positiveFeel=/(?:too easy|easy|comfortable|good|hard but good)/.test(feel),
      tolerated=state==='complete'&&!costly&&((rpe>0&&rpe<=8.5)||positiveFeel)&&(sessionFeel!=='rough');
    return costly?'costly':tolerated?'tolerated':'uncertain';
  }

  function rowRole(row){
    if(row?.isFullSecondary||lower(row?.secondarySessionRole)==='full'||row?.fullSecondSession||row?.weekendSecondMain||row?.kbSecondMain)return 'full-secondary';
    if(row?.adaptiveSecondaryBlock||row?.isShortSecondary||lower(row?.secondarySessionRole)==='short')return 'short-secondary';
    return 'primary';
  }

  function strengthDoseRatio(row){
    if(!plannedStrengthExists(row)||!actualStrengthExists(row)||!comparableExercise(row))return null;
    const setsA=actualSets(row),setsP=Math.max(0,number(row?.modelPlannedSets));
    if(!(setsA>0&&setsP>0))return null;
    const repsA=actualReps(row),repsP=averageNumbers(row?.modelPlannedReps),loadA=number(row?.weight),loadP=number(row?.modelPlannedWeight),assist=/(?:assisted|assistance)/i.test(String(row?.exercise||''));
    let ratio=setsA/setsP;
    if(repsA>0&&repsP>0)ratio*=Math.pow(clamp(repsA/repsP,.35,2.5),.45);
    if(loadA>0&&loadP>0){const loadRatio=assist?loadP/loadA:loadA/loadP;ratio*=Math.pow(clamp(loadRatio,.35,2.5),.35)}
    if(status(row)==='partial'&&!explicitActualDose(row))ratio*=.62;
    return clamp(ratio,.05,3);
  }

  function rowProfile(row){
    const cardio=isCardioRow(row),actual=cardio?actualMinutes(row):actualSets(row),planned=cardio?plannedMinutes(row):Math.max(0,number(row?.modelPlannedSets)),comparable=comparableExercise(row);
    const componentDose=cardio&&decisionApi?.componentDoseProfile?decisionApi.componentDoseProfile(metrics(row).components,row?.modelPlannedComponents):null;
    let ratio=null;
    if(cardio&&actual>0&&planned>0&&comparable)ratio=clamp(actual/planned,.05,3);
    else if(cardio&&Number.isFinite(componentDose?.ratio)&&comparable)ratio=clamp(componentDose.ratio,.05,3);
    else if(!cardio)ratio=strengthDoseRatio(row);
    const structuredActual=cardio&&structuredActualDoseExists(row),structuredPlanned=cardio&&plannedStructureExists(row),
      plannedExists=cardio?(planned>0||structuredPlanned):plannedStrengthExists(row),actualExists=cardio?(actual>0||structuredActual):actualStrengthExists(row);
    let relation='insufficient';
    if(actualExists&&!plannedExists)relation='unplanned';
    else if(actualExists&&plannedExists&&!comparable)relation='substituted';
    else if(ratio!==null)relation=ratio<.82?'under':ratio>1.18?'over':'as-planned';
    else if(actualExists&&plannedExists)relation='planned-unquantified';
    return {
      version:3,role:rowRole(row),cardio,actual,planned,ratio:ratio===null?null:Math.round(ratio*1000)/1000,
      relation,response:responseQuality(row),explicitActual:explicitActualDose(row),comparable,
      structuredActual,structuredPlanned,componentDose,actualDoseUnits:actual,plannedDoseUnits:planned
    };
  }

  function sessionProfile(rows){
    const usable=(Array.isArray(rows)?rows:[]).filter(row=>!['skipped','missed'].includes(status(row))),profiles=usable.map(rowProfile),comparable=profiles.filter(profile=>Number.isFinite(profile.ratio));
    const ratio=comparable.length?comparable.reduce((sum,profile)=>sum+profile.ratio,0)/comparable.length:null,
      cardioMinutes=profiles.filter(profile=>profile.cardio).reduce((sum,profile)=>sum+profile.actual,0),
      strengthSets=profiles.filter(profile=>!profile.cardio).reduce((sum,profile)=>sum+profile.actual,0),
      cardioWeight=cardioMinutes/45,strengthWeight=strengthSets/15,
      mixedWeight=Math.max(cardioWeight,strengthWeight)+Math.min(cardioWeight,strengthWeight)*.35,
      rpes=usable.map(row=>Number(row?.rpe)||0).filter(value=>value>0),avgRpe=rpes.length?rpes.reduce((sum,value)=>sum+value,0)/rpes.length:0,
      effortFactor=avgRpe>=9.5?1.22:avgRpe>=8.5?1.10:avgRpe>0&&avgRpe<=5.5?.78:avgRpe>0&&avgRpe<=6.5?.88:1,
      activeRecovery=usable.length>0&&usable.every(row=>lower(row?.session)==='active recovery'),
      shortOnly=profiles.length>0&&profiles.every(profile=>profile.role==='short-secondary'),
      doseWeight=clamp(mixedWeight*effortFactor*(activeRecovery?.5:1),profiles.length?.08:0,shortOnly?.75:2.25),
      response=profiles.some(profile=>profile.response==='costly')?'costly':profiles.some(profile=>profile.response==='tolerated')?'tolerated':'uncertain';
    let relation='insufficient';
    if(ratio!==null)relation=ratio<.82?'under':ratio>1.18?'over':'as-planned';
    else if(profiles.some(profile=>profile.relation==='unplanned'))relation='unplanned';
    else if(profiles.some(profile=>profile.relation==='planned-unquantified'))relation='planned-unquantified';
    return {version:3,rows:profiles.length,profiles,ratio:ratio===null?null:Math.round(ratio*1000)/1000,relation,response,cardioMinutes:Math.round(cardioMinutes*10)/10,strengthSets:Math.round(strengthSets*10)/10,doseWeight:Math.round(doseWeight*100)/100,avgRpe:Math.round(avgRpe*10)/10};
  }

  return {parsePlannedMinutes,isCardioRow,actualMinutes,plannedMinutes,structuredActualDoseExists,plannedStructureExists,explicitActualDose,completionFactor,responseQuality,rowRole,rowProfile,sessionProfile};
});
