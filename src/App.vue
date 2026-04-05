<template>
  <div class="min-h-screen relative overflow-hidden">

    <nav class="fixed w-full z-50 top-0 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 py-4 mt-4 relative">
        <div class="glass rounded-2xl flex justify-between items-center px-6 py-4">
          
          <router-link to="/" class="flex items-center" @click="closeMobileMenu">
            <img 
              src="./assets/logo-winsman.png" 
              alt="Logo Winsman" 
              class="w-40 h-[1.8rem] object-contain hover:opacity-80 transition duration-300" 
            />
          </router-link>

          <!-- Menu Desktop -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link to="/" class="hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">Beranda</router-link>
            <router-link to="/katalog" class="hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">Katalog</router-link>
            <router-link to="/profil" class="hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">Profil</router-link>
            <router-link to="/kontak" class="hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">Kontak</router-link>
            <router-link to="/faq" class="hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">FAQ</router-link>
            
            <div class="w-px h-6 bg-white/20"></div> <!-- Garis pemisah -->

            <!-- Conditional Menu Desktop -->
            <template v-if="session">
              <!-- Tombol Mode Edit (Hanya Muncul Jika Login) -->
              <button 
                @click="isEditMode = !isEditMode" 
                class="px-4 py-2 rounded-full font-bold transition duration-300 text-sm"
                :class="isEditMode ? 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-white/10 text-amber-400 border border-amber-500/50 hover:bg-white/20'"
              >
                {{ isEditMode ? 'Mode Edit: ON' : 'Mode Edit: OFF' }}
              </button>

              <router-link to="/admin" class="hover:text-indigo-400 transition text-indigo-300" active-class="text-indigo-500 font-bold">Admin</router-link>
              <button @click="handleLogout" class="px-4 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white rounded-full font-bold transition duration-300 text-sm">
                Logout
              </button>
            </template>
            <template v-else>
              <router-link to="/login" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition duration-300 text-sm shadow-md">
                Login
              </router-link>
            </template>
          </div>

          <!-- Tombol Hamburger Mobile -->
          <button @click="toggleMobileMenu" class="md:hidden text-white focus:outline-none p-1">
            <svg v-if="!isMobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <!-- Menu Dropdown Mobile -->
        <transition name="slide-fade">
          <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-6 right-6 mt-2 glass rounded-2xl p-5 flex flex-col space-y-4 shadow-2xl">
            <router-link to="/" @click="closeMobileMenu" class="text-lg hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">Beranda</router-link>
            <div class="w-full h-px bg-white/10"></div>
            <router-link to="/katalog" @click="closeMobileMenu" class="text-lg hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">Katalog</router-link>
            <div class="w-full h-px bg-white/10"></div>
            <router-link to="/profil" @click="closeMobileMenu" class="text-lg hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">Profil</router-link>
            <div class="w-full h-px bg-white/10"></div>
            <router-link to="/kontak" @click="closeMobileMenu" class="text-lg hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">Kontak</router-link>
            <div class="w-full h-px bg-white/10"></div>
            <router-link to="/faq" @click="closeMobileMenu" class="text-lg hover:text-indigo-400 transition" active-class="text-indigo-500 font-bold">FAQ</router-link>
            
            <div class="w-full h-px bg-white/20"></div>
            
            <!-- Conditional Menu Mobile -->
            <template v-if="session">
              <!-- Tombol Mode Edit Mobile -->
              <button 
                @click="isEditMode = !isEditMode" 
                class="text-left text-lg font-bold transition flex items-center justify-between"
                :class="isEditMode ? 'text-amber-400' : 'text-amber-400/70 hover:text-amber-400'"
              >
                <span>Mode Edit</span>
                <span class="text-sm px-2 py-1 rounded font-black" :class="isEditMode ? 'bg-amber-500 text-white' : 'bg-white/10 text-amber-400'">{{ isEditMode ? 'ON' : 'OFF' }}</span>
              </button>

              <router-link to="/admin" @click="closeMobileMenu" class="text-lg hover:text-indigo-400 transition text-indigo-400 font-bold" active-class="text-indigo-500">Dashboard Admin</router-link>
              <button @click="handleLogout" class="text-left text-lg text-red-400 hover:text-red-300 font-bold transition">
                Logout
              </button>
            </template>
            <template v-else>
               <router-link to="/login" @click="closeMobileMenu" class="text-lg hover:text-indigo-400 transition text-indigo-400 font-bold" active-class="text-indigo-500">Login Admin</router-link>
            </template>
          </div>
        </transition>
      </div>
    </nav>

    <main class="pt-32 pb-12 px-6 max-w-7xl mx-auto relative z-10">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue' // Tambahkan provide di sini
import { useRouter } from 'vue-router'
import { supabase } from './supabase'

const router = useRouter()
const isMobileMenuOpen = ref(false)
const session = ref(null) 

// --- STATUS MODE EDIT GLOBAL ---
const isEditMode = ref(false)
provide('isEditMode', isEditMode) // Mengirimkan status isEditMode agar bisa dibaca oleh Halaman Profil (dan halaman lainnya nanti)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session
  })

  supabase.auth.onAuthStateChange((_event, _session) => {
    session.value = _session
    // Opsional: Matikan mode edit otomatis jika user logout
    if (!_session) isEditMode.value = false 
  })
})

const handleLogout = async () => {
  await supabase.auth.signOut()
  closeMobileMenu() 
  router.push('/login') 
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-15px);
  opacity: 0;
}
</style>