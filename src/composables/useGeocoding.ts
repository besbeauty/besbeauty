import { ref } from 'vue';

interface GeocodingResult {
  lat: number;
  lng: number;
}

export function useGeocoding() {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const getCoordinates = async (
    address: string,
  ): Promise<GeocodingResult | null> => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;

    if (!apiKey) {
      error.value = 'Chave da API Google Maps não configurada';
      return null;
    }

    if (!address || address.trim() === '') {
      error.value = 'Informe um endereço válido';
      return null;
    }

    isLoading.value = true;
    error.value = null;

    try {
      const encodedAddress = encodeURIComponent(address);
      const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;
      const safeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=REDACTED`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'ZERO_RESULTS') {
        error.value = 'Endereço não encontrado. Tente ser mais específico.';
        return null;
      }

      if (data.status !== 'OK') {
        error.value = `Erro ao geocodificar: ${data.status}`;
        return null;
      }

      if (!data.results || data.results.length === 0) {
        error.value = 'Nenhum resultado encontrado para este endereço';
        return null;
      }

      const location = data.results[0].geometry.location;

      return {
        lat: location.lat,
        lng: location.lng,
      };
    } catch (err) {
      error.value = 'Erro ao conectar com Google Maps';
      console.error('Geocoding error:', err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLoading,
    error,
    getCoordinates,
  };
}
