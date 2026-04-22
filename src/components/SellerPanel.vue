<template>
  <div
    :class="
      theme === 'white'
        ? 'bg-gradient-to-b from-amber-50 via-white to-amber-100'
        : 'bg-gradient-to-b from-[#10131c] via-[#161c28] to-[#121824]'
    "
    class="min-h-screen w-full px-4 py-10"
  >
    <div class="w-full max-w-4xl mx-auto">
      <section
        :class="
          theme === 'white'
            ? 'bg-white border-amber-100 shadow-[0_20px_50px_rgba(217,119,6,0.10)]'
            : 'bg-[#1a1f2b] border-[#31384a] shadow-[0_20px_50px_rgba(0,0,0,0.45)]'
        "
        class="rounded-3xl border p-6 md:p-8"
      >
        <div class="flex items-start justify-between gap-4 mb-6">
          <div>
            <p
              :class="theme === 'white' ? 'text-amber-700' : 'text-pink-300'"
              class="uppercase tracking-[0.2em] text-xs font-bold mb-2"
            >
              Seller Panel
            </p>
            <h1
              :class="theme === 'white' ? 'text-slate-900' : 'text-white'"
              class="text-2xl md:text-3xl font-bold"
            >
              Buscar Pontos de Encontro
            </h1>
          </div>

          <div
            :class="
              theme === 'white'
                ? 'bg-amber-50 text-amber-700 border-amber-100'
                : 'bg-[#2a2030] text-pink-300 border-pink-900/50'
            "
            class="shrink-0 rounded-full border px-3 py-1 text-xs font-semibold"
          >
            {{ places.length }} resultado(s)
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="md:col-span-2">
            <label
              :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
              class="block text-sm font-semibold mb-2"
            >
              Endereco do cliente
            </label>
            <div ref="autocompleteContainer" class="relative">
              <input
                v-model="address"
                type="text"
                placeholder="Ex: Endereco, bairro, cep..."
                :class="[
                  theme === 'white'
                    ? 'bg-white text-slate-900 border-slate-200 placeholder:text-slate-400 focus:border-amber-500 focus:ring-amber-200'
                    : 'bg-[#232a39] text-white border-[#3a4358] placeholder:text-slate-400 focus:border-pink-500 focus:ring-pink-900/40',
                  'w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 transition-colors',
                ]"
                @focus="showSuggestions = true"
                @keyup.enter="handleAddressEnter"
              />

              <div
                v-if="
                  showSuggestions &&
                  (isAutocompleteLoading || addressSuggestions.length > 0)
                "
                :class="
                  theme === 'white'
                    ? 'bg-white border-slate-200'
                    : 'bg-[#202636] border-[#3a4358]'
                "
                class="absolute z-30 mt-2 w-full border rounded-xl shadow-lg overflow-hidden"
              >
                <div
                  v-if="isAutocompleteLoading"
                  :class="
                    theme === 'white' ? 'text-slate-600' : 'text-slate-300'
                  "
                  class="px-4 py-3 text-sm"
                >
                  Buscando sugestoes...
                </div>

                <button
                  v-for="(suggestion, idx) in addressSuggestions"
                  :key="`address-suggestion-${idx}`"
                  type="button"
                  @click="selectSuggestion(suggestion)"
                  :class="
                    theme === 'white'
                      ? 'hover:bg-slate-50 text-slate-800'
                      : 'hover:bg-[#2a3040] text-slate-100'
                  "
                  class="w-full text-left px-4 py-3 text-sm border-t first:border-t-0 border-slate-200/20"
                >
                  {{ suggestion }}
                </button>
              </div>
            </div>
          </div>

          <div>
            <label
              :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
              class="block text-sm font-semibold mb-2"
            >
              Distancia maxima (km)
            </label>
            <input
              v-model.number="maxDistanceKm"
              type="number"
              min="1"
              max="50"
              :class="[
                theme === 'white'
                  ? 'bg-white text-slate-900 border-slate-200 focus:border-amber-500 focus:ring-amber-200'
                  : 'bg-[#232a39] text-white border-[#3a4358] focus:border-pink-500 focus:ring-pink-900/40',
                'w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 transition-colors',
              ]"
            />
          </div>

          <div>
            <label
              :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
              class="block text-sm font-semibold mb-2"
            >
              Minimo de reviews
            </label>
            <input
              v-model.number="minReviews"
              type="number"
              min="0"
              :class="[
                theme === 'white'
                  ? 'bg-white text-slate-900 border-slate-200 focus:border-amber-500 focus:ring-amber-200'
                  : 'bg-[#232a39] text-white border-[#3a4358] focus:border-pink-500 focus:ring-pink-900/40',
                'w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 transition-colors',
              ]"
            />
          </div>

          <div>
            <label
              :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
              class="block text-sm font-semibold mb-2"
            >
              Nota minima
            </label>
            <input
              v-model.number="minRating"
              type="number"
              min="1"
              max="5"
              step="0.1"
              :class="[
                theme === 'white'
                  ? 'bg-white text-slate-900 border-slate-200 focus:border-amber-500 focus:ring-amber-200'
                  : 'bg-[#232a39] text-white border-[#3a4358] focus:border-pink-500 focus:ring-pink-900/40',
                'w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 transition-colors',
              ]"
            />
          </div>

          <div class="md:col-span-2">
            <label
              :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
              class="block text-sm font-semibold mb-2"
            >
              Tipo de local
            </label>

            <div class="flex flex-wrap gap-2">
              <button
                v-for="group in TYPE_GROUPS"
                :key="group.key"
                type="button"
                @click="toggleTypeGroup(group.key)"
                :class="[
                  selectedTypeGroups.includes(group.key)
                    ? theme === 'white'
                      ? 'bg-amber-100 text-amber-800 border-amber-300'
                      : 'bg-pink-900/40 text-pink-200 border-pink-700/80'
                    : theme === 'white'
                      ? 'bg-white text-slate-700 border-slate-200 hover:border-amber-300'
                      : 'bg-[#232a39] text-slate-300 border-[#3a4358] hover:border-pink-700/70',
                  'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                ]"
              >
                {{ group.label }}
              </button>
            </div>
          </div>
        </div>

        <div class="mt-5">
          <button
            type="button"
            :disabled="loading"
            @click="handleSearch"
            :class="
              theme === 'white'
                ? 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
                : 'from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500'
            "
            class="w-full rounded-xl bg-gradient-to-r text-white px-4 py-3 font-bold shadow-lg disabled:opacity-60 transition"
          >
            {{ loading ? 'Buscando...' : 'Buscar pontos de encontro' }}
          </button>
        </div>

        <p
          v-if="errorMessage"
          class="mt-4 text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2"
        >
          {{ errorMessage }}
        </p>

        <p
          v-if="loading"
          :class="theme === 'white' ? 'text-slate-600' : 'text-slate-300'"
          class="mt-4"
        >
          Carregando resultados...
        </p>
      </section>

      <div v-if="places.length > 0" class="mt-6 space-y-3">
        <article
          v-for="(place, index) in places"
          :key="`${place.place_id || place.name}-${index}`"
          :class="
            theme === 'white'
              ? 'bg-white border-slate-200'
              : 'bg-[#1a1f2b] border-[#31384a]'
          "
          class="rounded-2xl border p-4 shadow-sm"
        >
          <div class="flex items-start justify-between gap-3">
            <div>
              <h2
                :class="theme === 'white' ? 'text-slate-900' : 'text-white'"
                class="font-semibold"
              >
                {{ place.name }}
              </h2>
              <p
                :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
                class="text-sm"
              >
                Nota: {{ place.rating }}
              </p>
              <p
                :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
                class="text-sm"
              >
                Total de avaliações: {{ place.reviews }}
              </p>
              <p
                :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
                class="text-sm"
              >
                Distância em km: {{ place.distance_km }}
              </p>
              <p
                :class="theme === 'white' ? 'text-slate-700' : 'text-slate-300'"
                class="text-sm"
              >
                Endereço: {{ place.address }}
              </p>
            </div>

            <button
              type="button"
              @click="openInMaps(place)"
              :class="
                theme === 'white'
                  ? 'bg-white text-amber-700 border-amber-200 hover:bg-amber-50'
                  : 'bg-[#242b3a] text-pink-300 border-pink-900/40 hover:bg-[#2b3346]'
              "
              class="rounded-xl border px-3 py-2 text-sm font-semibold transition-colors"
            >
              Abrir no Maps
            </button>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import { useGeocoding } from '../composables/useGeocoding';
