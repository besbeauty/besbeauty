import { ref, computed } from 'vue';

const isAuthenticated = ref(false);

export function useSeller() {
  const getSellerPassword = () => {
    return import.meta.env.VITE_SELLER_PASSWORD || '';
  };

  const login = (password: string): boolean => {
    const correctPassword = getSellerPassword();

    if (!correctPassword) {
      console.error('Senha do vendedor não configurada');
      return false;
    }

    if (password === correctPassword) {
      isAuthenticated.value = true;
      sessionStorage.setItem('sellerAuth', 'true');
      return true;
    }

    return false;
  };

  const logout = () => {
    isAuthenticated.value = false;
    sessionStorage.removeItem('sellerAuth');
  };

  const checkAuth = () => {
    const auth = sessionStorage.getItem('sellerAuth');
    if (auth === 'true') {
      isAuthenticated.value = true;
      return true;
    }
    isAuthenticated.value = false;
    return false;
  };

  return {
    isAuthenticated: computed(() => isAuthenticated.value),
    login,
    logout,
    checkAuth,
  };
}
