<template>
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
        @click="handleLogoClick"
      />

      <!-- Center Title -->
      <div class="flex flex-col items-center leading-none">
        <span
          v-if="subtitle"
          :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
          class="font-headline text-xs md:text-sm tracking-wider uppercase"
        >
          B&S Beauty
        </span>
        <span
          :class="theme === 'white' ? 'text-amber-600' : 'text-pink-600'"
          class="font-headline text-lg md:text-2xl lg:text-3xl tracking-wider uppercase"
        >
          {{ title }}
        </span>
      </div>

      <!-- Right Buttons -->
      <div class="flex items-center gap-4">
        <button
          v-if="showCatalogBtn"
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
          v-if="showSellerBtn"
          @click="$emit('open-seller')"
          :class="
            theme === 'white'
              ? 'bg-amber-100 text-amber-700'
              : 'bg-pink-900/40 text-pink-300'
          "
          class="p-3 rounded-full shadow transition-colors"
          title="Area de vendedores"
          aria-label="Abrir area de vendedores"
        >
          <span class="material-symbols-outlined text-lg">storefront</span>
        </button>
        <button
          v-if="showBackBtn"
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
</template>

<script setup lang="ts">
import { useTheme } from '../composables/useTheme';
import { useCloudinary } from '../composables/useCloudinary';

const props = defineProps<{
  title: string;
  subtitle?: boolean;
  showCatalogBtn?: boolean;
  showSellerBtn?: boolean;
  showBackBtn?: boolean;
}>();

const emit = defineEmits<{
  'open-catalog': [];
  'open-seller': [];
  back: [];
}>();

const { theme, toggleTheme } = useTheme();
const { logoUrl } = useCloudinary();

function handleLogoClick() {
  if (props.showBackBtn) {
    emit('back');
  }
}
</script>
