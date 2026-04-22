import { ref } from 'vue';

export interface Place {
  name: string;
  rating: number;
  reviews: number;
  address: string;
  distance_km: number;
  lat: number;
  lng: number;
  place_id?: string;
}

export interface SearchFilters {
  maxDistanceKm?: number;
  minReviews?: number;
  minRating?: number;
  placeTypes?: string[];
}

type NearbySearchBody = {
  includedTypes?: string[];
  maxResultCount: number;
  locationRestriction: {
    circle: {
      center: {
        latitude: number;
        longitude: number;
      };
      radius: number;
    };
  };
  rankPreference: 'DISTANCE' | 'POPULARITY';
};

type PlacesApiPlace = {
  id?: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  location?: { latitude?: number; longitude?: number };
  rating?: number;
  userRatingCount?: number;
};

type NearbySearchResponse = {
  places?: PlacesApiPlace[];
};

async function nearbySearchRest(
  apiKey: string,
  body: NearbySearchBody,
): Promise<PlacesApiPlace[]> {
  const endpoint = 'https://places.googleapis.com/v1/places:searchNearby';

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask':
        'places.id,places.displayName,places.formattedAddress,places.location,places.rating,places.userRatingCount',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err);
  }

  const data = (await response.json()) as NearbySearchResponse;
  return data.places || [];
}

function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

export function useNearbyPlaces() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const searchNearby = async (
    lat: number,
    lng: number,
    filters: SearchFilters = {},
  ): Promise<Place[]> => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

    if (!apiKey) {
      error.value = 'API key não configurada';
      return [];
    }

    isLoading.value = true;
    error.value = null;

    try {
      const maxDistanceKm = Number(filters.maxDistanceKm ?? 5);
      const minReviews = Number(filters.minReviews ?? 0);
      const minRating = Number(filters.minRating ?? 4);
      const placeTypes = filters.placeTypes ?? [];

      const radius = maxDistanceKm * 1000;

      const baseRequest: NearbySearchBody = {
        maxResultCount: 20,
        locationRestriction: {
          circle: {
            center: { latitude: lat, longitude: lng },
            radius,
          },
        },
        rankPreference: 'DISTANCE',
      };

      const typesToSearch = placeTypes.length > 0 ? placeTypes : [null];

      const aggregated: PlacesApiPlace[] = [];

      // 🔥 multi request
      for (const type of typesToSearch) {
        const body: NearbySearchBody = { ...baseRequest };

        if (type) {
          body.includedTypes = [type];
        }

        const results = await nearbySearchRest(apiKey, body);
        aggregated.push(...results);
      }

      // 🔥 filtro + dedupe
      const placeIds = new Set<string>();
      const final: Place[] = [];

      for (const r of aggregated) {
        if (!r.id || placeIds.has(r.id)) continue;

        const rating = Number(r.rating ?? 0);
        const reviews = Number(r.userRatingCount ?? 0);
        const plat = r.location?.latitude;
        const plng = r.location?.longitude;

        if (!plat || !plng) continue;
        if (rating < minRating) continue;
        if (reviews < minReviews) continue;

        placeIds.add(r.id);

        final.push({
          name: r.displayName?.text || 'Sem nome',
          rating,
          reviews,
          address: r.formattedAddress || '',
          distance_km: Number(
            calculateDistance(lat, lng, plat, plng).toFixed(2),
          ),
          lat: plat,
          lng: plng,
          place_id: r.id,
        });
      }

      return final.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
    } catch (err) {
      console.error(err);
      error.value = 'Erro ao buscar locais';
      return [];
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    searchNearby,
  };
}
