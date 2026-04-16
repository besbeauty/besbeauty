<template>
  <div class="w-full max-w-screen-xl px-4 sm:px-8 mx-auto">
    <header
      class="app-header mb-6 -mx-4 sm:-mx-8 px-4 sm:px-8"
      :class="theme === 'white' ? 'bg-[#f3f3f3]' : 'bg-[#0a0c10]'"
    >
      <div class="flex justify-between items-center px-6 py-4">
        <div class="flex flex-col leading-none">
          <span
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
            class="font-headline text-2xl md:text-4xl lg:text-5xl tracking-wider uppercase"
            >Catálogo</span
          >
        </div>
        <div class="flex items-center gap-2">
          <button
            @click="$emit('back')"
            class="p-3 rounded-full"
            :class="
              theme === 'white'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-pink-900/40 text-pink-300'
            "
          >
            <span class="material-symbols-outlined text-lg">arrow_back</span>
          </button>
          <button
            @click="toggleTheme"
            class="p-3 rounded-full"
            :class="
              theme === 'white'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-pink-900/40 text-pink-300'
            "
          >
            <span class="material-symbols-outlined text-lg">{{
              theme === 'white' ? 'light_mode' : 'dark_mode'
            }}</span>
          </button>
        </div>
      </div>
    </header>

    <section v-for="(list, idx) in lists" :key="idx" class="mb-12 px-4 sm:px-0">
      <h3
        :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
        class="text-2xl font-semibold mb-6 text-center"
      >
        {{ list.title }}
      </h3>

      <div class="relative">
        <!-- Carousel -->
        <div
          :ref="(el) => setContainer(el, idx)"
          class="flex gap-4 overflow-x-auto py-4 hide-scrollbar-desktop px-4 cursor-grab active:cursor-grabbing"
          @mousedown="startDrag"
          @mousemove="onDrag"
          @mouseup="endDrag"
          @mouseleave="endDrag"
        >
          <div
            v-for="item in list.items"
            :key="item.id"
            class="flex-shrink-0 group"
          >
            <!-- Card -->
            <div
              :class="
                (theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]') +
                ' rounded-xl shadow-lg overflow-hidden w-auto min-w-48 flex flex-col transition-transform hover:scale-105'
              "
            >
              <!-- Image container -->
              <div class="relative w-full h-40 overflow-hidden bg-gray-200">
                <img
                  :src="item.image"
                  alt="Perfume"
                  class="w-full h-full object-cover"
                />
                <!-- Destaque star -->
                <div
                  v-if="item.destaque"
                  :class="theme === 'white' ? 'bg-amber-300' : 'bg-pink-500'"
                  class="absolute top-2 right-2 rounded-full p-1"
                >
                  <span
                    :class="theme === 'white' ? 'text-amber-900' : 'text-white'"
                    class="material-symbols-outlined text-sm"
                    >star</span
                  >
                </div>
              </div>
              <!-- Info + Details button -->
              <div class="flex-1 p-4 flex flex-col justify-between relative">
                <div>
                  <h4
                    :class="theme === 'white' ? 'text-black' : 'text-white'"
                    class="font-semibold text-sm"
                  >
                    {{ item.nome }}
                  </h4>
                  <p
                    :class="
                      theme === 'white' ? 'text-amber-600' : 'text-pink-300'
                    "
                    class="text-xs font-semibold mt-1"
                  >
                    {{ item.tipo }} • {{ item.categoria }}
                  </p>
                  <p
                    :class="
                      theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                    "
                    class="text-xs capitalize mt-1"
                  >
                    {{ item.genero }}
                  </p>
                </div>
                <div class="flex items-end justify-between">
                  <p
                    :class="
                      theme === 'white' ? 'text-amber-600' : 'text-pink-300'
                    "
                    class="text-lg font-bold"
                  >
                    R$ {{ item.preco.toFixed(2).replace('.', ',') }}
                  </p>
                  <button
                    @click.stop="selectedProduct = item"
                    :class="
                      theme === 'white'
                        ? 'text-amber-600 hover:text-amber-700'
                        : 'text-pink-300 hover:text-pink-400'
                    "
                    class="p-1"
                    title="Ver detalhes"
                  >
                    <span class="material-symbols-outlined text-lg">info</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Ver todos button -->
    <div class="text-center mt-12 pb-6">
      <button
        @click="showFilters = true"
        :class="
          theme === 'white'
            ? 'px-8 py-3 bg-amber-200 text-amber-900 rounded-full'
            : 'px-8 py-3 bg-pink-600 text-black rounded-full'
        "
        class="font-bold uppercase text-sm"
      >
        Ver todos os perfumes
      </button>
    </div>

    <!-- Error Modal -->
    <div
      v-if="showError"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-xl p-6 w-full max-w-sm"
      >
        <div class="flex items-center gap-3 mb-4">
          <span class="material-symbols-outlined text-2xl text-red-500"
            >error</span
          >
          <h2
            :class="theme === 'white' ? 'text-black' : 'text-white'"
            class="text-lg font-bold"
          >
            Erro desconhecido
          </h2>
        </div>
        <p
          :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
          class="mb-6"
        >
          {{ errorMessage || 'Não conseguimos carregar os produtos.' }}
        </p>
        <button
          @click="showError = false"
          :class="
            theme === 'white'
              ? 'w-full px-4 py-2 bg-amber-200 text-amber-900 rounded-full'
              : 'w-full px-4 py-2 bg-pink-600 text-black rounded-full'
          "
          class="font-semibold"
        >
          Fechar
        </button>
      </div>
    </div>
    <div
      v-if="showFilters"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click="showFilters = false"
    >
      <div
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-xl p-6 w-full max-w-md md:max-w-2xl max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
          <h2
            :class="theme === 'white' ? 'text-black' : 'text-white'"
            class="text-2xl font-bold"
          >
            Filtrar
          </h2>
          <button
            @click="showFilters = false"
            class="p-2 rounded-full"
            :class="
              theme === 'white' ? 'hover:bg-gray-100' : 'hover:bg-[#0a0c10]'
            "
          >
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- Search -->
        <div class="mb-6">
          <label
            :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
            class="block text-sm font-semibold mb-2"
            >Pesquisar</label
          >
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Nome do perfume..."
              :class="
                theme === 'white'
                  ? 'bg-gray-50 text-black border-gray-300'
                  : 'bg-[#0a0c10] text-white border-gray-600'
              "
              class="w-full px-3 py-2 border rounded-lg"
            />
            <!-- Autocomplete -->
            <div
              v-if="searchSuggestions.length > 0"
              :class="
                theme === 'white'
                  ? 'bg-white border-gray-300'
                  : 'bg-[#0a0c10] border-gray-600'
              "
              class="absolute top-full left-0 right-0 border rounded-lg mt-1 z-10"
            >
              <div
                v-for="(sugg, i) in searchSuggestions"
                :key="i"
                @click="searchQuery = sugg"
                :class="
                  theme === 'white'
                    ? 'text-black hover:bg-gray-100'
                    : 'text-white hover:bg-gray-800'
                "
                class="px-3 py-2 cursor-pointer"
              >
                {{ sugg }}
              </div>
            </div>
          </div>
        </div>

        <!-- Price Range -->
        <div class="mb-6">
          <label
            :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
            class="block text-sm font-semibold mb-2"
            >Faixa de Preço</label
          >
          <div class="flex gap-2 items-center">
            <div class="flex-1">
              <span
                :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                class="text-xs"
                >De</span
              >
              <input
                v-model.number="priceMin"
                type="number"
                :class="
                  theme === 'white'
                    ? 'bg-gray-50 text-black border-gray-300'
                    : 'bg-[#0a0c10] text-white border-gray-600'
                "
                class="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
            <span
              :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
              class="mt-4"
              >a</span
            >
            <div class="flex-1">
              <span
                :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                class="text-xs"
                >Até</span
              >
              <input
                v-model.number="priceMax"
                type="number"
                :class="
                  theme === 'white'
                    ? 'bg-gray-50 text-black border-gray-300'
                    : 'bg-[#0a0c10] text-white border-gray-600'
                "
                class="w-full px-2 py-1 border rounded text-sm"
              />
            </div>
          </div>
          <div
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
            class="text-sm mt-2"
          >
            R$ {{ priceMin.toFixed(2).replace('.', ',') }} - R$
            {{ priceMax.toFixed(2).replace('.', ',') }}
          </div>
        </div>

        <!-- Genre Filters -->
        <div class="mb-6">
          <label
            :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
            class="block text-sm font-semibold mb-3"
            >Gênero</label
          >
          <div class="space-y-2">
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                v-model="filterFeminino"
                type="checkbox"
                class="w-4 h-4 rounded"
              />
              <span :class="theme === 'white' ? 'text-black' : 'text-white'"
                >Feminino</span
              >
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input
                v-model="filterMasculino"
                type="checkbox"
                class="w-4 h-4 rounded"
              />
              <span :class="theme === 'white' ? 'text-black' : 'text-white'"
                >Masculino</span
              >
            </label>
          </div>
        </div>

        <!-- Destaque Filter -->
        <div class="mb-6">
          <label class="flex items-center gap-3 cursor-pointer">
            <input
              v-model="filterDestaque"
              type="checkbox"
              class="w-4 h-4 rounded"
            />
            <span
              :class="theme === 'white' ? 'text-black' : 'text-white'"
              class="text-sm font-semibold"
              >Apenas em destaque</span
            >
          </label>
        </div>

        <!-- Tipo Filter -->
        <div class="mb-6">
          <label
            :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
            class="block text-sm font-semibold mb-3"
            >Tipo</label
          >
          <select
            v-model="filterTipo"
            :class="
              theme === 'white'
                ? 'bg-gray-50 text-black border-gray-300'
                : 'bg-[#0a0c10] text-white border-gray-600'
            "
            class="w-full px-3 py-2 border rounded text-sm"
          >
            <option value="">Todos</option>
            <option
              v-for="tipo in [
                ...new Set(allProducts.map((p) => p.tipo).filter(Boolean)),
              ]"
              :key="tipo"
              :value="tipo"
            >
              {{ tipo }}
            </option>
          </select>
        </div>

        <!-- Categoria Filter -->
        <div class="mb-6">
          <label
            :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
            class="block text-sm font-semibold mb-3"
            >Categoria</label
          >
          <select
            v-model="filterCategoria"
            :class="
              theme === 'white'
                ? 'bg-gray-50 text-black border-gray-300'
                : 'bg-[#0a0c10] text-white border-gray-600'
            "
            class="w-full px-3 py-2 border rounded text-sm"
          >
            <option value="">Todos</option>
            <option
              v-for="cat in [
                ...new Set(allProducts.map((p) => p.categoria).filter(Boolean)),
              ]"
              :key="cat"
              :value="cat"
            >
              {{ cat }}
            </option>
          </select>
        </div>

        <!-- ML Filter -->
        <div class="mb-6">
          <label
            :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
            class="block text-sm font-semibold mb-3"
            >ML</label
          >
          <select
            v-model="filterML"
            :class="
              theme === 'white'
                ? 'bg-gray-50 text-black border-gray-300'
                : 'bg-[#0a0c10] text-white border-gray-600'
            "
            class="w-full px-3 py-2 border rounded text-sm"
          >
            <option value="">Todos</option>
            <option
              v-for="ml in [
                ...new Set(allProducts.map((p) => p.ml).filter(Boolean)),
              ]"
              :key="ml"
              :value="ml"
            >
              {{ ml }}
            </option>
          </select>
        </div>

        <!-- Results -->
        <div class="mb-6">
          <div
            :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
            class="text-sm"
          >
            {{ filteredProducts.length }} produto(s) encontrado(s)
          </div>
        </div>

        <!-- Results Grid -->
        <div class="grid grid-cols-2 gap-4 mb-6">
          <div
            v-for="item in filteredProducts"
            :key="item.id"
            :class="theme === 'white' ? 'bg-gray-50' : 'bg-[#0a0c10]'"
            class="rounded-lg p-3"
          >
            <div
              :class="theme === 'white' ? 'bg-gray-200' : 'bg-gray-700'"
              class="w-full h-20 rounded mb-2 overflow-hidden cursor-pointer"
              @click="selectedProduct = item"
            >
              <img
                :src="item.image"
                alt=""
                class="w-full h-full object-cover"
              />
            </div>
            <h4
              :class="theme === 'white' ? 'text-black' : 'text-white'"
              class="text-xs font-semibold line-clamp-1"
            >
              {{ item.nome }}
            </h4>
            <p
              :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
              class="text-xs"
            >
              {{ item.tipo }} • {{ item.categoria }}
            </p>
            <p
              :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
              class="text-xs capitalize"
            >
              {{ item.genero }}
            </p>
            <p
              :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
              class="text-sm font-bold"
            >
              R$ {{ item.preco.toFixed(2).replace('.', ',') }}
            </p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button
            @click="
              () => {
                searchQuery = '';
                priceMin = 0;
                priceMax = 500;
                filterFeminino = false;
                filterMasculino = false;
                filterDestaque = false;
              }
            "
            :class="
              theme === 'white'
                ? 'flex-1 px-4 py-2 bg-gray-200 text-black rounded-full'
                : 'flex-1 px-4 py-2 bg-gray-700 text-white rounded-full'
            "
            class="text-sm font-semibold"
          >
            Limpar
          </button>
          <button
            @click="showFilters = false"
            :class="
              theme === 'white'
                ? 'flex-1 px-4 py-2 bg-amber-200 text-amber-900 rounded-full'
                : 'flex-1 px-4 py-2 bg-pink-600 text-black rounded-full'
            "
            class="text-sm font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>

    <!-- Product Details Modal -->
    <div
      v-if="selectedProduct"
      @click="selectedProduct = null"
      :class="theme === 'white' ? 'bg-black/50' : 'bg-black/70'"
      class="fixed inset-0 flex items-center justify-center z-50 p-4"
    >
      <div
        @click.stop
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
      >
        <!-- Image -->
        <div class="w-full h-64 overflow-hidden">
          <img
            :src="selectedProduct.image"
            alt=""
            class="w-full h-full object-cover"
          />
        </div>

        <!-- Content -->
        <div class="p-6">
          <h2
            :class="theme === 'white' ? 'text-black' : 'text-white'"
            class="text-2xl font-semibold mb-2"
          >
            {{ selectedProduct.nome }}
          </h2>

          <div
            :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
            class="text-sm mb-4 space-y-1"
          >
            <p><strong>Tipo:</strong> {{ selectedProduct.tipo }}</p>
            <p><strong>Categoria:</strong> {{ selectedProduct.categoria }}</p>
            <p><strong>Gênero:</strong> {{ selectedProduct.genero }}</p>
          </div>

          <div
            class="border-t border-b py-4 mb-4"
            :class="theme === 'white' ? 'border-gray-300' : 'border-gray-600'"
          >
            <div class="grid grid-cols-3 gap-4 text-center">
              <div>
                <p
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                >
                  Código
                </p>
                <p
                  :class="theme === 'white' ? 'text-black' : 'text-white'"
                  class="font-semibold"
                >
                  {{ selectedProduct.codigo }}
                </p>
              </div>
              <div>
                <p
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                >
                  ML
                </p>
                <p
                  :class="theme === 'white' ? 'text-black' : 'text-white'"
                  class="font-semibold"
                >
                  {{ selectedProduct.ml }}
                </p>
              </div>
              <div>
                <p
                  :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
                  class="text-xs"
                >
                  Quantidade
                </p>
                <p
                  :class="theme === 'white' ? 'text-black' : 'text-white'"
                  class="font-semibold"
                >
                  {{ selectedProduct.quantidade }}
                </p>
              </div>
            </div>
          </div>

          <p
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
            class="text-3xl font-bold mb-6"
          >
            R$ {{ selectedProduct.preco.toFixed(2).replace('.', ',') }}
          </p>

          <button
            @click="selectedProduct = null"
            :class="
              theme === 'white'
                ? 'w-full px-4 py-3 bg-amber-200 text-amber-900 rounded-full'
                : 'w-full px-4 py-3 bg-pink-600 text-black rounded-full'
            "
            class="font-semibold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue';

