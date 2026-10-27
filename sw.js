const BUILD="36.217";
const CACHE="hybrid-training-v36-217-workout-workflows";
const FALLBACK="./index.html?v=36.217";
const PERSONALIZATION="./adaptive-personalization-v36.120.js?v=36.217";
const REQUIRED_PRECACHE=[
  FALLBACK,
  "./weight-units.js?v=36.217",
  "./training-profile.js?v=36.217",
  "./reactive-schedule.js?v=36.217",
  "./personal-recommendations.js?v=36.217",
  "./personal-training.js?v=36.217",
  "./profile-week-editor.js?v=36.217",
  "./profile-setup.js?v=36.217",
  "./profile-equipment.js?v=36.217",
  "./equipment-views.js?v=36.217",
  "./app-language.js?v=36.217",
  "./locales-pl.js?v=36.217",

  "./manifest-v36.webmanifest?v=36.217",
  "./decision-integrity-v36.131.js?v=36.217",
  "./actual-load-feedback-v36.126.js?v=36.217",
  "./forecast-balance-v36.127.js?v=36.217",
  "./machine-context.js?v=36.217",
  "./exercise-expansion-v36.128.js?v=36.217",
  "./app-shell-v36.119.css?v=36.217",
  "./app-shell-v36.119.js?v=36.217",
  "./stretching-flexibility-v36.119.js?v=36.217",
  "./ui-workflows.js?v=36.217",
  "./kb-load-layout.js?v=36.217",
  "./kettlebell-programs.js?v=36.217",
  "./kb-weekly-circuit.js?v=36.217",
  "./kb-refinement.js?v=36.217",
  "./performed-training.js?v=36.217",
  "./barbell-plate-layout.js?v=36.217",
  "./kb-internal-stack.js?v=36.217",
  "./emom-templates.js?v=36.217",
  "./training-effects.js?v=36.217",
  "./session-fatigue.js?v=36.217",
  "./workout-optimizer.js?v=36.217",
  PERSONALIZATION
];
const OPTIONAL_PRECACHE=[
  "./hybrid-training-v34-64.png",
  "./hybrid-training-v34-180.png",
  "./hybrid-training-v34-192.png",
  "./hybrid-training-v34-512.png",
  "./hybrid-training-v34-512-maskable.png"
];
self.addEventListener("install",event=>{
  event.waitUntil(caches.open(CACHE).then(async cache=>{
    await cache.addAll(REQUIRED_PRECACHE);
    await Promise.all(OPTIONAL_PRECACHE.map(url=>cache.add(url).catch(()=>null)));
  }).then(()=>self.skipWaiting()));
});
self.addEventListener("activate",event=>{
  event.waitUntil(caches.keys()
    .then(keys=>Promise.all(keys.filter(k=>k.startsWith("hybrid-training-")&&k!==CACHE).map(k=>caches.delete(k))))
    .then(()=>self.clients.claim()));
});
async function fetchAndCache(cache,url,requestOptions={}){
  const response=await fetch(url,requestOptions);
  if(response&&response.ok)await cache.put(FALLBACK,response.clone());
  return response;
}
self.addEventListener("fetch",event=>{
  if(event.request.method!=="GET")return;
  const url=new URL(event.request.url);
  if(url.pathname.endsWith("/version.json")){
    event.respondWith(fetch(event.request,{cache:"no-store"}).catch(()=>caches.match(event.request)));
    return;
  }
  if(event.request.mode==="navigate"){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE),cached=await cache.match(FALLBACK);
      if(cached){
        event.waitUntil(fetchAndCache(cache,"./index.html?v="+BUILD,{cache:"no-store"}).catch(()=>null));
        return cached.clone();
      }
      try{return await fetchAndCache(cache,"./index.html?v="+BUILD,{cache:"no-store"})}
      catch(_e){return cached?cached.clone():Response.error()}
    })());
    return;
  }
  event.respondWith((async()=>{
    const cache=await caches.open(CACHE),cached=await cache.match(event.request);
    if(cached){
      event.waitUntil(fetch(event.request,{cache:"no-store"}).then(r=>{if(r&&r.ok)return cache.put(event.request,r.clone())}).catch(()=>null));
      return cached;
    }
    try{
      const response=await fetch(event.request,{cache:"no-store"});
      if(response&&response.ok)event.waitUntil(cache.put(event.request,response.clone()));
      return response;
    }catch(_e){return cached||Response.error()}
  })());
});
self.addEventListener("message",event=>{if(event.data==="SKIP_WAITING")self.skipWaiting()});
