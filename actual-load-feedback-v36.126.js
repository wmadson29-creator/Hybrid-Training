/* Hybrid Training v36.148: actual-versus-planned feedback uses exercise effort, not overall experience; stable filename retained. */
(function(root,factory){
  'use strict';
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridActualLoadFeedback=Object.freeze(api);
})(typeof window!=='undefined'?window:globalThis,function(){
  'use strict';

  const clamp=(value,low,high)=>Math.max(low,Math.min(high,Number(value)||0));
  const number=value=>{
    const match=String(value??'').replace(/\b\d{1,3}(?:,\d{3})+(?:\.\d+)?\b/g,s=>s.replace(/,/g,'')).replace(/(\d),(\d)/g,'$1.$2').match(/-?\d+(?:\.\d+)?/);
    return match?Number(match[0]):0;
  };
  const averageNumbers=value=>{
    const text=String(value??'');if(/^\s*-/.test(text))return 0;const clock=text.trim().match(/^(\d+):(\d{2})(?:\s*(?:\/|per|each)\s*(?:side|leg|arm))?$/i);
    if(clock)return Number(clock[1])*60+Number(clock[2]);
    const values=(text.match(/\d+(?:\.\d+)?/g)||[]).map(Number).filter(Number.isFinite);
    if(!values.length)return 0;
    return (values.length>1?(values[0]+values[1])/2:values[0])*(/\bmin(?:ute)?s?\b/i.test(text)?60:1);
  };
  function loadUnit(value,fallback){const text=String(value??''),first=text.match(/-?\d[\d,.]*/);if(!first)return fallback;const suffix=text.slice(first.index+first[0].length).trimStart(),prefix=text.slice(0,first.index).trim();return /^(?:kg\b|kilogram)/i.test(suffix)||/\b(?:kg|kilograms?)$/i.test(prefix)?'kg':/^(?:lbs?\b|pound)/i.test(suffix)||/\b(?:lbs?|pounds?)$/i.test(prefix)?'lb':fallback}
  const loadPounds=(value,defaultUnit='lb')=>number(value)*(loadUnit(value,defaultUnit)==='kg'?2.2046226218:1);
  const loadKilograms=(value,defaultUnit='kg')=>number(value)*(loadUnit(value,defaultUnit)==='lb'?.45359237:1);
  const nonWorking=row=>row?.warmup===true||row?.isWarmup===true||/^(?:skipped|missed)$/i.test(String(row?.status||''));
  const explicitZero=value=>String(value??'').trim()!==''&&Number.isFinite(Number(value))&&Number(value)===0;
  function workingSetDetails(row){
    return Array.isArray(row?.setDetails)?row.setDetails.filter(set=>set&&!nonWorking(set)&&!(String(set.reps??row.reps??'').trim()&&averageNumbers(set.reps??row.reps)<=0)&&(averageNumbers(set.reps??row.reps)>0||number(set.weight)>0||number(set.rpe)>0||number(set.completedAt)>0)).map(set=>({...set,weight:String(set.weight??'').trim()?set.weight:row.weight})):[];
  }
  function noPerformedWork(row){
    if(nonWorking(row))return true;
    if(isCardioRow(row)){
      const m=metrics(row),structure=decisionApi?.normalizeWorkoutStructure?.(m.workoutStructure);
      if(structure?.tracking&&decisionApi.performedStructureEntries(structure).length===0)return true;
      if(!structure?.tracking&&Array.isArray(m.components)&&m.components.length&&m.components.every(c=>nonWorking(c)||explicitZero(c?.actualDose)))return true;
      const knownZero=explicitZero(m.time)||explicitZero(m.duration)||explicitZero(row?.effectiveDurationMinutes)||explicitZero(row?.trackedSessionDurationMinutes)||explicitZero(row?.sessionDurationMinutes);
      return knownZero&&actualMinutes(row)===0&&!structuredActualDoseExists(row)&&!(number(m.distance)>0||number(m.intervals)>0||number(m.poolLengths)>0);
    }
    if(Array.isArray(row?.setDetails)&&row.setDetails.length)return workingSetDetails(row).length===0;
    return explicitZero(row?.sets)||(String(row?.reps??'').trim()!==''&&averageNumbers(row.reps)===0);
  }
  const lower=value=>String(value??'').trim().toLowerCase();
  const status=row=>lower(row?.status||'complete');
  const metrics=row=>(row?.metrics&&typeof row.metrics==='object')?row.metrics:{};
  let decisionApi=typeof globalThis!=='undefined'?globalThis.HybridDecisionIntegrity:null;
  if(!decisionApi&&typeof require==='function'){try{decisionApi=require('./decision-integrity-v36.131.js')}catch(_error){}}

  function effortBand(value){
    const feel=lower(value).replace(/_/g,' ');
    if(feel==='too easy'||feel==='very easy')return 3.5;
    if(feel==='easy')return 5;
    if(feel==='comfortable'||feel==='good')return 6.5;
    if(feel==='challenging'||feel==='hard but good')return 8;
    if(feel==='very hard'||feel==='grindy')return 9.25;
    if(feel==='max / failed'||feel==='max/failed'||feel==='bad')return 10;
    return 0;
  }
  // One input hierarchy for summaries, individual sets, scheduling and recovery.
  // RIR is a controlled-repetition cue; it is not a velocity-quality measurement.
  function rirEligible(row){
    return !isCardioRow(row)&&row?.ballistic!==true&&!/swing|snatch|high[ -]pull|\bclean\b|carry|turkish|get.up|jump|sprint|push[ -]press|jerk|thruster|pogo|\bhop\b|\bbound|\bthrow|plyo|clap|explosive|ballistic/i.test(String(row?.exercise||''))&&!/sec|min|hold|^\s*\d+:\d{2}/i.test(String(row?.reps||''));
  }
  function rirRpe(row){
    const rir=String(row?.rir??'').trim();
    return rirEligible(row)&&/^(?:[0-4]|5\+)$/.test(rir)?rir==='5+'?Math.min(5,effortBand(row?.feel)||5):10-Number(rir):0;
  }
  function effortRpe(row){
    if(Number.isFinite(row?.effectiveRpe))return clamp(row.effectiveRpe,0,10);
    const raw=Number(row?.rpe),exact=Number.isFinite(raw)&&raw>=1&&raw<=10?raw:0,band=effortBand(row?.feel),confidence=lower(row?.rpeConfidence);
    if(exact&&confidence==='confident')return exact;
    const rir=rirRpe(row);if(rir)return rir;
    if(exact&&band&&(confidence==='rough'||!confidence))return Math.round((exact*.35+band*.65)*20)/20;
    return exact||band;
  }
  function setEffortRpe(row,set,fallback=effortRpe){
    const context={...set,exercise:row?.exercise,reps:set?.reps??row?.reps,modelConditioning:isCardioRow(row),effectiveRpe:undefined};
    // A set's own rating stays independent of a summary of a different set.
    // The broad parent label only refines the open-ended 5+ RIR bucket.
    if(String(context.rir??'').trim()==='5+'&&!context.feel)context.feel=row?.feel;
    const own=effortRpe(context);if(own)return own;
    if(Number.isFinite(set?.effectiveRpe))return clamp(set.effectiveRpe,0,10);
    return Number(fallback(row))||0;
  }
  function workingEffortRpe(row,fallback=effortRpe){
    if(noPerformedWork(row))return 0;
    const sets=workingSetDetails(row);
    return sets.length?Math.max(0,...sets.map(set=>setEffortRpe(row,set,fallback))):effortRpe(row)||Number(fallback(row))||0;
  }

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
    if(session==='barbell strength'||session==='generic gym'||session==='home gym'||session==='calisthenics'||session==='strength-endurance'||session==='emom'||session.startsWith('kb '))return false;
    if(session==='amrap'||type==='amrap'||m.amrap)return true;
    if(['conditioning','active recovery','class / activity'].includes(session)||Number(m.time)>0||Number(m.duration)>0||Number(row?.modelPlannedDurationMinutes)>0)return true;
    return /(?:\brun(?:ning)?\b|\bwalk(?:ing)?\b|swim|bike|cycle|cycling|rowing|rower|\berg\b|ruck|sprint|hill|stair|elliptical|cardio|aerobic|\blss\b)/i.test(String(row?.exercise||''));
  }

  function structuredActualDoseExists(row){
    const m=metrics(row);
    const structure=decisionApi?.normalizeWorkoutStructure?.(m.workoutStructure);
    if(structure?.tracking)return decisionApi.performedStructureEntries(structure).length>0;
    return (Array.isArray(m.components)&&m.components.some(c=>!nonWorking(c)&&!explicitZero(c?.actualDose)&&(String(c?.actual||c?.planned||'').trim()||number(c?.actualDose)>0)))||
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
    const structure=decisionApi?.normalizeWorkoutStructure?.(m.workoutStructure);
    if(structure?.tracking){const entries=decisionApi.performedStructureEntries(structure),seconds=entries.reduce((sum,e)=>sum+(Number(e.durationSeconds)||(['sec','min'].includes(e.unit)?Number(e.dose)*(e.unit==='min'?60:1):0)),0);if(seconds>0)return seconds/60}
    const fallback=Number(row?.effectiveDurationMinutes)||Number(row?.trackedSessionDurationMinutes)||Number(row?.sessionDurationMinutes)||0;
    return fallback>0?fallback:0;
  }

  function plannedMinutes(row){
    const direct=Number(row?.modelPlannedDurationMinutes)||0;
    if(direct>0)return direct;
    return parsePlannedMinutes(row?.modelPlannedTarget)||parsePlannedMinutes(row?.modelPlannedReps);
  }

  function validSetDetails(row){
    return workingSetDetails(row);
  }

  function actualSets(row){
    if(noPerformedWork(row))return 0;
    const details=validSetDetails(row);
    return Array.isArray(row?.setDetails)&&row.setDetails.length?details.length:Math.max(0,number(row?.sets));
  }

  function actualReps(row){
    if(noPerformedWork(row))return 0;
    const details=validSetDetails(row),values=details.map(set=>averageNumbers(set.reps)).filter(value=>value>0);
    return values.length?values.reduce((sum,value)=>sum+value,0)/values.length:averageNumbers(row?.reps);
  }

  function plannedStrengthExists(row){
    return number(row?.modelPlannedSets)>0||averageNumbers(row?.modelPlannedReps)>0||number(row?.modelPlannedWeight)>0;
  }

  function actualStrengthExists(row){
    if(noPerformedWork(row))return false;
    return actualSets(row)>0||actualReps(row)>0||number(row?.weight)>0;
  }

  function comparableExercise(row){
    const planned=String(row?.modelPlannedExercise||'').trim(),actual=String(row?.exercise||'').trim();
    return !planned||!actual||planned===actual;
  }

  function explicitActualDose(row){
    if(isCardioRow(row))return actualMinutes(row)>0||structuredActualDoseExists(row);
    if(noPerformedWork(row))return plannedStrengthExists(row);
    if(validSetDetails(row).length)return true;
    if(!plannedStrengthExists(row))return actualStrengthExists(row);
    const setChanged=number(row?.sets)>0&&number(row?.sets)!==number(row?.modelPlannedSets),
      repChanged=actualReps(row)>0&&Math.abs(actualReps(row)-averageNumbers(row?.modelPlannedReps))>.01,
      loadChanged=loadPounds(row?.weight,row?.loadUnit)>0&&Math.abs(loadPounds(row?.weight,row?.loadUnit)-loadPounds(row?.modelPlannedWeight,row?.loadUnit))>.01;
    return setChanged||repChanged||loadChanged;
  }

  function completionFactor(row){
    const value=status(row);
    if(noPerformedWork(row))return 0;
    if(value==='partial')return explicitActualDose(row)?1:.62;
    return 1;
  }

  function predictionUnestimated(row){
    if(row?.modelPredictionScope==='structured-actual-unestimated'||row?.metrics?.amrap)return true;
    if(!isCardioRow(row))return false;
    const m=metrics(row),components=Array.isArray(m.components)?m.components:[];
    if(!m.workoutStructure&&!components.length)return false;
    const structure=decisionApi?.structureDoseProfile?.(m.workoutStructure,row?.modelPlannedStructure,components,Number(m.time)||Number(m.duration)||null);
    if(structure?.tracking)return !structure.complete||structure.substituted||structure.capUnverified||Number.isFinite(structure.ratio)&&Math.abs(structure.ratio-1)>.001;
    const dose=decisionApi?.componentDoseProfile?.(components,row?.modelPlannedComponents);
    return !!(dose?.substituted||dose?.skipped||Number.isFinite(dose?.ratio)&&Math.abs(dose.ratio-1)>.001);
  }

  function responseQuality(row){
    const m=metrics(row),rpe=workingEffortRpe(row),plannedRpe=predictionUnestimated(row)?0:Number(row?.modelPlannedExpectedRpe)||Number(row?.modelExpectedRpe)||0,feel=lower(row?.feel),technique=lower(row?.technique),pain=lower(row?.painLevel),decoupling=Number(m.decouplingPct),state=status(row),
      unexpectedlyVeryHard=feel==='very hard'&&plannedRpe>0&&plannedRpe<=7.25&&rpe-plannedRpe>=1.75,
      costly=state==='missed'||rpe>=9.5||validSetDetails(row).some(set=>Number(set.rpe)>=9.5)||unexpectedlyVeryHard||/(?:too hard|bad|grindy|failed|maximal)/.test(feel)||technique==='sloppy'||/(?:moderate|sharp|stop)/.test(pain)||(Number.isFinite(decoupling)&&decoupling>=10),
      positiveFeel=/(?:too easy|easy|comfortable|challenging|good|hard but good)/.test(feel),
      tolerated=state==='complete'&&!costly&&((rpe>0&&rpe<=8.5)||positiveFeel);
    return costly?'costly':tolerated?'tolerated':'uncertain';
  }

  function rowRole(row){
    if(row?.isFullSecondary||lower(row?.secondarySessionRole)==='full'||row?.fullSecondSession||row?.weekendSecondMain||row?.kbSecondMain)return 'full-secondary';
    if(row?.adaptiveSecondaryBlock||row?.isShortSecondary||lower(row?.secondarySessionRole)==='short')return 'short-secondary';
    return 'primary';
  }

  function strengthDoseRatio(row){
    if(!plannedStrengthExists(row)||!comparableExercise(row))return null;
    if(noPerformedWork(row))return 0;
    if(!actualStrengthExists(row))return null;
    const setsA=actualSets(row),setsP=Math.max(0,number(row?.modelPlannedSets));
    if(!(setsA>0&&setsP>0))return null;
    const repsA=actualReps(row),repsP=averageNumbers(row?.modelPlannedReps),loadA=loadPounds(row?.weight,row?.loadUnit),loadP=loadPounds(row?.modelPlannedWeight,row?.loadUnit),assist=/(?:assisted|assistance)/i.test(String(row?.exercise||''));
    const repFactor=reps=>reps>0&&repsP>0?Math.pow(clamp(reps/repsP,.35,2.5),.45):1;
    const loadFactor=load=>{
      const ratio=assist?(load===0&&loadP===0?1:Math.max(1,loadP)/Math.max(1,load)):load>0&&loadP>0?load/loadP:1;
      return Math.pow(clamp(ratio,.35,2.5),.35);
    };
    const details=validSetDetails(row);
    let ratio=details.length?details.reduce((sum,set)=>sum+repFactor(averageNumbers(set.reps??row.reps))*loadFactor(loadPounds(set.weight??row.weight,row?.loadUnit)),0)/setsP:setsA/setsP*repFactor(repsA)*loadFactor(loadA);
    if(status(row)==='partial'&&!explicitActualDose(row))ratio*=.62;
    return clamp(ratio,.05,3);
  }

  function rowProfile(row){
    const cardio=isCardioRow(row),none=noPerformedWork(row),actual=none?0:cardio?actualMinutes(row):actualSets(row),planned=cardio?plannedMinutes(row):Math.max(0,number(row?.modelPlannedSets)),comparable=comparableExercise(row);
    const structureDose=cardio&&decisionApi?.structureDoseProfile?decisionApi.structureDoseProfile(metrics(row).workoutStructure,row?.modelPlannedStructure,metrics(row).components,Number(metrics(row).time)||Number(metrics(row).duration)||null):null,
      componentDose=cardio&&decisionApi?.componentDoseProfile?decisionApi.componentDoseProfile(metrics(row).components,row?.modelPlannedComponents):null;
    let ratio=null;
    if(none&&planned>0&&comparable)ratio=0;
    else if(structureDose?.tracking&&comparable)ratio=structureDose.substituted?null:structureDose.ratio;
    else if(!structureDose?.tracking&&(componentDose?.substituted||componentDose?.skipped))ratio=null;
    else if(cardio&&actual>0&&planned>0&&comparable)ratio=clamp(actual/planned,.05,3);
    else if(cardio&&Number.isFinite(componentDose?.ratio)&&comparable)ratio=clamp(componentDose.ratio,.05,3);
    else if(!cardio)ratio=strengthDoseRatio(row);
    const structuredActual=cardio&&structuredActualDoseExists(row),structuredPlanned=cardio&&plannedStructureExists(row),
      plannedExists=cardio?(planned>0||structuredPlanned):plannedStrengthExists(row),actualExists=cardio?(actual>0||structuredActual):actualStrengthExists(row);
    let relation='insufficient';
    if(actualExists&&!plannedExists)relation='unplanned';
    else if(actualExists&&plannedExists&&(!comparable||structureDose?.substituted||!structureDose?.tracking&&componentDose?.substituted))relation='substituted';
    else if(ratio!==null)relation=ratio<.82?'under':ratio>1.18?'over':'as-planned';
    else if(actualExists&&plannedExists)relation='planned-unquantified';
    return {
      version:4,role:rowRole(row),cardio,actual,planned,ratio:ratio===null?null:Math.round(ratio*1000)/1000,
      relation,response:responseQuality(row),explicitActual:explicitActualDose(row),comparable,
      structuredActual,structuredPlanned,componentDose,structureDose,actualDoseUnits:actual,plannedDoseUnits:planned
    };
  }

  function sessionProfile(rows){
    const usable=(Array.isArray(rows)?rows:[]).filter(row=>!noPerformedWork(row)),profiles=usable.map(rowProfile),comparable=profiles.filter(profile=>Number.isFinite(profile.ratio));
    const ratio=comparable.length?comparable.reduce((sum,profile)=>sum+profile.ratio,0)/comparable.length:null,
      cardioMinutes=profiles.filter(profile=>profile.cardio).reduce((sum,profile)=>sum+profile.actual,0),
      strengthSets=profiles.filter(profile=>!profile.cardio).reduce((sum,profile)=>sum+profile.actual,0),
      cardioWeight=cardioMinutes/45,strengthWeight=strengthSets/15,
      mixedWeight=Math.max(cardioWeight,strengthWeight)+Math.min(cardioWeight,strengthWeight)*.35,
      rpes=usable.map(row=>workingEffortRpe(row)).filter(value=>value>0),avgRpe=rpes.length?rpes.reduce((sum,value)=>sum+value,0)/rpes.length:0,
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

  return {parsePlannedMinutes,isCardioRow,actualMinutes,plannedMinutes,structuredActualDoseExists,plannedStructureExists,explicitActualDose,completionFactor,effortBand,rirEligible,rirRpe,effortRpe,setEffortRpe,workingEffortRpe,responseQuality,rowRole,rowProfile,sessionProfile,loadPounds,loadKilograms,repQuantity:averageNumbers,workingSetDetails,noPerformedWork,predictionUnestimated};
});
