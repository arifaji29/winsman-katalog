// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Beranda from '../views/Beranda.vue'

const routes = [
  { path: '/', name: 'Beranda', component: Beranda },
  { path: '/katalog', name: 'Katalog', component: () => import('../views/Katalog.vue') },
  { path: '/profil', name: 'Profil', component: () => import('../views/Profil.vue') },
  { path: '/kontak', name: 'Kontak', component: () => import('../views/Kontak.vue') },
  { path: '/faq', name: 'Faq', component: () => import('../views/Faq.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router