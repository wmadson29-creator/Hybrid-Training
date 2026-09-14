const BUILD="36.114";
const CACHE="hybrid-training-v36-114";
const FALLBACK="./index.html?v=36.114";
const REQUIRED_PRECACHE=[
  FALLBACK,
  "./manifest-v36.webmanifest?v=36.114",
  "./app-shell-v36.114.css?v=36.114",
  "./app-shell-v36.114.js?v=36.114"
];
const OPTIONAL_PRECACHE=[
  "./hybrid-training-v34-64.png",
  "./hybrid-training-v34-180.png",
  "./hybrid-training-v34-192.png",
  "./hybrid-training-v34-512.png",
  "./hybrid-training-v34-512-maskable.png"
];

self.addEventListener("install",event=>{
  event.waitUntil(
    caches.open(CACHE)
      .then(async cache=>{
        // Fail closed for the app shell: a partial deployment must not take over and
        // delete the previous working cache. Icons are cosmetic and may fail independently.
        await cache.addAll(REQUIRED_PRECACHE);
        await Promise.all(OPTIONAL_PRECACHE.map(url=>cache.add(url).catch(()=>null)));
      })
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener("activate",event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith("hybrid-training-")&&k!==CACHE).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
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
      const cache=await caches.open(CACHE);
      const cached=await cache.match(FALLBACK);
      if(cached){
        event.waitUntil(fetchAndCache(cache,"./index.html?v="+BUILD,{cache:"no-store"}).catch(()=>null));
        return cached;
      }
      try{return await fetchAndCache(cache,"./index.html?v="+BUILD,{cache:"no-store"})}
      catch(_e){return cached||Response.error()}
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
