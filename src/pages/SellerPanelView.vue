<template>
  <div class="min-h-screen flex flex-col">
    <AppHeader
      title="Painel do Vendedor"
      :show-back-btn="true"
      @back="goHome"
      :show-catalog-btn="false"
    />

    <main class="flex-1">
      <SellerPanel />
    </main>

    <AppFooter layout="simple" />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

import AppFooter from '../components/AppFooter.vue';
import AppHeader from '../components/AppHeader.vue';
import SellerPanel from '../components/SellerPanel.vue';

const router = useRouter();

const goHome = () => {
  if (window.history.length > 1) {
    router.back(); // volta pra tela anterior
  } else {
    router.push({ name: 'home' }); // fallback
  }
};
</script>
