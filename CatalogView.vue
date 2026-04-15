<template>
  <div class="w-full max-w-screen-xl px-4 sm:px-8 mx-auto">
    <header
      class="app-header mb-6"
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

    <section v-for="(list, idx) in lists" :key="idx" class="mb-12">
      <h3
        :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
        class="text-2xl font-semibold mb-6"
      >
        {{ list.title }}
      </h3>

      <div class="relative">
        <!-- Left arrow -->
        <div
          class="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex z-20"
        >
          <button
            @click="scroll(idx, -1)"
            class="p-3 rounded-full"
            :class="
              theme === 'white'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-pink-900/40 text-pink-300'
            "
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
        </div>

        <!-- Right arrow -->
        <div
          class="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex z-20"
        >
          <button
            @click="scroll(idx, 1)"
            class="p-3 rounded-full"
            :class="
              theme === 'white'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-pink-900/40 text-pink-300'
            "
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        <!-- Carousel -->
        <div
          :ref="(el) => setContainer(el, idx)"
          class="flex gap-4 overflow-x-auto py-4 hide-scrollbar-desktop md:justify-center px-12"
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
                ' rounded-xl shadow-lg overflow-hidden w-48 h-72 flex flex-col transition-transform hover:scale-105'
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
                  class="absolute top-2 right-2 bg-yellow-400 rounded-full p-1"
                >
                  <span
                    class="material-symbols-outlined text-yellow-900 text-sm"
                    >star</span
                  >
                </div>
              </div>
              <!-- Info -->
              <div class="flex-1 p-4 flex flex-col justify-between">
                <div>
                  <h4
                    :class="theme === 'white' ? 'text-black' : 'text-white'"
                    class="font-semibold text-sm line-clamp-2"
                  >
                    {{ item.nome }}
                  </h4>
                  <p
                    :class="
                      theme === 'white' ? 'text-gray-600' : 'text-gray-400'
                    "
                    class="text-xs capitalize mt-1"
                  >
                    {{ item.genero }}
                  </p>
                </div>
                <p
                  :class="
                    theme === 'white' ? 'text-amber-600' : 'text-pink-300'
                  "
                  class="text-lg font-bold"
                >
                  R$ {{ item.preco.toFixed(2).replace('.', ',') }}
                </p>
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

    <!-- Filter Modal -->
    <div
      v-if="showFilters"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
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
              class="w-full h-20 rounded mb-2 overflow-hidden"
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
  </div>
</template>

<script setup>
import { ref, inject, computed, onMounted } from 'vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';

const emit = defineEmits(['back']);
const theme = inject('theme');
const toggleTheme = inject('toggleTheme');

// Cloudinary setup
const CLOUD_NAME = 'dvnr5vroo';
const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

function buildImageUrl(publicId, width) {
  return cld
    .image(publicId)
    .resize(scale().width(width))
    .format('auto')
    .quality('auto')
    .toURL();
}

// All products data
const allProducts = ref([]);

// Home page lists
const lists = computed(() => [
  {
    title: 'Em destaque',
    items: allProducts.value.filter((p) => p.destaque),
  },
  {
    title: 'Masculino',
    items: allProducts.value.filter((p) => p.genero === 'masculino'),
  },
  {
    title: 'Feminino',
    items: allProducts.value.filter((p) => p.genero === 'feminino'),
  },
]);

// Filter state
const showFilters = ref(false);
const searchQuery = ref('');
const priceMin = ref(0);
const priceMax = ref(500);
const filterFeminino = ref(false);
const filterMasculino = ref(false);
const filterDestaque = ref(false);

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
    if (filterFeminino.value && p.genero !== 'feminino') return false;
    if (filterMasculino.value && p.genero !== 'masculino') return false;

    // Destaque filter
    if (filterDestaque.value && !p.destaque) return false;

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

function scroll(idx, dir) {
  const el = containers.value[idx];
  if (!el) return;
  const delta = Math.round(el.clientWidth * 0.7) * dir;
  el.scrollBy({ left: delta, behavior: 'smooth' });
}

async function getProducts() {
  try {
    console.log('Buscando produtos...');
    const response = await fetch('/.netlify/functions/sheets');
    console.log('Response:', response.status);
    const data = await response.json();
    console.log('Dados recebidos:', data);

    if (Array.isArray(data)) {
      allProducts.value = data.map((p, i) => ({
        id: i,
        nome: p.nome,
        preco: p.preco,
        genero: p.genero,
        destaque: p.destaque,
        image: p.image
          ? buildImageUrl(p.image, 300)
          : 'https://via.placeholder.com/300x300?text=Sem+Imagem',
      }));
      console.log('Produtos carregados:', allProducts.value);
    } else {
      console.error('Dados não são array:', data);
    }
  } catch (e) {
    console.error('Erro ao buscar produtos:', e);
  }
}

onMounted(() => {
  getProducts();
});
</script>