import { useNearbyPlaces } from '../composables/useNearbyPlaces';
import { useTheme } from '../composables/useTheme';

const TYPE_GROUPS = [
  {
    key: 'food',
    label: '🍽️ Restaurantes & Cafés',
    types: [
      'restaurant',
      'cafe',
      'bakery',
      'meal_takeaway',
      'meal_delivery',
      'food_court',
    ],
  },
  {
    key: 'shopping',
    label: '🛍️ Compras & Shoppings',
    types: [
      'shopping_mall',
      'store',
      'department_store',
      'supermarket',
      'convenience_store',
    ],
  },
  {
    key: 'transport',
    label: '🚇 Transporte & Acesso',
    types: [
      'subway_station',
      'train_station',
      'bus_station',
      'transit_station',
      'taxi_stand',
    ],
  },
  {
    key: 'leisure',
    label: '🌳 Lazer & Áreas abertas',
    types: ['park', 'tourist_attraction', 'plaza'],
  },
  {
    key: 'quick',
    label: '☕ Lugares rápidos / informais',
    types: ['cafe', 'bakery', 'meal_takeaway'],
  },
];

const address = ref('');
const maxDistanceKm = ref(5);
const minReviews = ref(100);
const minRating = ref(4);
const selectedTypeGroups = ref(['food']);
const autocompleteContainer = ref(null);
const addressSuggestions = ref([]);
const isAutocompleteLoading = ref(false);
const showSuggestions = ref(false);
const loading = ref(false);
const places = ref([]);
const errorMessage = ref('');

