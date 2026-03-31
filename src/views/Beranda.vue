<template>
  <div class="flex flex-col gap-10">
    
    <div class="relative w-full h-[60vh] min-h-100 rounded-3xl overflow-hidden glass group">
      
      <div 
        v-for="(slide, index) in slides" 
        :key="index"
        class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
        :class="currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'"
      >
        <div class="absolute inset-0 bg-dark/70 z-10"></div>
        <img :src="slide.image" alt="Winsman Promo" class="absolute inset-0 w-full h-full object-cover" />
        
        <div class="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight" v-html="slide.title"></h1>
          <p class="text-gray-300 max-w-2xl text-lg">{{ slide.subtitle }}</p>
          <button class="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition duration-300 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
            {{ slide.cta }}
          </button>
        </div>
      </div>

      <button 
        @click="prevSlide" 
        class="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-white/20 text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>
      <button 
        @click="nextSlide" 
        class="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full glass opacity-0 group-hover:opacity-100 transition duration-300 hover:bg-white/20 text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        <button 
          v-for="(_, index) in slides" 
          :key="index"
          @click="goToSlide(index)"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-indigo-500 w-8' : 'bg-white/50 hover:bg-white'"
        ></button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      <div class="glass p-8 rounded-2xl hover:-translate-y-2 transition duration-300 group">
        <h3 class="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition">Material Grade A</h3>
        <p class="text-gray-400 text-sm">Katun kombed kualitas ekspor yang nyaman dan awet dipakai harian.</p>
      </div>
      <div class="glass p-8 rounded-2xl hover:-translate-y-2 transition duration-300 group">
        <h3 class="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition">Sablon Tahan Lama</h3>
        <p class="text-gray-400 text-sm">Teknologi cetak modern memastikan warna tetap cerah dan tidak mudah pecah.</p>
      </div>
      <div class="glass p-8 rounded-2xl hover:-translate-y-2 transition duration-300 group">
        <h3 class="text-xl font-bold mb-3 text-white group-hover:text-pink-400 transition">Tanpa Minimum Order</h3>
        <p class="text-gray-400 text-sm">Bebas pesan walau hanya satu pcs dengan desain eksklusif Anda sendiri.</p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentSlide = ref(0)
let slideInterval = null

// Data untuk masing-masing slide (menggunakan gambar placeholder Unsplash bertema gelap/fashion)
const slides = ref([
  {
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1920',
    title: 'Kaos Custom, <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">Kualitas Premium.</span>',
    subtitle: 'Wujudkan desain impianmu dengan material terbaik dari Winsman.',
    cta: 'Pesan Sekarang'
  },
  {
    image: 'https://images.unsplash.com/photo-1529336953128-a85760f58cb5?auto=format&fit=crop&q=80&w=1920',
    title: 'Gaya Eksklusif, <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Tanpa Batas.</span>',
    subtitle: 'Kreasikan identitas brand, komunitas, atau gaya personal Anda.',
    cta: 'Lihat Katalog'
  },
  {
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1920',
    title: 'Teknologi Cetak <br /> <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Presisi Tinggi.</span>',
    subtitle: 'Warna lebih solid, detail lebih tajam, dan tahan lama.',
    cta: 'Pelajari FAQ'
  }
])

// Logika Navigasi Slider
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}

// Menjalankan auto-play saat komponen dimuat
onMounted(() => {
  slideInterval = setInterval(nextSlide, 5000) // Ganti otomatis setiap 5 detik
})

// Membersihkan interval saat komponen dihancurkan (pindah halaman)
onUnmounted(() => {
  clearInterval(slideInterval)
})
</script>