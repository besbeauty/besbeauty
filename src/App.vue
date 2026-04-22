<template>
  <div :class="rootClass">
    <RouterView />
  </div>
</template>

<script setup>
import { computed, provide, watch, ref } from 'vue';
import { RouterView } from 'vue-router';

const theme = ref('white'); // default
function toggleTheme() {
  theme.value = theme.value === 'black' ? 'white' : 'black';
}
provide('theme', theme);
provide('toggleTheme', toggleTheme);

// Update HTML root class for Tailwind dark mode
watch(
  theme,
  (newTheme) => {
    if (newTheme === 'black') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  { immediate: true },
);

const rootClass = computed(() =>
  theme.value === 'white'
    ? 'min-h-screen bg-[#f3f3f3] text-black pb-6'
    : 'min-h-screen bg-[#0a0c10] text-white pb-6',
);
</script>

<style scoped>
/* minimal spacing handled by Tailwind classes in components */
</style>