const { theme } = useTheme();
const { getCoordinates } = useGeocoding();
const { searchNearby } = useNearbyPlaces();

const allGroupKeys = TYPE_GROUPS.map((group) => group.key);
const allGroupTypes = Array.from(
  new Set(TYPE_GROUPS.flatMap((group) => group.types)),
);

const selectedPlaceTypes = computed(() => {
  const selectedGroup = TYPE_GROUPS.find(
    (group) => group.key === selectedTypeGroups.value[0],
  );

  return selectedGroup ? selectedGroup.types : [];
});

function toggleTypeGroup(groupKey) {
  if (selectedTypeGroups.value[0] === groupKey) {
    selectedTypeGroups.value = [];
    return;
  }

  selectedTypeGroups.value = [groupKey];
}

let autocompleteDebounce = null;
let lastAutocompleteRequest = 0;

function normalizeText(value) {
  return (value || '')
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function normalizeCep(value) {
  return (value || '').replace(/\D/g, '').slice(0, 8);
}

async function fetchCepSuggestion(query) {
  const cep = normalizeCep(query);

  if (cep.length !== 8) return [];

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data?.erro) return [];

    const isSaoPauloCapital =
      normalizeText(data.uf) === 'sp' &&
      normalizeText(data.localidade) === 'sao paulo';

    if (!isSaoPauloCapital) return [];

    const parts = [data.logradouro, data.bairro, data.localidade, data.uf]
      .map((part) => (part || '').toString().trim())
      .filter(Boolean);

    return parts.length ? [parts.join(', ')] : [];
  } catch {
    return [];
  }
}

function isBrazilSaoPauloCapital(result) {
  const components = result?.address_components || [];

  const country = components.find((c) =>
    c?.types?.includes('country'),
  )?.short_name;

  const state = components.find((c) =>
    c?.types?.includes('administrative_area_level_1'),
  )?.short_name;

  const cityCandidates = components
    .filter((c) =>
      c?.types?.some((t) =>
        [
          'locality',
          'administrative_area_level_2',
          'sublocality',
          'sublocality_level_1',
        ].includes(t),
      ),
    )
    .map((c) => normalizeText(c.long_name));

  return (
    normalizeText(country) === 'br' &&
    normalizeText(state) === 'sp' &&
    cityCandidates.includes('sao paulo')
  );
}

