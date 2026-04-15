<template>
  <div :class="rootClass">
    <HomeView v-if="view==='home'" @open-catalog="view='catalog'" />
    <CatalogView v-else @back="view='home'" />
  </div>
</template>

<script setup>
import { ref, computed, provide } from 'vue'
import HomeView from './HomeView.vue'
import CatalogView from './CatalogView.vue'

const view = ref('home')
const theme = ref('black') // default
function toggleTheme(){ theme.value = theme.value === 'black' ? 'white' : 'black' }
provide('theme', theme)
provide('toggleTheme', toggleTheme)

const rootClass = computed(()=> theme.value === 'white'
  ? 'min-h-screen bg-[#f3f3f3] text-black pb-6'
  : 'min-h-screen bg-[#0a0c10] text-white pb-6')
</script>

<style scoped>
/* minimal spacing handled by Tailwind classes in components */
</style>
