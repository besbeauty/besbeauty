<template>
  <div class="w-full min-h-screen overflow-x-hidden">
    <header
      :class="theme === 'white' ? 'bg-[#f3f3f3]' : 'bg-[#0a0c10]'"
      class="app-header w-full"
    >
      <div class="flex justify-between items-center px-6 py-4">
        <!-- Logo -->
        <img
          :src="logoUrl"
          alt="B&S Beauty Logo"
          class="h-20 w-20 object-contain cursor-pointer transition-opacity hover:opacity-80"
        />

        <!-- Center Title -->
        <div class="flex flex-col items-center leading-none">
          <span
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
            class="font-headline text-lg md:text-2xl lg:text-3xl tracking-wider uppercase"
          >
            B&S Beauty
          </span>
        </div>

        <!-- Right Buttons -->
        <div class="flex items-center gap-4">
          <button
            @click="$emit('open-catalog')"
            :class="
              theme === 'white'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-pink-900/40 text-pink-300'
            "
            class="p-3 rounded-full shadow transition-colors"
          >
            <span class="material-symbols-outlined text-lg">collections</span>
          </button>
          <button
            @click="toggleTheme"
            :class="
              theme === 'white'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-pink-900/40 text-pink-300'
            "
            class="p-3 rounded-full shadow transition-colors"
          >
            <span class="material-symbols-outlined text-lg">{{
              theme === 'white' ? 'light_mode' : 'dark_mode'
            }}</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="w-full max-w-screen-xl px-8 mx-auto">
      <!-- Hero -->
      <section class="mb-12 rounded-lg min-h-[420px] md:min-h-auto">
        <div class="flex flex-col md:flex-row items-center gap-6 md:gap-12">
          <div class="w-full md:w-auto flex-1">
            <h2 class="font-headline text-4xl md:text-6xl leading-tight mb-6">
              Perfumes importados com preço acessível
            </h2>
            <p
              :class="theme === 'white' ? 'text-black' : 'text-zinc-100'"
              class="mb-10 max-w-lg leading-relaxed"
            >
              Explore uma curadoria exclusiva das fragrâncias mais desejadas do
              mundo. O luxo que você merece, agora ao seu alcance com a
              autenticidade garantida pela B&S BEAUTY.
            </p>
            <div class="flex flex-wrap gap-4">
              <button
                @click="$emit('open-catalog')"
                :class="
                  theme === 'white'
                    ? 'bg-amber-200 text-amber-900'
                    : 'bg-pink-600 text-black'
                "
                class="px-8 py-3 rounded-full font-bold uppercase text-sm hover:scale-105 transition-all shadow"
              >
                Ver catálogo
              </button>
            </div>
          </div>
          <div class="w-full md:w-auto flex justify-center md:justify-end">
            <div
              class="w-96 h-80 md:w-[450px] md:h-80 rounded-lg overflow-hidden"
            >
              <img
                :src="luxuryUrl"
                :srcset="luxurySrcset"
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
          <div class="flex flex-col items-center text-center">
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
                >language</span
              >
            </div>
            <h4 class="font-headline text-xl mb-2">Perfumes importados</h4>
            <p class="text-sm text-on-surface-variant">
              As maiores grifes internacionais diretamente para você.
            </p>
          </div>
          <div class="flex flex-col items-center text-center">
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
                >verified</span
              >
            </div>
            <h4 class="font-headline text-xl mb-2">Produtos originais</h4>
            <p class="text-sm text-on-surface-variant">
              Garantia absoluta de procedência e selo de autenticidade.
            </p>
          </div>
          <div class="flex flex-col items-center text-center">
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
                >local_shipping</span
              >
            </div>
            <h4 class="font-headline text-xl mb-2">Entrega Premium</h4>
            <p class="text-sm text-on-surface-variant">
              Logística ágil com embalagens preparadas para presente.
            </p>
          </div>
          <div class="flex flex-col items-center text-center">
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
                >lock</span
              >
            </div>
            <h4 class="font-headline text-xl mb-2">Compra Segura</h4>
            <p class="text-sm text-on-surface-variant">
              Ambiente criptografado e atendimento personalizado.
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
            Como adquirir sua fragrância
          </h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-surface rounded-2xl border">
            <span class="text-4xl font-headline text-primary/10">01</span>
            <div class="mt-4">
              <span class="material-symbols-outlined text-primary text-3xl mb-4"
                >menu_book</span
              >
              <h3 class="font-headline text-2xl mb-2">Escolha seu aroma</h3>
              <p class="text-on-surface-variant">
                Navegue pelo nosso catálogo digital e descubra as notas que mais
                combinam com sua personalidade.
              </p>
            </div>
          </div>
          <div class="p-6 bg-surface rounded-2xl border">
            <span class="text-4xl font-headline text-primary/10">02</span>
            <div class="mt-4">
              <span
                class="material-symbols-outlined text-secondary text-3xl mb-4"
                >chat</span
              >
              <h3 class="font-headline text-2xl mb-2">Atendimento VIP</h3>
              <p class="text-on-surface-variant">
                Chame nossos especialistas no WhatsApp para tirar dúvidas sobre
                fixação, projeção e disponibilidade.
              </p>
            </div>
          </div>
          <div class="p-6 bg-surface rounded-2xl border">
            <span class="text-4xl font-headline text-primary/10">03</span>
            <div class="mt-4">
              <span class="material-symbols-outlined text-primary text-3xl mb-4"
                >shopping_bag</span
              >
              <h3 class="font-headline text-2xl mb-2">Receba com Luxo</h3>
              <p class="text-on-surface-variant">
                Finalize seu pedido com segurança e receba sua caixa B&S Beauty
                no conforto do seu lar.
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
              :src="cocoUrl"
              :srcset="cocoSrcset"
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
                "O perfume é o acessório invisível, mas inesquecível de uma
                mulher."
              </h4>
              <p
                class="text-on-tertiary-fixed-variant text-sm tracking-widest font-bold uppercase"
              >
                — Coco Chanel
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Footer -->
    <footer
      :class="theme === 'white' ? 'bg-[#f3f3f3]' : 'bg-[#0a0c10]'"
      class="app-footer flex flex-col items-center gap-8"
    >
      <h3
        :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
        class="font-headline text-2xl tracking-wider uppercase"
      >
        Nossos Contatos
      </h3>
      <div class="grid grid-cols-2 gap-4 w-full max-w-sm">
        <button
          @click="openContactModal('sarah')"
          class="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer"
          :class="
            theme === 'white'
              ? 'bg-white hover:bg-amber-50'
              : 'bg-[#1a1f2a] hover:bg-pink-900/30'
          "
        >
          <span
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-400'"
            class="material-symbols-outlined"
            >call</span
          >
          <p
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
            class="text-xs font-semibold text-center"
          >
            Sarah
          </p>
          <p
            :class="theme === 'white' ? 'text-amber-700' : 'text-pink-200'"
            class="text-xs text-center"
          >
            (11) 94775-8048
          </p>
        </button>
        <button
          @click="openContactModal('bruna')"
          class="flex flex-col items-center gap-2 p-3 rounded-lg cursor-pointer"
          :class="
            theme === 'white'
              ? 'bg-white hover:bg-amber-50'
              : 'bg-[#1a1f2a] hover:bg-pink-900/30'
          "
        >
          <span
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-400'"
            class="material-symbols-outlined"
            >call</span
          >
          <p
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
            class="text-xs font-semibold text-center"
          >
            Bruna
          </p>
          <p
            :class="theme === 'white' ? 'text-amber-700' : 'text-pink-200'"
            class="text-xs text-center"
          >
            (11) 97048-9098
          </p>
        </button>
      </div>
      <div class="flex flex-col items-center gap-3 w-full max-w-sm">
        <h4
          :class="theme === 'white' ? 'text-amber-600' : 'text-pink-400'"
          class="text-sm font-semibold uppercase tracking-wider"
        >
          Redes Sociais
        </h4>
        <a
          href="https://instagram.com/bes_loja"
          target="_blank"
          class="flex items-center gap-2 p-3 rounded-lg w-full justify-center"
          :class="
            theme === 'white'
              ? 'bg-white hover:bg-amber-50'
              : 'bg-[#1a1f2a] hover:bg-pink-900/30'
          "
        >
          <span
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-400'"
            class="material-symbols-outlined"
            >people</span
          >
          <p
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
            class="text-sm"
          >
            @bes_loja
          </p>
        </a>
      </div>
      <div class="flex flex-col items-center gap-3 w-full max-w-sm">
        <h4
          :class="theme === 'white' ? 'text-amber-600' : 'text-pink-400'"
          class="text-sm font-semibold uppercase tracking-wider"
        >
          Atendemos em
        </h4>
        <div
          class="flex items-center gap-2 p-3 rounded-lg w-full justify-center"
          :class="theme === 'white' ? 'bg-white' : 'bg-[#1a1f2a]'"
        >
          <span
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-400'"
            class="material-symbols-outlined"
            >location_on</span
          >
          <p
            :class="theme === 'white' ? 'text-amber-600' : 'text-pink-300'"
            class="text-sm"
          >
            São Paulo
          </p>
        </div>
      </div>
      <div
        class="w-full h-[1px] max-w-screen-xl"
        :class="theme === 'white' ? 'bg-gray-300' : 'bg-gray-700'"
      ></div>
      <div class="text-center space-y-2">
        <p
          :class="theme === 'white' ? 'text-gray-700' : 'text-gray-300'"
          class="font-sans text-xs tracking-widest uppercase font-semibold"
        >
          2026 — Made by -A.
        </p>
        <p
          :class="theme === 'white' ? 'text-gray-500' : 'text-gray-500'"
          class="font-serif text-[11px] italic"
        >
          {{ randomMessage }}
        </p>
      </div>
    </footer>

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
import { inject, computed, ref, watch, onMounted } from 'vue';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale } from '@cloudinary/url-gen/actions/resize';

