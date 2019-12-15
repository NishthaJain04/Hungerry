/* eslint-disable no-undef */
/* PWA CACHE STRATEGI FOR BLIBLI.COM */
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/3.2.0/workbox-sw.js'
)
workbox.setConfig({debug: false})

const CACHE_NAME = 'blibli-pwa'

const _staticDomain = '{{_STATIC_PUBLIC_PATH}}'
const _envPrefix = '{{_ENV_PREFIX}}'

const _staticPublicDomain = _staticDomain.replace('frontend/', '')
const BASE_PATH = _staticDomain + 'static/'

let precachedPaths = [];
const precachedFiles = <% precachedFilesObject %>

for (const i in precachedFiles) {
  const f = precachedFiles[i]
  f.map(function (item) {
    precachedPaths.push(`${BASE_PATH}${i}/${item}`)
  })
}

workbox.precaching.precacheAndRoute(precachedPaths)

function generateCacheableConfig (name, maxEntry, maxDay) {
  return {
    cacheName: CACHE_NAME + name,
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: maxEntry,
        maxAgeSeconds: maxDay * 24 * 60 * 60
      })
    ]
  }
}

const staticRoutes = [
  {
    regexes: [
      // put third party urls here
      './bwa/.',
      '^https://fonts.(?:googleapis|gstatic).com/(.*)',
      '^https://storage.(?:googleapis|gstatic).com/(.*)'
    ],
    cache: generateCacheableConfig('__thirdparty', 20, 7)
  },
  {
    regexes: [`^${_staticDomain}+.(.*).(js|css|html|png|gif|jpg|jpeg|svg)`],
    cache: generateCacheableConfig('__static-src--frontend', 100, 365)
  },
  {
    regexes: [`^${_staticDomain}.*(index).(js|css|html)`],
    cache: generateCacheableConfig('__static-src--index', 20, 365)
  },
  {
    regexes: [`^${_staticPublicDomain}+.(.*).(js|css|html|png|gif|jpg|jpeg|svg)`],
    cache: generateCacheableConfig('__static-src--root', 100, 7)
  },
  {
    regexes: [
      // put backend url here for 5 mins cache
      // '/backend/content/pages/home2019'
    ],
    cache: generateCacheableConfig('__5min_cache-first', 100, 0.003472)
  },
  {
    regexes: [
      // put backend url here for 1 day cache
      // '/backend/common/payments/_active/web',
      // '/getCategoryStructures'
    ],
    cache: generateCacheableConfig('__1d_cache-first', 300, 1)
  },
  {
    regexes: [
      // put backend here for 7 days caching
      // '/backend/content/seo'
    ],
    cache: generateCacheableConfig('__7d_cache-first', 100, 7)
  }
]

const staleWhileRevalidateRoutes = [
  {
    regexes: [
      // reuse previous data while fetching new data
      // '/backend/common/configs'
    ],
    cache: generateCacheableConfig('__SWR__backend', 100, 0)
  }
]

function containsAny(arr, substring) {
  for (var i = 0; i != arr.length; i++) {
     if (arr[i].indexOf(substring) != - 1) {
       return i
     }
  }
  return -1
}

const idxOfDefaultImage = this.containsAny(precachedFiles.img, 'default-image')

// STATIC RESOURCES ASSETS
staticRoutes.map(function (item) {
  item.regexes.map(function (regStr) {
    workbox.routing.registerRoute(
      new RegExp(regStr),
      new workbox.strategies.CacheFirst(item.cache)
    )
  })
})

//Stale While Revalidate
staleWhileRevalidateRoutes.map(function (item) {
  item.regexes.map(function (regStr) {
    workbox.routing.registerRoute(
      new RegExp(regStr),
      new workbox.strategies.StaleWhileRevalidate(item.cache)
    )
  })
})

 workbox.routing.setCatchHandler(({event}) => {
  // The FALLBACK_URL entries must be added to the cache ahead of time, either via runtime
  // or precaching.
  // If they are precached, then call workbox.precaching.getCacheKeyForURL(FALLBACK_URL)
  // to get the correct cache key to pass in to caches.match().
  //
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case 'image':
      return caches.match((BASE_PATH+'img/'+precachedFiles.img[idxOfDefaultImage]));
    break;

    default:
      // If we don't have a fallback, just return an error response.
      return Response.error();
  }
});
