const BUILD="36.226";
const CACHE="hybrid-training-v36-226-workout-workflows";
const FALLBACK="./index.html?v=36.226";
const PERSONALIZATION="./adaptive-personalization-v36.120.js?v=36.226";
const REQUIRED_PRECACHE=[
  "./weight-entry.js?v=36.226",
  "./training-core.js?v=36.226",
  "./training-injuries.js?v=36.226",
  "./training-forecast-worker.js?v=36.226",
  "./training-rotation.js?v=36.226",
  "./training-modern.css?v=36.226",
  "./training-experience.js?v=36.226",
  "./session-feedback.js?v=36.226",
  "./workout-preferences.js?v=36.226",
  "./muscle-model.js?v=36.226",
  "./kb-programming.js?v=36.226",
  FALLBACK,
  "./weight-units.js?v=36.226",
  "./training-profile.js?v=36.226",
  "./reactive-schedule.js?v=36.226",
  "./personal-recommendations.js?v=36.226",
  "./personal-training.js?v=36.226",
  "./profile-week-editor.js?v=36.226",
  "./profile-setup.js?v=36.226",
  "./profile-equipment.js?v=36.226",
  "./equipment-views.js?v=36.226",
  "./app-language.js?v=36.226",
  "./locales-pl.js?v=36.226",

  "./manifest-v36.webmanifest?v=36.226",
  "./decision-integrity-v36.131.js?v=36.226",
  "./actual-load-feedback-v36.126.js?v=36.226",
  "./forecast-balance-v36.127.js?v=36.226",
  "./machine-context.js?v=36.226",
  "./exercise-expansion-v36.128.js?v=36.226",
  "./app-shell-v36.119.css?v=36.226",
  "./app-shell-v36.119.js?v=36.226",
  "./stretching-flexibility-v36.119.js?v=36.226",
  "./ui-workflows.js?v=36.226",
  "./kb-load-layout.js?v=36.226",
  "./kettlebell-programs.js?v=36.226",
  "./kb-weekly-circuit.js?v=36.226",
  "./kb-refinement.js?v=36.226",
  "./performed-training.js?v=36.226",
  "./barbell-plate-layout.js?v=36.226",
  "./kb-internal-stack.js?v=36.226",
  "./emom-templates.js?v=36.226",
  "./training-effects.js?v=36.226",
  "./session-fatigue.js?v=36.226",
  "./workout-optimizer.js?v=36.226",
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
  if(event.request.mode==="navigate"&&!url.pathname.endsWith("/")&&!url.pathname.endsWith("/index.html"))return;
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
