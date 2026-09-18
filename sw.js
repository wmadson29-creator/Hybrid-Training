const BUILD="36.124";
const CACHE="hybrid-training-v36-124-whole-athlete-swim1";
const FALLBACK="./index.html?v=36.124-whole-athlete-swim1";
const PATCH="./adaptive-personalization-v36.120.js?v=36.120";
const REQUIRED_PRECACHE=[
  FALLBACK,
  "./manifest-v36.webmanifest?v=36.124",
  "./app-shell-v36.119.css?v=36.119",
  "./app-shell-v36.119.js?v=36.119",
  "./stretching-flexibility-v36.119.js?v=36.119-sf1",
  PATCH
];
const OPTIONAL_PRECACHE=[
  "./hybrid-training-v34-64.png",
  "./hybrid-training-v34-180.png",
  "./hybrid-training-v34-192.png",
  "./hybrid-training-v34-512.png",
  "./hybrid-training-v34-512-maskable.png"
];
const PATCH_TAG='<script src="'+PATCH+'"></script>';
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
async function injectPersonalization(response){
  if(!response||!response.ok)return response;
  const type=response.headers.get("content-type")||"";
  if(!type.includes("text/html"))return response;
  const html=await response.text();
  if(html.includes("adaptive-personalization-v36.120.js"))return new Response(html,{status:response.status,statusText:response.statusText,headers:response.headers});
  const body=html.includes("</body>")?html.replace("</body>",PATCH_TAG+"</body>"):html+PATCH_TAG;
  const headers=new Headers(response.headers);headers.delete("content-length");
  return new Response(body,{status:response.status,statusText:response.statusText,headers});
}
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
        return injectPersonalization(cached.clone());
      }
      try{return injectPersonalization(await fetchAndCache(cache,"./index.html?v="+BUILD,{cache:"no-store"}))}
      catch(_e){return cached?injectPersonalization(cached.clone()):Response.error()}
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
