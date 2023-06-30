import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: '/login',
    // name: 'main',
    // component:()=>import('@/App.vue')
  },
  {
    path: '/service',
    component:()=>import('@/components/service/Layout.vue'),
    meta: { requireAuth: true, type: 'service' },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/components/Login.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/components/patient/Layout.vue'),
    meta: { requireAuth: true, type: 'patient' },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
