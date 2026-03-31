<template>
  <div class="flex flex-col items-center min-h-screen pb-10">
    
    <div class="text-center mb-10">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Katalog <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">Desain</span></h1>
      <p class="text-gray-400 max-w-2xl mx-auto">Temukan inspirasi desain terbaik atau wujudkan kreasimu sendiri bersama Winsman.</p>
    </div>

    <div class="flex flex-wrap justify-center gap-2 md:gap-4 mb-10 glass p-2 rounded-full">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
        :class="activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      <transition-group name="fade" mode="out-in">
        <div 
          v-for="item in filteredProducts" 
          :key="item.id"
          @click="openModal(item)"
          class="glass rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-2 transition duration-300 flex flex-col"
        >
          <div class="relative aspect-square overflow-hidden">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            <div class="absolute inset-0 bg-linear-to-t from-dark to-transparent opacity-60"></div>
          </div>
          <div class="p-5 flex-1 flex flex-col justify-end -mt-12 relative z-10">
            <h3 class="text-lg font-bold text-white">{{ item.title }}</h3>
            <p class="text-indigo-400 font-semibold">{{ item.price }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <div v-if="filteredProducts.length === 0" class="text-center py-20 w-full glass rounded-3xl mt-6">
      <p class="text-gray-400 text-lg">Belum ada desain di kategori ini.</p>
    </div>

    <div 
      v-if="selectedProduct" 
      class="fixed inset-0 z-60 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm"
      @click.self="closeModal"
    >
      <div class="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col md:flex-row relative animate-fade-in-up">
        
        <button @click="closeModal" class="absolute top-4 right-4 z-10 p-2 bg-dark/50 hover:bg-indigo-600 text-white rounded-full transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div class="md:w-1/2">
          <img :src="selectedProduct.image" :alt="selectedProduct.title" class="w-full h-full object-cover rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none aspect-square md:aspect-auto" />
        </div>

        <div class="p-8 md:w-1/2 flex flex-col justify-center">
          <span class="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-2">{{ getCategoryName(selectedProduct.category) }}</span>
          <h2 class="text-3xl font-extrabold text-white mb-4">{{ selectedProduct.title }}</h2>
          <p class="text-gray-300 mb-6 leading-relaxed">{{ selectedProduct.description }}</p>
          
          <div class="mb-8">
            <span class="block text-sm text-gray-400 mb-1">Estimasi Harga</span>
            <span class="text-2xl font-bold text-purple-400">{{ selectedProduct.price }}</span>
          </div>

          <button class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition duration-300 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            Tanya Admin via WhatsApp
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// --- State Management ---
const activeTab = ref('hits') // Tab default yang aktif
const selectedProduct = ref(null) // Menyimpan data produk yang sedang diklik

// Definisi Tabs
const tabs = [
  { id: 'hits', name: 'Desain Hits' },
  { id: 'signature', name: 'Desain Signature' },
  { id: 'customer', name: 'Desain Kreasi Customer' }
]

// --- Mock Data Produk ---
// (Nanti bisa diganti dengan data dari Supabase/Database)
const products = ref([
  // Kategori: Hits
  {
    id: 1,
    category: 'hits',
    title: 'Urban Streetwear Vol.1',
    description: 'Desain ala streetwear kekinian dengan paduan tipografi tebal dan elemen grafis minimalis. Sangat cocok untuk gaya kasual sehari-hari.',
    price: 'Mulai Rp 120.000',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    category: 'hits',
    title: 'Retro Aesthetic 90s',
    description: 'Bawa kembali vibe tahun 90-an dengan warna neon dan elemen retro-wave. Dicetak menggunakan sablon plastisol kualitas tinggi.',
    price: 'Mulai Rp 125.000',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800'
  },
  // Kategori: Signature
  {
    id: 3,
    category: 'signature',
    title: 'Winsman Dark Edition',
    description: 'Edisi eksklusif Winsman dengan sentuhan elemen misterius dan elegan. Hanya diproduksi terbatas dengan bahan Cotton Combed 24s Premium.',
    price: 'Mulai Rp 150.000',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    category: 'signature',
    title: 'Winsman Minimalist Logo',
    description: 'Kaos polo/oblong dengan bordir atau sablon logo kecil Winsman yang elegan di dada kiri. Cocok untuk tampilan rapi dan santai.',
    price: 'Mulai Rp 140.000',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'
  },
  // Kategori: Kreasi Customer
  {
    id: 5,
    category: 'customer',
    title: 'Kaos Komunitas Sepeda',
    description: 'Hasil kreasi dari komunitas Gowes Santai. Menggunakan bahan drifit yang menyerap keringat dengan sablon sublimasi full color.',
    price: 'Custom (Sesuai Qty)',
    image: 'https://images.unsplash.com/photo-1529336953128-a85760f58cb5?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    category: 'customer',
    title: 'Desain Ilustrasi Anime',
    description: 'Karya original ilustrasi dari salah satu customer kami yang diaplikasikan ke kaos hitam pekat. Detail sablon sangat presisi.',
    price: 'Custom (Sesuai Qty)',
    image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800'
  }
])

// --- Logika dan Fungsi ---

// Filter produk berdasarkan tab yang aktif
const filteredProducts = computed(() => {
  return products.value.filter(product => product.category === activeTab.value)
})

// Dapatkan nama kategori untuk ditampilkan di Modal
const getCategoryName = (categoryId) => {
  const tab = tabs.find(t => t.id === categoryId)
  return tab ? tab.name : ''
}

// Buka modal dan set data produk
const openModal = (item) => {
  selectedProduct.value = item
  document.body.style.overflow = 'hidden' // Mencegah background scrolling
}

// Tutup modal
const closeModal = () => {
  selectedProduct.value = null
  document.body.style.overflow = 'auto' // Mengembalikan background scrolling
}
</script>

<style scoped>
/* Transisi untuk list grid saat tab berganti */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

/* Animasi untuk modal popup masuk dari bawah */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-fade-in-up {
  animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>