const emit = defineEmits(['open-catalog']);
const theme = inject('theme');
const toggleTheme = inject('toggleTheme');

// Messages for footer
const messages = [
  'Hey, bitches.',
  'Miss me?',
  'I see everything.',
  'Secrets have a way of coming out.',
  'You should be more careful.',
  'Did you really think no one was watching?',
  'Some secrets are meant to stay buried.',
  'Tick tock.',
  'The truth always finds a way.',
  'Careful who you trust.',
  'I know what you did.',
  "You can't hide forever.",
  'Every move you make... I see it.',
  "Lying is easy. Getting away with it isn't.",
  'Not everyone is who they seem.',
  'Do you feel watched yet?',
  'The game has already begun.',
  "You're closer to the truth than you think.",
  'But are you ready for it?',
  "Some puzzles aren't meant to be solved.",
  'Maybe the real question is... who is A?',
  'XOXO.',
];

const randomMessage = ref('');

function getRandomMessage() {
  const index = Math.floor(Math.random() * messages.length);
  return messages[index];
}

// Cloudinary setup
const CLOUD_NAME = 'dsxdphuim';
const cld = new Cloudinary({ cloud: { cloudName: CLOUD_NAME } });

function buildImageUrl(publicId, width) {
  return cld
    .image(publicId)
    .resize(scale().width(width))
    .format('auto')
    .quality('auto')
    .toURL();
}

