const CONFIG = {
  BASE_URL: 'https://restaurant-api.dicoding.dev',
  BASE_IMAGE_SMALL_URL: 'https://restaurant-api.dicoding.dev/images/small/',
  BASE_IMAGE_MEDIUM_URL: 'https://restaurant-api.dicoding.dev/images/medium/',
  BASE_IMAGE_LARGE_URL: 'https://restaurant-api.dicoding.dev/images/large/',
  DB_NAME: 'restour-database',
  DB_VERSION: 1,
  OBJECT_STORE_NAME: 'restaurants',
  CACHE_NAME: new Date().toISOString(),
  WEB_SOCKET_SERVER: 'wss://restaurants-feed.dicoding.dev',
};

export default CONFIG;
