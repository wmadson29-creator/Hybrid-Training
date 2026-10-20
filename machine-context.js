/* Machine identity is a logging boundary, never a resistance conversion. */
(function(root,factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;
  if(root)root.HybridMachineContext=Object.freeze(api);
})(typeof globalThis!=='undefined'?globalThis:this,function(){
  'use strict';
  const own=(o,k)=>!!o&&Object.prototype.hasOwnProperty.call(o,k);
  const record=x=>!!x&&typeof x==='object'&&!Array.isArray(x);
  const text=(x,n)=>String(x??'').replace(/[\u0000-\u001f]/g,' ').trim().slice(0,n);
  function eligible(ex){return !!ex&&/^(Machine|Cable|Machine\/Cable)$/.test(ex.equipment)&&ex.load!=='bodyweight'}
  function plateMode(ex){
    if(!ex)return '';
    if(ex.name==='Trap-Bar Deadlift')return 'trapbar';
    if(/^Smith Machine /.test(ex.name))return 'guided_bar';
    if(!/plate-loaded/i.test(ex.name)&&ex.resistanceKind!=='plate-loaded'&&!['Iso-Lateral Chest Press','Iso-Lateral High Row','Chest-Supported T-Bar Row'].includes(ex.name))return '';
    if(ex.load==='per_side')return 'machine_per_side';
    if(ex.load==='single')return 'machine_single';
    if(['Plate-Loaded Ab Crunch Machine','Chest-Supported T-Bar Row','Plate-Loaded Seated Calf Raise'].includes(ex.name))return 'machine_one';
    return 'machine';
  }
  function normalize(value){
    if(!record(value)||(value.version!==undefined&&Number(value.version)!==1))return null;
    const exercise=text(value.exercise,240),location=text(value.location,120),id=text(value.id,80),label=text(value.label,80);
    if(!exercise||!location||!label||!/^[a-zA-Z0-9_-]+$/.test(id))return null;
    return {version:1,exercise,location,id,label};
  }
  function key(context){const c=normalize(context);return c?JSON.stringify([c.exercise,c.location,c.id]):''}
  function registry(profile,exercise){const r=profile?.machineStations;return own(r,exercise)&&record(r[exercise])?r[exercise]:null}
  function choices(ex,location,profile){
    if(!eligible(ex))return [];
    const result=[{version:1,exercise:ex.name,location,id:'default',label:location==='Main Gym'?'Original / unspecified machine':'Default machine'}];
    const stations=registry(profile,ex.name)?.stations;
    if(record(stations))for(const [id,s] of Object.entries(stations)){
      const c=normalize({exercise:ex.name,location,id,label:s?.label});
      if(c&&id!=='default')result.push(c);
    }
    return result;
  }
  function current(ex,location,profile){const list=choices(ex,location,profile);return list.find(c=>c.id===registry(profile,ex?.name)?.activeId)||list[0]||null}
  function matches(row,context){
    const c=normalize(context);if(!c)return true;
    if(row?.exercise!==c.exercise)return false;
    if(row.machineContext!==undefined&&row.machineContext!==null)return key(row.machineContext)===key(c);
    // Compatibility bucket only. No old row is assigned a new physical identity.
    return c.location==='Main Gym'&&c.id==='default';
  }
  function select(ex,location,profile,id){
    const c=choices(ex,location,profile).find(x=>x.id===id);if(!c)throw Error('Choose a saved machine.');
    profile.machineStations=profile.machineStations||{};
    const r=registry(profile,ex.name)||{stations:{}};r.activeId=id;profile.machineStations[ex.name]=r;return c;
  }
  function create(ex,location,profile,label,id){
    label=text(label,80);if(!label)throw Error('Enter a machine name.');
    if(choices(ex,location,profile).some(c=>c.label.toLowerCase()===label.toLowerCase()))throw Error('That machine name already exists for this exercise.');
    const c=normalize({exercise:ex.name,location,id,label});if(!c||id==='default')throw Error('Invalid machine identity.');
    profile.machineStations=profile.machineStations||{};
    const r=registry(profile,ex.name)||{stations:{}};r.stations=r.stations||{};
    if(own(r.stations,id))throw Error('That machine identity already exists.');
    r.stations[id]={label};profile.machineStations[ex.name]=r;return select(ex,location,profile,id);
  }
  function loads(profile,exercise,context){
    const c=normalize(context);
    if(c&&c.id!=='default')return registry(profile,exercise)?.stations?.[c.id]?.loads||null;
    return own(profile?.exerciseLoads,exercise)?profile.exerciseLoads[exercise]:null;
  }
  function saveLoads(profile,exercise,context,value){
    const c=normalize(context);
    if(c&&c.id!=='default'){
      const station=registry(profile,exercise)?.stations?.[c.id];if(!station)throw Error('This machine is no longer configured.');
      if(value)station.loads=value;else delete station.loads;
    }else{
      profile.exerciseLoads=profile.exerciseLoads||{};
      if(value)profile.exerciseLoads[exercise]=value;else delete profile.exerciseLoads[exercise];
    }
  }
  return {eligible,plateMode,normalize,key,choices,current,matches,select,create,loads,saveLoads};
});
