<template>
  <div class="w-full min-h-screen overflow-x-hidden">
    <AppHeader
      title="B&S Beauty"
      :show-catalog-btn="true"
      :show-seller-btn="sellerAreaEnabled"
      @open-catalog="openCatalog"
      @open-seller="openSellerArea"
    />

    <!-- Main Content -->
    <div class="w-full max-w-screen-xl px-8 mx-auto">
      <!-- Hero -->
      <section class="mb-12 rounded-lg min-h-[420px] md:min-h-auto">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div class="w-full md:w-auto flex-1">
            <h2 class="font-headline text-4xl md:text-6xl leading-tight mb-6">
              {{ heroTitle }}
            </h2>
            <p
              :class="theme === 'white' ? 'text-black' : 'text-zinc-100'"
              class="mb-10 max-w-lg leading-relaxed"
            >
              {{ heroSubtitle }}
            </p>
            <div class="flex flex-wrap gap-4">
              <button
                @click="handleHeroAction"
                :class="
                  theme === 'white'
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-pink-600 text-black'
                "
                class="px-8 py-3 rounded-full font-bold uppercase text-sm hover:scale-105 transition-all shadow"
              >
                {{ heroButtonText }}
              </button>
            </div>
          </div>
          <div class="w-full md:w-auto flex justify-center md:justify-end">
            <div
              class="w-96 h-80 md:w-[450px] md:h-80 rounded-lg overflow-hidden"
            >
              <img
                :src="heroImageUrl"
                :srcset="heroImageSrcset"
                :sizes="imgSizes"
                alt="Luxury Perfumes"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Trust -->
      <section class="py-12 bg-surface-container-low mb-12 rounded-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            v-for="(item, index) in trustItems"
            :key="`trust-${index}`"
            class="flex flex-col items-center text-center"
          >
            <div
              :class="
                theme === 'white'
                  ? 'w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-4'
                  : 'w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4'
              "
            >
              <span
                :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
                class="material-symbols-outlined text-2xl"
                >{{ item.icon }}</span
              >
            </div>
            <h4 class="font-headline text-xl mb-2">{{ item.title }}</h4>
            <p class="text-sm text-on-surface-variant">
              {{ item.text }}
            </p>
          </div>
        </div>
      </section>

      <!-- How to Buy -->
      <section
        :class="
          theme === 'white'
            ? 'py-12 bg-white mb-12 rounded-lg p-6'
            : 'py-12 bg-[#0b1116] mb-12 rounded-lg p-6'
        "
      >
        <div class="text-center mb-8">
          <h2 class="font-headline text-3xl md:text-4xl">
            {{ howToBuyTitle }}
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="(item, index) in howToBuyItems"
            :key="`how-${index}`"
            class="p-6 bg-surface rounded-2xl border"
          >
            <span class="text-4xl font-headline text-primary/10">{{
              item.number
            }}</span>
            <div class="mt-4">
              <span
                class="material-symbols-outlined text-primary text-3xl mb-4"
                >{{ item.icon }}</span
              >
              <h3 class="font-headline text-2xl mb-2">{{ item.title }}</h3>
              <p class="text-on-surface-variant">
                {{ item.text }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Signature Story -->
      <section class="py-12 bg-surface mb-12 rounded-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div
            :class="
              theme === 'white'
                ? 'md:col-span-7 rounded-3xl overflow-hidden min-h-[300px] relative group bg-zinc-50'
                : 'md:col-span-7 rounded-3xl overflow-hidden min-h-[300px] relative group bg-[#071028]'
            "
          >
            <img
              :src="quoteImageUrl"
              :srcset="quoteImageSrcset"
              :sizes="imgSizes"
              alt="Coco Chanel"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="md:col-span-5 flex flex-col gap-6">
            <div
              class="flex-1 bg-tertiary-fixed rounded-3xl p-6 flex flex-col justify-center"
            >
              <h4
                class="font-headline text-2xl text-on-tertiary-fixed mb-4 italic"
              >
                "{{ quoteText }}"
              </h4>
              <p
                class="text-on-tertiary-fixed-variant text-sm tracking-widest font-bold uppercase"
              >
                — {{ quoteAuthor }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div
      v-if="showConfigError"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <div
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto"
      >
        <div class="flex items-center gap-3 mb-4">
          <span class="material-symbols-outlined text-2xl text-red-500"
            >error</span
          >
          <h2
            :class="theme === 'white' ? 'text-black' : 'text-white'"
            class="text-lg font-bold"
          >
            Erro na Home
          </h2>
        </div>
        <p
          :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
          class="mb-6 break-words whitespace-pre-wrap"
        >
          {{ configErrorMessage }}
        </p>
        <button
          @click="showConfigError = false"
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

    <AppFooter layout="home" @contact-click="openContactModal" />

    <!-- Contact Name Modal -->
    <div
      v-if="showContactNameModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      @click.self="closeContactModal()"
    >
      <div
        :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        class="rounded-lg p-6 w-96 max-w-[90%] shadow-lg"
      >
        <h2
          :class="theme === 'white' ? 'text-amber-700' : 'text-pink-400'"
          class="text-xl font-bold mb-4"
        >
          Como você se chama?
        </h2>

        <input
          v-model="contactName"
          type="text"
          placeholder="Seu nome"
          :class="[
            theme === 'white'
              ? 'bg-gray-100 text-black border-amber-200'
              : 'bg-[#2a3040] text-white border-pink-800',
            'w-full px-4 py-2 border rounded-lg mb-4 outline-none focus:ring-2',
            theme === 'white' ? 'focus:ring-amber-500' : 'focus:ring-pink-500',
          ]"
          @keyup.enter="sendContactMessage()"
        />

        <p
          v-if="contactNameError"
          :class="theme === 'white' ? 'text-red-600' : 'text-red-400'"
          class="text-sm mb-4"
        >
          {{ contactNameError }}
        </p>

        <div class="flex gap-3">
          <button
            @click="closeContactModal()"
            :class="
              theme === 'white'
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
            "
            class="flex-1 py-2 rounded-lg font-semibold transition-colors"
          >
            Cancelar
          </button>
          <button
            @click="sendContactMessage()"
            :class="
              theme === 'white'
                ? 'bg-amber-600 text-white hover:bg-amber-700'
                : 'bg-pink-600 text-white hover:bg-pink-700'
            "
            class="flex-1 py-2 rounded-lg font-semibold transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import { useCloudinary } from '../composables/useCloudinary';
import { useMessages } from '../composables/useMessages';
import { useTheme } from '../composables/useTheme';
import { useRouter } from 'vue-router';

import { computed, ref, watch, onMounted } from 'vue';

const { buildImageUrl } = useCloudinary();
const { randomMessage, getRandomMessage } = useMessages();
const { theme, toggleTheme } = useTheme();
const router = useRouter();
const sellerAreaEnabled = import.meta.env.VITE_ENABLE_SELLER_AREA === 'true';
const showConfigError = ref(false);
const configErrorMessage = ref('');

// Images srcset
const imgWidths = [400, 600, 800, 1200];
const imgSizes = '(max-width:768px) 100vw, 50vw';
const HOME_RANGE = 'Home!A:D';
const homeConfig = ref({});

const DEFAULT_HOME_CONTENT = {
  heroTitle: 'Perfumes importados com preco acessivel',
  heroSubtitle:
    'Explore uma curadoria exclusiva das fragrancias mais desejadas do mundo. O luxo que voce merece, agora ao seu alcance com a autenticidade garantida pela B&S BEAUTY.',
  heroButtonText: 'Ver catalogo',
  heroButtonLink: '/catalog',
  heroImageId: 'luxury_perfumes_lknj5c',
  trustItems: [
    {
      title: 'Perfumes importados',
      text: 'As maiores grifes internacionais diretamente para voce.',
      icon: 'language',
    },
    {
      title: 'Produtos originais',
      text: 'Garantia absoluta de procedencia e selo de autenticidade.',
      icon: 'verified',
    },
    {
      title: 'Entrega Premium',
      text: 'Logistica agil com embalagens preparadas para presente.',
      icon: 'local_shipping',
    },
    {
      title: 'Compra Segura',
      text: 'Ambiente criptografado e atendimento personalizado.',
      icon: 'lock',
    },
  ],
  howToBuyTitle: 'Como adquirir sua fragrancia',
  howToBuyItems: [
    {
      number: '01',
      title: 'Escolha seu aroma',
      text: 'Navegue pelo nosso catalogo digital e descubra as notas que mais combinam com sua personalidade.',
      icon: 'menu_book',
    },
    {
      number: '02',
      title: 'Atendimento VIP',
      text: 'Chame nossos especialistas no WhatsApp para tirar duvidas sobre fixacao, projecao e disponibilidade.',
      icon: 'chat',
    },
    {
      number: '03',
      title: 'Receba com Luxo',
      text: 'Finalize seu pedido com seguranca e receba sua caixa B&S Beauty no conforto do seu lar.',
      icon: 'shopping_bag',
    },
  ],
  quoteText:
    'O perfume e o acessorio invisivel, mas inesquecivel de uma mulher.',
  quoteAuthor: 'Coco Chanel',
  quoteImageId: 'coco_chanel_vo3pwc',
};

// Contact compliments
const CONTACT_COMPLIMENTS = [
  'Ta muito lindo!',
  'O site ficou maravilhoso!',
  'Ficou lindo demais!',
  'Que site incrivel, parabens!',
  'Ta super elegante!',
  'Ficou chique e muito bem feito!',
  'Ta impecavel!',
  'Ficou encantador!',
  'Ta bonito de verdade!',
  'O visual ficou sensacional!',
  'Ficou moderno e muito bonito!',
  'Ta caprichado demais!',
  'Ficou um charme!',
  'Ta maravilhoso de navegar!',
  'Ficou de encher os olhos!',
  'Ta lindo e super profissional!',
  'Ficou top demais!',
  'Ta um arraso!',
  'Ficou perfeito!',
  'Ta bonito, leve e elegante!',
  'Ficou muito bem organizado e lindo!',
  'Ta com cara de marca grande!',
  'Ficou clean e sofisticado!',
  'Ta surreal de bonito!',
  'Ficou lindo, parabens pelo capricho!',
  'Ta com um visual premium!',
  'Ficou bonito demais, serio!',
  'Ta estiloso e muito agradavel!',
  'Ficou diferenciado e muito bonito!',
  'Ta simplesmente espetacular!',
];

const SELLER_PHONES = [
  '5511970489098', // Bruna
];

// Contact form state
const showContactNameModal = ref(false);
const contactName = ref('');
const contactNameError = ref('');
const selectedVendor = ref(null);

function getEnvValue(envKey, defineKey) {
  const envValue = import.meta.env[envKey];
  if (envValue && envValue !== 'undefined') {
    return envValue;
  }

  if (envKey === 'VITE_PRIMARY_SHEET_ID') {
    const legacyEnvValue = import.meta.env.VITE_SHEET_ID;
    if (legacyEnvValue && legacyEnvValue !== 'undefined') {
      return legacyEnvValue;
    }
  }

  if (envKey === 'VITE_PRIMARY_GOOGLE_API_KEY') {
    const legacyEnvValue = import.meta.env.VITE_GOOGLE_API_KEY;
    if (legacyEnvValue && legacyEnvValue !== 'undefined') {
      return legacyEnvValue;
    }
  }

  if (defineKey === '__VITE_PRIMARY_SHEET_ID__') {
    return typeof __VITE_PRIMARY_SHEET_ID__ !== 'undefined'
      ? __VITE_PRIMARY_SHEET_ID__
      : '';
  }

  if (defineKey === '__VITE_PRIMARY_GOOGLE_API_KEY__') {
    return typeof __VITE_PRIMARY_GOOGLE_API_KEY__ !== 'undefined'
      ? __VITE_PRIMARY_GOOGLE_API_KEY__
      : '';
  }

  if (defineKey === '__VITE_FALLBACK_SHEET_ID__') {
    return typeof __VITE_FALLBACK_SHEET_ID__ !== 'undefined'
      ? __VITE_FALLBACK_SHEET_ID__
      : '';
  }

  if (defineKey === '__VITE_FALLBACK_GOOGLE_API_KEY__') {
    return typeof __VITE_FALLBACK_GOOGLE_API_KEY__ !== 'undefined'
      ? __VITE_FALLBACK_GOOGLE_API_KEY__
      : '';
  }

  return '';
}

function getSheetSources() {
  const sources = [
    {
      label: 'primary',
      sheetId: getEnvValue(
        'VITE_PRIMARY_SHEET_ID',
        '__VITE_PRIMARY_SHEET_ID__',
      ),
      apiKey: getEnvValue(
        'VITE_PRIMARY_GOOGLE_API_KEY',
        '__VITE_PRIMARY_GOOGLE_API_KEY__',
      ),
    },
    {
      label: 'fallback',
      sheetId: getEnvValue(
        'VITE_FALLBACK_SHEET_ID',
        '__VITE_FALLBACK_SHEET_ID__',
      ),
      apiKey: getEnvValue(
        'VITE_FALLBACK_GOOGLE_API_KEY',
        '__VITE_FALLBACK_GOOGLE_API_KEY__',
      ),
    },
  ];

  return sources.filter(
    (source) =>
      source.sheetId &&
      source.sheetId !== 'undefined' &&
      source.apiKey &&
      source.apiKey !== 'undefined' &&
      source.apiKey !== 'YOUR_PUBLIC_API_KEY_HERE' &&
      source.apiKey !== 'YOUR_API_KEY_HERE',
  );
}

async function fetchSheetRows(source, range) {
  const encodedRange = encodeURIComponent(range);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${source.sheetId}/values/${encodedRange}?key=${source.apiKey}`;

  const response = await fetch(url);
  let responseBody = null;

  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (response.status === 403) {
    throw new Error(`HTTP 403: acesso negado na planilha ${source.label}`);
  }

  if (!response.ok) {
    const apiMessage =
      responseBody?.error?.message ||
      response.statusText ||
      'erro desconhecido';
    throw new Error(
      `HTTP ${response.status}: ${apiMessage} na planilha ${source.label}`,
    );
  }

  if (responseBody?.error) {
    throw new Error(`API Error: ${responseBody.error.message}`);
  }

  return responseBody?.values || [];
}

async function fetchRowsWithFallback(range) {
  const sheetSources = getSheetSources();

  if (sheetSources.length === 0) {
    throw new Error(
      'Nenhuma planilha configurada. Defina VITE_PRIMARY_SHEET_ID/VITE_PRIMARY_GOOGLE_API_KEY. Para fallback, use VITE_FALLBACK_SHEET_ID/VITE_FALLBACK_GOOGLE_API_KEY.',
    );
  }

  let lastError = null;

  for (const source of sheetSources) {
    try {
      return await fetchSheetRows(source, range);
    } catch (error) {
      const errorMessage = error?.message || '';
      const shouldTryFallback =
        source.label === 'primary' &&
        (errorMessage.includes('400') ||
          errorMessage.includes('403') ||
          errorMessage.includes('HTTP 404') ||
          errorMessage.includes('Unable to parse range') ||
          errorMessage.includes('Requested entity was not found') ||
          errorMessage.includes('access') ||
          errorMessage.includes('A1'));

      lastError = error;
      if (!shouldTryFallback) {
        throw error;
      }
    }
  }

  throw lastError || new Error('Nenhuma planilha retornou dados validos');
}

function parseAtivoFlag(value) {
  return (value || '').toString().trim().toLowerCase() === 'sim';
}

function normalizeHomeConfig(rows) {
  const groupedEntries = {};

  rows.slice(1).forEach((row) => {
    const key = row[0]?.toString().trim();
    const value = row[1]?.toString() || '';
    const ativo = row[2]?.toString().trim() || '';

    if (!key) return;

    if (!groupedEntries[key]) {
      groupedEntries[key] = [];
    }

    groupedEntries[key].push({ value, ativo });
  });

  const normalizedConfig = {};

  Object.entries(groupedEntries).forEach(([key, entries]) => {
    const activeEntries = entries.filter((entry) =>
      parseAtivoFlag(entry.ativo),
    );

    if (activeEntries.length > 1) {
      throw new Error(
        `Chave duplicada com mais de um "sim": ${key}. Deixe apenas uma linha ativa para essa chave.`,
      );
    }

    if (activeEntries.length === 1) {
      normalizedConfig[key] = activeEntries[0].value;
    }
  });

  return normalizedConfig;
}

async function loadHomeConfig() {
  try {
    const rows = await fetchRowsWithFallback(HOME_RANGE);
    homeConfig.value = normalizeHomeConfig(rows);
    showConfigError.value = false;
    configErrorMessage.value = '';
  } catch (error) {
    homeConfig.value = {};
    showConfigError.value = true;
    configErrorMessage.value =
      error?.message || 'Erro desconhecido ao carregar configuracoes da Home.';
  }
}

function getHomeValue(key, fallback) {
  return homeConfig.value[key] || fallback;
}

function buildSrcset(publicId) {
  return imgWidths
    .map((width) => `${buildImageUrl(publicId, width)} ${width}w`)
    .join(', ');
}

const heroTitle = computed(() =>
  getHomeValue('hero_titulo', DEFAULT_HOME_CONTENT.heroTitle),
);
const heroSubtitle = computed(() =>
  getHomeValue('hero_subtitulo', DEFAULT_HOME_CONTENT.heroSubtitle),
);
const heroButtonText = computed(() =>
  getHomeValue('hero_botao_texto', DEFAULT_HOME_CONTENT.heroButtonText),
);
const heroImageId = computed(() =>
  getHomeValue('hero_imagem', DEFAULT_HOME_CONTENT.heroImageId),
);
const heroImageUrl = computed(() => buildImageUrl(heroImageId.value, 800));
const heroImageSrcset = computed(() => buildSrcset(heroImageId.value));

const trustItems = computed(() =>
  DEFAULT_HOME_CONTENT.trustItems.map((item, index) => {
    const itemNumber = index + 1;
    return {
      title: getHomeValue(`confianca_item_${itemNumber}_titulo`, item.title),
      text: getHomeValue(`confianca_item_${itemNumber}_texto`, item.text),
      icon: getHomeValue(`confianca_item_${itemNumber}_icone`, item.icon),
    };
  }),
);

const howToBuyTitle = computed(() =>
  getHomeValue('como_comprar_titulo', DEFAULT_HOME_CONTENT.howToBuyTitle),
);
const howToBuyItems = computed(() =>
  DEFAULT_HOME_CONTENT.howToBuyItems.map((item, index) => {
    const itemNumber = index + 1;
    return {
      number: getHomeValue(
        `como_comprar_item_${itemNumber}_numero`,
        item.number,
      ),
      title: getHomeValue(`como_comprar_item_${itemNumber}_titulo`, item.title),
      text: getHomeValue(`como_comprar_item_${itemNumber}_texto`, item.text),
      icon: getHomeValue(`como_comprar_item_${itemNumber}_icone`, item.icon),
    };
  }),
);

const quoteText = computed(() =>
  getHomeValue('citacao_texto', DEFAULT_HOME_CONTENT.quoteText),
);
const quoteAuthor = computed(() =>
  getHomeValue('citacao_autor', DEFAULT_HOME_CONTENT.quoteAuthor),
);
const quoteImageId = computed(() =>
  getHomeValue('citacao_imagem', DEFAULT_HOME_CONTENT.quoteImageId),
);
const quoteImageUrl = computed(() => buildImageUrl(quoteImageId.value, 800));
const quoteImageSrcset = computed(() => buildSrcset(quoteImageId.value));

// Load name from sessionStorage on mount
onMounted(() => {
  const savedName = sessionStorage.getItem('contactUserName');
  if (savedName) {
    contactName.value = savedName;
  }
  loadHomeConfig();
});

// Save name to sessionStorage when it changes
watch(contactName, (newName) => {
  if (newName.trim()) {
    sessionStorage.setItem('contactUserName', newName);
  }
});

function getRandomCompliment() {
  const index = Math.floor(Math.random() * CONTACT_COMPLIMENTS.length);
  return CONTACT_COMPLIMENTS[index];
}

function openContactModal(vendor) {
  selectedVendor.value = vendor;
  contactNameError.value = '';
  showContactNameModal.value = true;
}

function sendContactMessage() {
  const sanitizedName = contactName.value?.trim();

  if (!sanitizedName) {
    contactNameError.value = 'Por favor, informe seu nome.';
    return;
  }

  contactNameError.value = '';

  // Mensagem especial de aniversário
  const SPECIAL_TRIGGER_NAME = 'Hoje é meu aniversário!!!';
  const SPECIAL_BIRTHDAY_MESSAGE =
    'Feliz aniversáio, família, me diverti muito fazendo esse presente, que só não é meu favorito porque tem o quadro de Pretty Little Liars. Espero que ajude você a ficar com muitos dinheiros e você pague meu apartamento. Parabéns <3';

  if (sanitizedName === SPECIAL_TRIGGER_NAME) {
    const phone = '5511970489098';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(SPECIAL_BIRTHDAY_MESSAGE)}`;
    window.open(url, '_blank');
    closeContactModal();
    return;
  }

  const compliment = getRandomCompliment();
  const message = `Oi, meu nome é ${sanitizedName}. Eu vi seus produtos no site BeSBeauty (${compliment}) e tenho interesse!`;

  const encodedMessage = encodeURIComponent(message);
  const phone = '5511970489098';
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  window.open(url, '_blank');
  closeContactModal();
}

function closeContactModal() {
  showContactNameModal.value = false;
  contactNameError.value = '';
}

function openCatalog() {
  router.push({ name: 'catalog' });
}

function openSellerArea() {
  if (!sellerAreaEnabled) {
    router.push({ name: 'home' });
    return;
  }

  router.push({ name: 'seller-login' });
}

function handleHeroAction() {
  openCatalog();
}
</script>
