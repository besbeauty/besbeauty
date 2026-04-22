interface CachedPlace {
  timestamp: number;
  places: Array<{
    name: string;
    rating: number;
    reviews: number;
    address: string;
    distance_km: number;
    lat: number;
    lng: number;
  }>;
}

const CACHE_KEY_PREFIX = 'grid_';

function calculateGridId(lat: number, lng: number): string {
  const gridLat = Math.floor(lat * 100) / 100;
  const gridLng = Math.floor(lng * 100) / 100;
  return `${CACHE_KEY_PREFIX}${gridLat}_${gridLng}`;
}

function normalizeFilterKey(filterKey?: string): string {
  if (!filterKey) {
    return 'default';
  }

  return filterKey.replace(/[^a-zA-Z0-9_.-]/g, '_').slice(0, 120);
}

function buildCacheKey(lat: number, lng: number, filterKey?: string): string {
  const gridId = calculateGridId(lat, lng);
  return `${gridId}__${normalizeFilterKey(filterKey)}`;
}

function getCacheDurationMs(): number {
  const hours = import.meta.env.VITE_SELLER_CACHE_DURATION_HOURS || 24;
  return parseInt(hours) * 60 * 60 * 1000;
}

export function usePlaceCache() {
  const getCache = (
    lat: number,
    lng: number,
    filterKey?: string,
  ): CachedPlace | null => {
    const cacheKey = buildCacheKey(lat, lng, filterKey);
    const cached = localStorage.getItem(cacheKey);

    if (!cached) {
      return null;
    }

    try {
      const data: CachedPlace = JSON.parse(cached);
      const cacheDuration = getCacheDurationMs();
      const now = Date.now();

      if (now - data.timestamp > cacheDuration) {
        localStorage.removeItem(cacheKey);
        return null;
      }

      return data;
    } catch {
      localStorage.removeItem(cacheKey);
      return null;
    }
  };

  const setCache = (
    lat: number,
    lng: number,
    places: CachedPlace['places'],
    filterKey?: string,
  ) => {
    const cacheKey = buildCacheKey(lat, lng, filterKey);
    const data: CachedPlace = {
      timestamp: Date.now(),
      places,
    };
    localStorage.setItem(cacheKey, JSON.stringify(data));
  };

  const clearCache = (lat: number, lng: number) => {
    const gridId = calculateGridId(lat, lng);
    localStorage.removeItem(gridId);
  };

  const clearAllCache = () => {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_KEY_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  };

  return {
    getCache,
    setCache,
    clearCache,
    clearAllCache,
    calculateGridId,
  };
}
