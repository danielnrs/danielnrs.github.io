// sw.js
importScripts('./scripts/utils/cache-helper.js');
importScripts('./scripts/globals/api-endpoint.js');

const assetsToCache = [
  './',
  './index.html',
  './styles/style.css',
  './bundle.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(CacheHelper.cacheAppShell(assetsToCache));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(CacheHelper.revalidateCache(event.request));
});
