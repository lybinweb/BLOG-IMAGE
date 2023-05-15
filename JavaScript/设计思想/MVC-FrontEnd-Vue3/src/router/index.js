import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/Home.vue'
import DetailView from '../views/Detail.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: DetailView
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
