(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridForecastBalance=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';

  const finite=(value,fallback=0)=>Number.isFinite(Number(value))?Number(value):fallback;

  function speedSpacingDays(goalProfile='automatic',shortSpeedFocus=false){
    if(shortSpeedFocus)return 0;
    if(goalProfile==='conditioning')return 4;
    if(goalProfile==='running')return 5;
    return 6;
  }

  function rebalanceConditioningNeeds(needs,lastQualityDays,minSpacingDays){
    const out={
      run:finite(needs?.run,-999),
      speed:finite(needs?.speed,-999),
      swim:finite(needs?.swim,-999),
      cardio:finite(needs?.cardio,-999)
    };
    const last=finite(lastQualityDays,9999),spacing=Math.max(0,finite(minSpacingDays,6));
    let speedLimited=false;
    if(spacing>0&&last<spacing){
      const aerobicBest=Math.max(out.run,out.swim,out.cardio);
      const daysRemaining=spacing-last;
      out.speed=Math.min(out.speed,aerobicBest-4-daysRemaining*1.5);
      speedLimited=true;
    }
    const priority={run:0,swim:1,cardio:2,speed:3};
    const lane=Object.keys(out).sort((a,b)=>out[b]-out[a]||priority[a]-priority[b])[0]||'run';
    return {needs:out,lane,speedLimited,lastQualityDays:last,minSpacingDays:spacing};
  }

  function shouldPrioritizeFlexibleStrength(input={}){
    if(input.recoveryGuard||input.explicitConditioningPriority||input.manualSelection)return false;
    const conditioning=Math.max(0,finite(input.conditioningPrimaries,0));
    const strength=Math.max(0,finite(input.flexibleStrengthPrimaries,0));
    return conditioning>=2&&strength===0;
  }

  return Object.freeze({
    version:1,
    speedSpacingDays,
    rebalanceConditioningNeeds,
    shouldPrioritizeFlexibleStrength
  });
});
