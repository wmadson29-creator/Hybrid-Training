(function(root,factory){const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;if(root)root.HybridWorkoutPreferences=Object.freeze(api)})(typeof window!=='undefined'?window:globalThis,function(){
 'use strict';
 const month=(n,f)=>Number.isInteger(Number(n))&&Number(n)>=1&&Number(n)<=12?Number(n):f;
 function swimming(date,settings={}){
  const start=month(settings.swimSeasonStart,10),end=month(settings.swimSeasonEnd,3),m=Number(String(date).slice(5,7)),strength=['moderate','strong','pause'].includes(settings.swimSeasonStrength)?settings.swimSeasonStrength:'strong',active=settings.swimSeasonEnabled!==false&&m>=1&&m<=12&&(start<=end?m>=start&&m<=end:m>=start||m<=end);
  let hash=2166136261;for(const c of String(date)+'|seasonal-swimming')hash=Math.imul(hash^c.charCodeAt(0),16777619);const occasional=strength==='pause'?false:strength==='moderate'?(hash>>>0)%2===0:(hash>>>0)%5===0;
  return {active,start,end,strength,allowAutomatic:!active||occasional,penalty:!active?0:strength==='pause'?-999:occasional?-12:-70,label:!active?'Normal swimming preference':strength==='pause'?'Automatic swimming paused for this season':'Swimming reduced for this season'};
 }
 return {version:219,swimming,gymMinimum:7};
});