const emit = defineEmits(['back']);
const theme = inject('theme');
const toggleTheme = inject('toggleTheme');

// All products data
const allProducts = ref([]);
const selectedProduct = ref(null);

// Home page lists
const lists = computed(() => {
  const tipos = [
    ...new Set(allProducts.value.map((p) => p.tipo).filter(Boolean)),
  ];
  return tipos
    .map((tipo) => ({
      title: tipo,
      items: allProducts.value.filter((p) => p.tipo === tipo && p.destaque),
    }))
    .filter((list) => list.items.length > 0);
});

// Filter state
const showFilters = ref(false);
const showError = ref(false);
const errorMessage = ref('');
const searchQuery = ref('');
const priceMin = ref(0);
const priceMax = ref(500);
const filterFeminino = ref(false);
const filterMasculino = ref(false);
const filterDestaque = ref(false);
const filterTipo = ref('');
const filterCategoria = ref('');
const filterML = ref('');

const filteredProducts = computed(() => {
  return allProducts.value.filter((p) => {
    // Search by name
    if (
      searchQuery.value &&
      !p.nome.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
      return false;

    // Price range
    if (p.preco < priceMin.value || p.preco > priceMax.value) return false;

    // Gender filters
    if (filterFeminino.value && p.genero?.toLowerCase() !== 'feminino')
      return false;
    if (filterMasculino.value && p.genero?.toLowerCase() !== 'masculino')
      return false;

    // Destaque filter
    if (filterDestaque.value && !p.destaque) return false;

    // Tipo filter
    if (filterTipo.value && p.tipo !== filterTipo.value) return false;

    // Categoria filter
    if (filterCategoria.value && p.categoria !== filterCategoria.value)
      return false;

    // ML filter
    if (filterML.value && p.ml !== filterML.value) return false;

    return true;
  });
});

const searchSuggestions = computed(() => {
  if (!searchQuery.value) return [];
  return allProducts.value
    .map((p) => p.nome)
    .filter((name) =>
      name.toLowerCase().includes(searchQuery.value.toLowerCase()),
    )
    .filter((v, i, a) => a.indexOf(v) === i)
    .slice(0, 5);
});

const containers = ref([]);

function setContainer(el, idx) {
  if (!containers.value) containers.value = [];
  containers.value[idx] = el;
}

// Drag to scroll
const isDragging = ref(false);
const dragStart = ref(0);
const scrollStart = ref(0);
const dragElement = ref(null);

function startDrag(e) {
  isDragging.value = true;
  dragStart.value = e.clientX;
  scrollStart.value = e.currentTarget.scrollLeft;
  dragElement.value = e.currentTarget;
}

function onDrag(e) {
  if (!isDragging.value || !dragElement.value) return;
  const delta = e.clientX - dragStart.value;
  dragElement.value.scrollLeft = scrollStart.value - delta;
}

function endDrag() {
  isDragging.value = false;
  dragElement.value = null;
}

async function getProducts() {
  try {
    const response = await fetch('/.netlify/functions/sheets');

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(`API: ${data.error}`);
    }

    if (Array.isArray(data)) {
      allProducts.value = data.map((p, i) => ({
        id: i,
        tipo: p.tipo || 'Sem tipo',
        categoria: p.categoria || 'Sem categoria',
        genero: p.genero || 'Unissexo',
        codigo: p.codigo || '',
        nome: p.nome || 'Sem nome',
        ml: p.ml || '',
        preco: parseFloat(p.preco) || 0,
        quantidade: p.quantidade || 0,
        destaque: p.destaque === 'Sim' || p.destaque === true,
        image: p.image,
      }));
    } else {
      throw new Error('Formato de dados inválido');
    }
  } catch (e) {
    showError.value = true;
    errorMessage.value = e.message || 'Erro desconhecido ao carregar produtos';
  }
}

onMounted(() => {
  getProducts();
});
</script>