// Images srcset
const imgWidths = [400, 600, 800, 1200];
const imgSizes = '(max-width:768px) 100vw, 50vw';

const logoUrl = computed(() => buildImageUrl('logo_crop_qoc5ff', 100));

const cocoUrl = computed(() => buildImageUrl('coco_chanel_vo3pwc', 800));
const cocoSrcset = computed(() =>
  imgWidths
    .map((w) => `${buildImageUrl('coco_chanel_vo3pwc', w)} ${w}w`)
    .join(', '),
);

const luxuryUrl = computed(() => buildImageUrl('luxury_perfumes_lknj5c', 800));
const luxurySrcset = computed(() =>
  imgWidths
    .map((w) => `${buildImageUrl('luxury_perfumes_lknj5c', w)} ${w}w`)
    .join(', '),
);

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
  '5511947758048', // Sarah
  '5511970489098', // Bruna
];

// Contact form state
const showContactNameModal = ref(false);
const contactName = ref('');
const contactNameError = ref('');
const selectedVendor = ref(null);

// Load name from localStorage on mount
onMounted(() => {
  const savedName = localStorage.getItem('contactUserName');
  if (savedName) {
    contactName.value = savedName;
  }
  // Set random message on mount
  randomMessage.value = getRandomMessage();
});

// Save name to localStorage when it changes
watch(contactName, (newName) => {
  if (newName.trim()) {
    localStorage.setItem('contactUserName', newName);
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
    const phone =
      selectedVendor.value === 'sarah' ? '5511947758048' : '5511970489098';
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(SPECIAL_BIRTHDAY_MESSAGE)}`;
    window.open(url, '_blank');
    closeContactModal();
    return;
  }

  const compliment = getRandomCompliment();
  const message = `Oi, meu nome é ${sanitizedName}. Eu vi seus produtos no site BeSBeauty (${compliment}) e tenho interesse!`;

  const encodedMessage = encodeURIComponent(message);
  const phone =
    selectedVendor.value === 'sarah' ? '5511947758048' : '5511970489098';
  const url = `https://wa.me/${phone}?text=${encodedMessage}`;

  window.open(url, '_blank');
  closeContactModal();
}

function closeContactModal() {
  showContactNameModal.value = false;
  contactNameError.value = '';
}
</script>
