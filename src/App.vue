<template>
  <div class="min-h-screen relative overflow-hidden">

    <nav class="fixed w-full z-50 top-0 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 py-4 mt-4 glass rounded-2xl flex justify-between items-center">
        
        <router-link to="/" class="flex items-center">
          <img 
            src="./assets/logo-winsman.png" 
            alt="Logo Winsman" 
            class="w-40 h-[1.8rem] object-contain hover:opacity-80 transition duration-300" 
          />
        </router-link>

        <div class="hidden md:flex space-x-8">
          <router-link to="/" class="hover:text-indigo-400 transition"
            active-class="text-indigo-500">Beranda</router-link>
          <router-link to="/katalog" class="hover:text-indigo-400 transition"
            active-class="text-indigo-500">Katalog</router-link>
          <router-link to="/profil" class="hover:text-indigo-400 transition"
            active-class="text-indigo-500">Profil</router-link>
          <router-link to="/kontak" class="hover:text-indigo-400 transition"
            active-class="text-indigo-500">Kontak</router-link>
          <router-link to="/faq" class="hover:text-indigo-400 transition"
            active-class="text-indigo-500">FAQ</router-link>
        </div>
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

<style>
/* Animasi transisi halaman agar lebih mulus */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>