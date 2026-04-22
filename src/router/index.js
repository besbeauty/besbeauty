import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../pages/HomeView.vue';
import CatalogView from '../pages/CatalogView.vue';
import SellerLoginView from '../pages/SellerLoginView.vue';
import SellerPanelView from '../pages/SellerPanelView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: CatalogView,
    },
    {
      path: '/seller-login',
      name: 'seller-login',
      component: SellerLoginView,
    },
    {
      path: '/seller-panel',
      name: 'seller-panel',
      component: SellerPanelView,
      beforeEnter: (to, from, next) => {
        const isAuthenticated = sessionStorage.getItem('sellerAuth') === 'true';

        if (isAuthenticated) {
          next();
        } else {
          next({ name: 'seller-login' });
        }
      },
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
