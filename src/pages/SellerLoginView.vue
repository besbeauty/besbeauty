<template>
  <div
    :class="
      theme === 'white' ? 'bg-white text-black' : 'bg-[#0a0c10] text-white'
    "
    class="w-full min-h-screen flex flex-col"
  >
    <!-- HEADER -->
    <AppHeader
      title="Painel do Vendedor"
      subtitle
      :show-back-btn="true"
      @back="goHome"
    />

    <!-- CONTEÚDO -->
    <div class="flex-1 flex items-center justify-center px-4">
      <div class="w-full max-w-md">
        <!-- TEXTO PRINCIPAL -->
        <div class="mb-8 text-center">
          <p
            :class="theme === 'white' ? 'text-amber-700' : 'text-pink-400'"
            class="text-lg font-bold mb-2"
          >
            🔒 Acesso restrito
          </p>

          <p
            :class="theme === 'white' ? 'text-gray-600' : 'text-gray-400'"
            class="text-sm"
          >
            Informe a senha para acessar o painel.
          </p>
        </div>

        <!-- FORM -->
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label
              :class="theme === 'white' ? 'text-amber-700' : 'text-pink-400'"
              class="block text-sm font-semibold mb-2"
            >
              Senha
            </label>

            <input
              v-model="password"
              type="password"
              placeholder="Digite sua senha"
              :class="[
                theme === 'white'
                  ? 'bg-gray-100 text-black border-amber-200'
                  : 'bg-[#2a3040] text-white border-pink-800',
                'w-full px-4 py-2 border rounded-lg outline-none focus:ring-2',
                theme === 'white'
                  ? 'focus:ring-amber-500'
                  : 'focus:ring-pink-500',
              ]"
            />
          </div>

          <div
            v-if="error"
            class="p-3 rounded-lg bg-red-100 text-red-700 text-sm"
          >
            {{ error }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            :class="[
              theme === 'white'
                ? 'bg-amber-600 text-white hover:bg-amber-700 disabled:bg-amber-400'
                : 'bg-pink-600 text-white hover:bg-pink-700 disabled:bg-pink-400',
              'w-full py-2 rounded-lg font-semibold transition-colors',
            ]"
          >
            {{ isLoading ? 'Verificando...' : 'Entrar' }}
          </button>
        </form>

        <!-- VOLTAR -->
        <div
          class="mt-6 pt-6 border-t text-center"
          :class="theme === 'white' ? 'border-gray-200' : 'border-gray-700'"
        >
          <button
            @click="goHome"
            class="text-sm transition-colors"
            :class="
              theme === 'white'
                ? 'text-amber-600 hover:text-amber-700'
                : 'text-pink-400 hover:text-pink-300'
            "
          >
            ← Voltar à página inicial
          </button>
        </div>
      </div>
    </div>

    <!-- FOOTER -->
    <AppFooter layout="simple" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTheme } from '../composables/useTheme';
import { useSeller } from '../composables/useSeller';

import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';

const router = useRouter();
const { theme } = useTheme();
const { login } = useSeller();

const password = ref('');
const error = ref('');
const isLoading = ref(false);

const handleLogin = async () => {
  error.value = '';

  if (!password.value) {
    error.value = 'Por favor, digite a senha.';
    return;
  }

  isLoading.value = true;

  await new Promise((resolve) => setTimeout(resolve, 500));

  const success = login(password.value);

  if (success) {
    password.value = '';
    router.push({ name: 'seller-panel' });
  } else {
    error.value = 'Senha incorreta. Tente novamente.';
    password.value = '';
  }

  isLoading.value = false;
};

const goHome = () => {
  router.push({ name: 'home' });
};
</script>
