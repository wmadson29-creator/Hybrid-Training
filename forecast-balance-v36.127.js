(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridForecastBalance=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const finite=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;

  function speedSpacingDays(goalProfile='automatic',shortSpeedFocus=false){
    if(shortSpeedFocus)return 0;
    if(goalProfile==='conditioning')return 3;
    if(goalProfile==='running')return 4;
    return 4;
  }

  function hardQualityClass(name=''){
    const value=String(name).toLowerCase();
    if(!value)return '';
    if(/sprint|short hills|standard issue hills|apex hills|hill repeat|600 meter|speed-endurance|oxygen debt|indoor power|resets|anaerobic|hiit|warrior run|fast 5|tempo|threshold|time trial|kinetic conditioning/.test(value))return 'hard';
    if(/lss|easy|zone\s*2|z2|recovery|walk|steady/.test(value))return 'easy';
    return '';
  }

  function enduranceRunBoost(context={}){
    const days=Math.max(0,finite(context.daysSinceEnduranceRun,0)),longNeed=finite(context.longRunNeed,0);
    let boost=Math.max(0,longNeed)*.38;
    if(days>=6)boost+=Math.min(5,1.5+(days-6)*.7);
    return Math.round(Math.min(7,boost)*10)/10;
  }

  function rebalanceConditioningNeeds(needs,lastQualityDays,minSpacingDays,context={}){
    const out={
      run:finite(needs?.run,-999),
      speed:finite(needs?.speed,-999),
      swim:finite(needs?.swim,-999),
      cardio:finite(needs?.cardio,-999)
    };
    const last=finite(lastQualityDays,9999),spacing=Math.max(0,finite(minSpacingDays,6));
    const runBoost=enduranceRunBoost(context);out.run+=runBoost;
    const recentHardCount=Math.max(0,finite(context.recentHardCount,0)),enduranceDue=runBoost>=2||context.enduranceDue===true,
      stackSupported=context.allowHardStack===true&&!context.recoveryGuard&&!context.lowerBodyConcern&&!context.nextAnchorConflict&&recentHardCount<2;
    let speedLimited=false,hardStackAllowed=false;
    if(spacing>0&&last<spacing){
      const aerobicBest=Math.max(out.run,out.swim,out.cardio);
      const daysRemaining=spacing-last;
      const clearSpeedLead=out.speed-aerobicBest>=5;
      if(stackSupported&&last<=1&&clearSpeedLead&&!enduranceDue){
        out.speed-=1.25;hardStackAllowed=true;
      }else{
        out.speed=Math.min(out.speed,aerobicBest-1.25-Math.min(4,daysRemaining*.8));speedLimited=true;
      }
    }
    const priority={run:0,swim:1,cardio:2,speed:3};
    const lane=Object.keys(out).sort((a,b)=>out[b]-out[a]||priority[a]-priority[b])[0]||'run';
    return {needs:out,lane,speedLimited,hardStackAllowed,enduranceRunBoost:runBoost,enduranceDue,lastQualityDays:last,minSpacingDays:spacing};
  }

  function shouldPrioritizeFlexibleStrength(input={}){
    if(input.recoveryGuard||input.explicitConditioningPriority||input.manualSelection)return false;
    const conditioning=Math.max(0,finite(input.conditioningPrimaries,0));
    const strength=Math.max(0,finite(input.flexibleStrengthPrimaries,0));
    return conditioning>=2&&strength===0;
  }

  return Object.freeze({
    version:2,
    speedSpacingDays,
    hardQualityClass,
    enduranceRunBoost,
    rebalanceConditioningNeeds,
    shouldPrioritizeFlexibleStrength
  });
});
