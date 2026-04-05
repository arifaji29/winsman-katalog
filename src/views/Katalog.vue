<template>
  <div class="flex flex-col items-center min-h-screen pb-10 relative">
    
    <div class="text-center mb-10">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Katalog <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">Desain</span></h1>
      <p class="text-gray-400 max-w-2xl mx-auto">Temukan inspirasi desain terbaik atau wujudkan kreasimu sendiri bersama Winsman.</p>
    </div>

    <!-- Navigasi Tabs Dinamis -->
    <div class="flex justify-center w-full max-w-5xl mb-10">
      <div class="flex flex-wrap justify-center gap-2 glass p-2 rounded-full">
        <button 
          v-for="tab in dynamicTabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm md:text-base"
          :class="activeTab === tab.id ? 'bg-indigo-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'"
        >
          {{ tab.name }}
        </button>
      </div>
    </div>

    <!-- Status Loading -->
    <div v-if="isLoadingData" class="text-center py-20 w-full glass rounded-3xl mb-6">
      <p class="text-indigo-400 text-xl font-bold animate-pulse">Memuat Katalog...</p>
    </div>

    <!-- Grid List Produk -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      <transition-group name="fade" mode="out-in">
        <div 
          v-for="item in filteredProducts" 
          :key="item.id"
          @click="openModal(item)"
          class="glass rounded-2xl overflow-hidden cursor-pointer group hover:-translate-y-2 transition duration-300 flex flex-col"
        >
          <!-- Bagian Gambar (Tanpa Overlay Hitam) -->
          <div class="relative aspect-square overflow-hidden bg-dark/50">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
          </div>
          
          <!-- Bagian Teks (Di bawah gambar) -->
          <div class="p-5 flex-1 flex flex-col justify-start">
            <h3 class="text-lg font-bold text-white mb-1">{{ item.title }}</h3>
            <p class="text-indigo-400 font-semibold">{{ item.price }}</p>
          </div>
        </div>
      </transition-group>
    </div>

    <div v-if="!isLoadingData && filteredProducts.length === 0" class="text-center py-20 w-full glass rounded-3xl mt-6">
      <p class="text-gray-400 text-lg">Belum ada desain di kategori ini.</p>
    </div>

    <!-- MODAL: DETAIL PRODUK -->
    <div v-if="selectedProduct" class="fixed inset-0 z-60 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm" @click.self="closeModal">
      <div class="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col md:flex-row relative animate-fade-in-up">
        <button @click="closeModal" class="absolute top-4 right-4 z-10 p-2 bg-dark/50 hover:bg-indigo-600 text-white rounded-full transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        <div class="md:w-1/2 bg-dark/50">
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
          <a href="https://wa.me/6289673433900" target="_blank" class="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition duration-300 shadow-[0_0_15px_rgba(79,70,229,0.4)] text-center block">
            Tanya Admin via WhatsApp
          </a>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'

const activeTab = ref('hits')
const selectedProduct = ref(null)
const products = ref([])
const isLoadingData = ref(true)

// MENGAMBIL DATA DARI DATABASE
const fetchProducts = async () => {
  try {
    isLoadingData.value = true
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })

    if (error) throw error
    products.value = data
  } catch (error) {
    console.error('Gagal mengambil data:', error.message)
  } finally {
    isLoadingData.value = false
  }
}

onMounted(() => {
  fetchProducts()
})

// LOGIKA TAB DINAMIS
const dynamicTabs = computed(() => {
  const defaults = [
    { id: 'hits', name: 'Desain Hits' },
    { id: 'signature', name: 'Desain Signature' },
    { id: 'customer', name: 'Desain Kreasi Customer' }
  ]
  
  const existingIds = products.value.map(p => p.category)
  const uniqueIds = [...new Set(existingIds)]

  const newCategories = uniqueIds
    .filter(id => !['hits', 'signature', 'customer'].includes(id))
    .map(id => ({ id: id, name: id })) 

  return [...defaults, ...newCategories]
})

const filteredProducts = computed(() => {
  return products.value.filter(product => product.category === activeTab.value)
})

const getCategoryName = (categoryId) => {
  const tab = dynamicTabs.value.find(t => t.id === categoryId)
  return tab ? tab.name : categoryId
}

const openModal = (item) => {
  selectedProduct.value = item
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  selectedProduct.value = null
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

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