// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../supabase'
import Beranda from '../views/Beranda.vue'

const routes = [
  { path: '/', name: 'Beranda', component: Beranda },
  { path: '/katalog', name: 'Katalog', component: () => import('../views/Katalog.vue') },
  { path: '/profil', name: 'Profil', component: () => import('../views/Profil.vue') },
  { path: '/kontak', name: 'Kontak', component: () => import('../views/Kontak.vue') },
  { path: '/faq', name: 'Faq', component: () => import('../views/Faq.vue') },
  
  // Rute Baru untuk Login dan Admin
  { path: '/login', name: 'Login', component: () => import('../views/login.vue') },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: { requiresAuth: true } // Menandai bahwa rute ini butuh login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation Guard (Satpam Rute)
router.beforeEach(async (to, from, next) => {
  // Cek apakah ada sesi user yang sedang aktif di Supabase
  const { data: { session } } = await supabase.auth.getSession()

  if (to.meta.requiresAuth && !session) {
    // Jika mau ke halaman admin tapi belum login, lempar ke halaman login
    next('/login')
  } else if (to.path === '/login' && session) {
    // Jika sudah login tapi mencoba buka halaman login, lempar ke admin
    next('/admin')
  } else {
    // Selain itu, biarkan lewat
    next()
  }
})

export default router