async function fetchGoogleAddressSuggestions(query) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_KEY;
  if (!apiKey) return [];

  try {
    const encodedAddress = encodeURIComponent(query);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&language=pt-BR&region=br&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') return [];

    return data.results
      .filter(isBrazilSaoPauloCapital)
      .map((r) => r?.formatted_address)
      .filter(Boolean)
      .slice(0, 5);
  } catch {
    return [];
  }
}

function dedupeSuggestions(items) {
  return Array.from(new Set(items.map((i) => i.trim()).filter(Boolean)));
}

async function loadAutocompleteSuggestions(query) {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 3) {
    addressSuggestions.value = [];
    isAutocompleteLoading.value = false;
    return;
  }

  isAutocompleteLoading.value = true;
  const requestId = Date.now();
  lastAutocompleteRequest = requestId;

  const [cepSuggestions, googleSuggestions] = await Promise.all([
    fetchCepSuggestion(trimmedQuery),
    fetchGoogleAddressSuggestions(trimmedQuery),
  ]);

  if (lastAutocompleteRequest !== requestId) return;

  addressSuggestions.value = dedupeSuggestions([
    ...cepSuggestions,
    ...googleSuggestions,
  ]).slice(0, 5);

  isAutocompleteLoading.value = false;
}

function selectSuggestion(suggestion) {
  address.value = suggestion;
  showSuggestions.value = false;
  addressSuggestions.value = [];
}

function handleAddressEnter() {
  if (showSuggestions.value && addressSuggestions.value.length > 0) {
    selectSuggestion(addressSuggestions.value[0]);
  }
  handleSearch();
}

function handleDocumentClick(event) {
  if (!autocompleteContainer.value) return;
  if (!autocompleteContainer.value.contains(event.target)) {
    showSuggestions.value = false;
  }
}

watch(address, (newValue) => {
  showSuggestions.value = true;

  if (autocompleteDebounce) clearTimeout(autocompleteDebounce);

  autocompleteDebounce = setTimeout(() => {
    loadAutocompleteSuggestions(newValue);
  }, 350);
});

if (typeof document !== 'undefined') {
  document.addEventListener('click', handleDocumentClick);
}

onBeforeUnmount(() => {
  if (autocompleteDebounce) clearTimeout(autocompleteDebounce);
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleDocumentClick);
  }
});

function openInMaps(place) {
  const query = encodeURIComponent(place.name || place.address || '');
  const placeIdPart = place.place_id
    ? `&query_place_id=${encodeURIComponent(place.place_id)}`
    : '';
  const url = `https://www.google.com/maps/search/?api=1&query=${query}${placeIdPart}`;
  window.open(url, '_blank');
}

async function handleSearch() {
  const startTime = performance.now();

  errorMessage.value = '';
  places.value = [];

  const trimmedAddress = address.value.trim();

  if (!trimmedAddress) {
    console.warn('Endereço vazio');
    errorMessage.value = 'Informe um endereco para buscar.';
    return;
  }

  loading.value = true;

  try {
    const coordinates = await getCoordinates(trimmedAddress);

    if (!coordinates) {
      console.warn('Sem coordenadas');
      errorMessage.value = 'Nenhum ponto de encontro encontrado';
      return;
    }

    const results = await searchNearby(coordinates.lat, coordinates.lng, {
      maxDistanceKm: Number(maxDistanceKm.value) || 5,
      minReviews: Number(minReviews.value) || 0,
      minRating: Number(minRating.value) || 4,
      placeTypes: selectedPlaceTypes.value,
    });

    places.value = results;

    if (!places.value.length) {
      console.warn('Nenhum resultado');
      errorMessage.value = 'Nenhum ponto de encontro encontrado';
    }
  } catch (error) {
    console.error('[SEARCH] Erro:', error);
    errorMessage.value = 'Nenhum ponto de encontro encontrado';
  } finally {
    loading.value = false;

    const endTime = performance.now();
  }
}
</script>
