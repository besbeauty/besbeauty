<template>
  <footer
    :class="
      theme === 'white'
        ? 'bg-[#f3f3f3]'
        : 'bg-[#0a0c10]'
    "
    class="app-footer flex flex-col items-center gap-8 w-full py-8 px-6"
  >
    <!-- Home layout with contacts -->
    <template v-if="layout === 'home'">
      <h3
        :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
        class="font-headline text-2xl tracking-wider uppercase"
      >
        Nossos Contatos
      </h3>
      <div class="grid grid-cols-2 gap-4 w-full max-w-sm">
        <ContactCard
          name="Sarah"
          phone="(11) 94775-8048"
          :theme="theme"
          @click="$emit('contact-click', 'sarah')"
        />
        <ContactCard
          name="Bruna"
          phone="(11) 97048-9098"
          :theme="theme"
          @click="$emit('contact-click', 'bruna')"
        />
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
    </template>

    <!-- Divider -->
    <div
      class="w-full h-[1px] max-w-screen-xl"
      :class="theme === 'white' ? 'bg-gray-300' : 'bg-gray-700'"
    ></div>

    <!-- Footer message -->
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
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme';
import { useMessages } from '../composables/useMessages';
import ContactCard from './ContactCard.vue';

defineProps<{
  layout?: 'home' | 'simple';
}>();

defineEmits<{
  'contact-click': [name: string];
}>();

const { theme } = useTheme();
const { randomMessage } = useMessages();
</script>
