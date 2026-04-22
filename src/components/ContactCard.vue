<template>
  <button
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
      {{ name }}
    </p>
    <p
      :class="theme === 'white' ? 'text-amber-700' : 'text-pink-200'"
      class="text-xs text-center"
    >
      {{ phone }}
    </p>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  name: string;
  phone: string;
  theme: string;
}>();
</script>
