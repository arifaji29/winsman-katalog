<template>
  <div class="flex flex-col items-center min-h-screen pb-10 relative">
    
    <!-- TOMBOL SIMPAN TEKS HEADER (Hanya muncul saat Mode Edit aktif) -->
    <transition name="fade">
      <div v-if="isEditMode" class="fixed bottom-10 right-6 md:right-10 z-100">
        <button @click="saveHeaderChanges" :disabled="isSubmittingHeader" class="px-6 md:px-8 py-4 bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white font-bold rounded-full shadow-[0_0_20px_rgba(22,163,74,0.5)] flex items-center gap-2 transition duration-300">
          <svg v-if="isSubmittingHeader" class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          {{ isSubmittingHeader ? 'Menyimpan...' : 'Simpan Teks Header' }}
        </button>
      </div>
    </transition>

    <!-- HEADER HALAMAN -->
    <div class="text-center mb-10 w-full max-w-4xl px-4 pt-12">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4 flex flex-col md:flex-row items-center justify-center gap-2 text-white">
        <template v-if="!isEditMode">
          {{ localContent.hero_title_1 }}
          <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">{{ localContent.hero_title_2 }}</span>
        </template>
        <template v-else>
          <input v-model="localContent.hero_title_1" class="bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
          <input v-model="localContent.hero_title_2" class="bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 text-center text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
        </template>
      </h1>

      <p v-if="!isEditMode" class="text-gray-400 max-w-2xl mx-auto">{{ localContent.hero_subtitle }}</p>
      <textarea v-else v-model="localContent.hero_subtitle" rows="2" class="w-full max-w-2xl mx-auto bg-dark/80 border border-indigo-500 rounded-xl p-3 text-center text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
    </div>

    <!-- TOMBOL TAMBAH PRODUK (Hanya di Mode Edit) -->
    <div v-if="isEditMode" class="w-full max-w-5xl px-4 mb-6 flex justify-center">
      <button @click="openAddModal" class="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition duration-300 flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" /></svg>
        Tambah Katalog Baru
      </button>
    </div>

    <!-- NAVIGASI TABS DINAMIS -->
    <div class="flex justify-center w-full max-w-5xl mb-10 px-4">
      <div class="flex flex-wrap justify-center gap-2 glass p-2 rounded-full border border-white/5">
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

    <!-- STATUS LOADING -->
    <div v-if="isLoadingData" class="text-center py-20 w-full glass rounded-3xl mb-6 border border-white/5">
      <p class="text-indigo-400 text-xl font-bold animate-pulse">Memuat Katalog...</p>
    </div>

    <!-- GRID LIST PRODUK -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-4 md:px-0">
      <transition-group name="fade" mode="out-in">
        <div 
          v-for="item in filteredProducts" 
          :key="item.id"
          @click="!isEditMode && openDetailModal(item)"
          class="glass rounded-2xl overflow-hidden group transition duration-300 flex flex-col border border-white/5"
          :class="!isEditMode ? 'cursor-pointer hover:-translate-y-2' : ''"
        >
          <!-- Gambar -->
          <div class="relative aspect-square overflow-hidden bg-dark/50">
            <img :src="item.image" :alt="item.title" class="w-full h-full object-cover transition duration-500" :class="!isEditMode ? 'group-hover:scale-110' : ''" />
            <span v-if="isEditMode" class="absolute top-3 right-3 bg-dark/80 text-indigo-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
              {{ formatCategoryDisplay(item.category) }}
            </span>
          </div>
          
          <!-- Teks -->
          <div class="p-5 flex-1 flex flex-col justify-start">
            <h3 class="text-lg font-bold text-white mb-1">{{ item.title }}</h3>
            <p class="text-indigo-400 font-semibold text-sm">{{ item.price }}</p>
            
            <!-- TOMBOL EDIT & HAPUS (Hanya di Mode Edit) -->
            <div v-if="isEditMode" class="flex gap-2 mt-4 pt-4 border-t border-white/10">
              <button @click.stop="openEditModal(item)" class="flex-1 py-2 bg-white/10 hover:bg-indigo-600 text-white text-sm font-bold rounded-lg transition duration-300">
                Edit
              </button>
              <button @click.stop="deleteProduct(item.id)" class="flex-1 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-sm font-bold rounded-lg transition duration-300">
                Hapus
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <div v-if="!isLoadingData && filteredProducts.length === 0" class="text-center py-20 w-full glass rounded-3xl mt-6 border border-white/5">
      <p class="text-gray-400 text-lg">Belum ada desain di kategori ini.</p>
    </div>

    <!-- ========================================== -->
    <!-- MODAL 1: DETAIL PRODUK (TAMPILAN PUBLIK) -->
    <!-- ========================================== -->
    <div v-if="isDetailModalOpen" class="fixed inset-0 z-60 flex items-center justify-center p-4 bg-dark/80 backdrop-blur-sm" @click.self="closeDetailModal">
      <div class="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl flex flex-col md:flex-row relative animate-fade-in-up border border-white/10">
        <button @click="closeDetailModal" class="absolute top-4 right-4 z-10 p-2 bg-dark/50 hover:bg-indigo-600 text-white rounded-full transition duration-300">
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

    <!-- ========================================== -->
    <!-- MODAL 2: FORM TAMBAH/EDIT KATALOG (ADMIN) -->
    <!-- ========================================== -->
    <div v-if="isFormModalOpen" class="fixed inset-0 z-70 flex items-center justify-center p-4 bg-dark/90 backdrop-blur-md" @click.self="closeFormModal">
      <div class="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 relative animate-fade-in-up border border-white/10">
        
        <button @click="closeFormModal" class="absolute top-6 right-6 z-10 p-2 bg-dark/50 hover:bg-red-500 text-white rounded-full transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 class="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
          {{ isEditingProduct ? 'Edit Katalog' : 'Tambah Katalog Baru' }}
        </h2>

        <form @submit.prevent="submitProductForm" class="flex flex-col gap-5">
          <div class="flex flex-col md:flex-row gap-5 relative">
            <div class="flex-1">
              <label class="block text-sm text-gray-400 mb-2">Nama Desain</label>
              <input v-model="formData.title" type="text" required class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition">
            </div>
            
            <!-- BAGIAN DROPDOWN KATEGORI -->
            <div class="flex-1 relative">
              <label class="block text-sm text-gray-400 mb-2">Kategori</label>
              
              <div v-if="!isAddingNewCategory" class="relative">
                <button type="button" @click="isCategoryDropdownOpen = !isCategoryDropdownOpen" class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 flex justify-between items-center text-left transition">
                  <span class="truncate pr-2">{{ formatCategoryDisplay(formData.category) }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                </button>

                <div v-if="isCategoryDropdownOpen" class="fixed inset-0 z-40" @click="isCategoryDropdownOpen = false"></div>

                <div v-if="isCategoryDropdownOpen" class="absolute z-50 w-full mt-2 bg-slate-800 border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                  <ul class="max-h-52 overflow-y-auto custom-scrollbar">
                    <li v-for="cat in uniqueCategories" :key="cat" class="hover:bg-indigo-600 transition border-b border-white/5 last:border-none flex items-center justify-between group">
                      <div @click="selectCategory(cat)" class="px-4 py-3 cursor-pointer flex-1 text-white truncate">{{ formatCategoryDisplay(cat) }}</div>
                      
                      <div v-if="!['hits', 'signature', 'customer'].includes(cat)" class="flex gap-1 pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button type="button" @click.stop="editCategoryName(cat)" class="p-1.5 text-blue-300 hover:text-white hover:bg-blue-500 rounded-md transition" title="Edit Nama Kategori">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <button type="button" @click.stop="deleteCategory(cat)" class="p-1.5 text-red-300 hover:text-white hover:bg-red-500 rounded-md transition" title="Hapus Kategori">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    </li>
                  </ul>
                  <div class="bg-slate-900 p-2 border-t border-white/10">
                    <button type="button" @click="enableNewCategory" class="w-full py-2 text-sm text-indigo-400 hover:text-indigo-300 hover:bg-white/5 rounded-lg font-bold flex items-center justify-center gap-2 transition">
                      + Tambah Kategori Baru
                    </button>
                  </div>
                </div>
              </div>

              <div v-else class="flex gap-2">
                <input v-model="formData.category" type="text" placeholder="Ketik kategori..." required class="flex-1 bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition">
                <button type="button" @click="cancelNewCategory" class="px-4 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition font-bold" title="Batal">X</button>
              </div>
            </div>
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Estimasi Harga</label>
            <input v-model="formData.price" type="text" required class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition">
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Upload Gambar <span v-if="isEditingProduct" class="text-xs text-indigo-400">(Abaikan jika tidak diubah)</span></label>
            <input type="file" accept="image/*" :required="!isEditingProduct" @change="handleFileUpload" class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 cursor-pointer transition">
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Deskripsi Produk</label>
            <textarea v-model="formData.description" required rows="3" class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 resize-none transition"></textarea>
          </div>

          <button type="submit" :disabled="isSubmittingForm" class="mt-4 w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold rounded-xl transition duration-300">
            {{ isSubmittingForm ? 'Memproses Data...' : (isEditingProduct ? 'Simpan Perubahan' : 'Simpan Produk Baru') }}
          </button>
        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, inject } from 'vue'
import { supabase } from '../supabase'

// STATUS MODE EDIT (Injeksi dari App.vue)
const isEditMode = inject('isEditMode', ref(false))

// ==========================================
// LOGIKA TEKS HEADER HALAMAN (CMS)
// ==========================================
const isSubmittingHeader = ref(false)
const defaultHeaderData = {
  hero_title_1: 'Katalog',
  hero_title_2: 'Desain',
  hero_subtitle: 'Temukan inspirasi desain terbaik atau wujudkan kreasimu sendiri bersama Winsman.'
}
const rawHeaderData = ref([])
const localContent = ref({ ...defaultHeaderData })

const fetchHeaderContent = async () => {
  const { data, error } = await supabase.from('page_contents').select('*').eq('page_slug', 'katalog')
  if (!error && data) {
    rawHeaderData.value = data
    data.forEach(item => {
      if (localContent.value[item.section_key] !== undefined && item.content) {
        localContent.value[item.section_key] = item.content
      }
    })
  }
}

const saveHeaderChanges = async () => {
  try {
    isSubmittingHeader.value = true
    const promises = Object.keys(localContent.value).map(async (key) => {
      const existingRow = rawHeaderData.value.find(item => item.section_key === key)
      const contentToSave = localContent.value[key] || ''
      if (existingRow) {
        return supabase.from('page_contents').update({ content: contentToSave }).eq('id', existingRow.id)
      } else {
        return supabase.from('page_contents').insert({ page_slug: 'katalog', section_key: key, content: contentToSave })
      }
    })
    await Promise.all(promises)
    alert('Teks Header Katalog berhasil diperbarui!')
    isEditMode.value = false 
    fetchHeaderContent() 
  } catch (err) {
    alert('Terjadi kesalahan: ' + err.message)
  } finally {
    isSubmittingHeader.value = false
  }
}

// ==========================================
// LOGIKA DATABASE PRODUK
// ==========================================
const activeTab = ref('hits')
const products = ref([])
const isLoadingData = ref(true)

const fetchProducts = async () => {
  try {
    isLoadingData.value = true
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false })
    if (error) throw error
    products.value = data
  } catch (error) {
    console.error('Gagal:', error.message)
  } finally {
    isLoadingData.value = false
  }
}

onMounted(() => {
  fetchHeaderContent()
  fetchProducts()
})

// ==========================================
// LOGIKA TAMPILAN & TABS
// ==========================================
const dynamicTabs = computed(() => {
  const defaults = [
    { id: 'hits', name: 'Desain Hits' },
    { id: 'signature', name: 'Desain Signature' },
    { id: 'customer', name: 'Desain Kreasi Customer' }
  ]
  const existingIds = products.value.map(p => p.category)
  const uniqueIds = [...new Set(existingIds)]
  const newCategories = uniqueIds.filter(id => !['hits', 'signature', 'customer'].includes(id)).map(id => ({ id: id, name: id })) 
  return [...defaults, ...newCategories]
})

const filteredProducts = computed(() => {
  return products.value.filter(product => product.category === activeTab.value)
})

const formatCategoryDisplay = (cat) => {
  const map = { 'hits': 'Desain Hits', 'signature': 'Desain Signature', 'customer': 'Desain Kreasi Customer' }
  return map[cat] || cat 
}
const getCategoryName = (categoryId) => {
  const tab = dynamicTabs.value.find(t => t.id === categoryId)
  return tab ? tab.name : categoryId
}

// ==========================================
// MODAL 1: DETAIL PRODUK (VIEW)
// ==========================================
const isDetailModalOpen = ref(false)
const selectedProduct = ref(null)

const openDetailModal = (item) => {
  selectedProduct.value = item
  isDetailModalOpen.value = true
  document.body.style.overflow = 'hidden'
}
const closeDetailModal = () => {
  selectedProduct.value = null
  isDetailModalOpen.value = false
  document.body.style.overflow = 'auto'
}

// ==========================================
// MODAL 2: FORM TAMBAH/EDIT PRODUK (ADMIN)
// ==========================================
const isFormModalOpen = ref(false)
const isEditingProduct = ref(false)
const isSubmittingForm = ref(false)
const selectedFile = ref(null)

const formData = ref({
  id: null, title: '', category: 'hits', price: '', description: '', image: ''
})

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const openAddModal = () => {
  isEditingProduct.value = false
  isAddingNewCategory.value = false
  formData.value = { id: null, title: '', category: activeTab.value, price: '', description: '', image: '' }
  selectedFile.value = null
  isFormModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const openEditModal = (item) => {
  isEditingProduct.value = true
  isAddingNewCategory.value = false
  formData.value = { ...item }
  selectedFile.value = null 
  isFormModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeFormModal = () => {
  isFormModalOpen.value = false
  isCategoryDropdownOpen.value = false
  document.body.style.overflow = 'auto'
}

const submitProductForm = async () => {
  try {
    isSubmittingForm.value = true
    let imageUrl = formData.value.image 

    if (selectedFile.value) {
      const file = selectedFile.value
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const { error: uploadError } = await supabase.storage.from('katalog-images').upload(fileName, file)
      if (uploadError) throw new Error('Gagal mengupload gambar')
      const { data: { publicUrl } } = supabase.storage.from('katalog-images').getPublicUrl(fileName)
      imageUrl = publicUrl 
    }

    const payloadData = {
      title: formData.value.title, category: formData.value.category,
      price: formData.value.price, description: formData.value.description, image: imageUrl
    }

    if (isEditingProduct.value) {
      const { error: updateError } = await supabase.from('products').update(payloadData).eq('id', formData.value.id)
      if (updateError) throw updateError
      alert('Katalog berhasil diperbarui!')
    } else {
      const { error: insertError } = await supabase.from('products').insert([payloadData])
      if (insertError) throw insertError
      alert('Produk baru berhasil ditambahkan!')
    }

    closeFormModal()
    fetchProducts() 
  } catch (error) {
    alert(error.message)
  } finally {
    isSubmittingForm.value = false
  }
}

const deleteProduct = async (id) => {
  if (!confirm('Yakin ingin menghapus desain ini secara permanen?')) return;
  try {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
    fetchProducts()
  } catch (error) {
    alert('Gagal menghapus: ' + error.message)
  }
}

// ==========================================
// LOGIKA DROPDOWN KATEGORI (DI DALAM FORM)
// ==========================================
const isCategoryDropdownOpen = ref(false)
const isAddingNewCategory = ref(false)

const uniqueCategories = computed(() => {
  const defaults = ['hits', 'signature', 'customer']
  const fromDb = products.value.map(p => p.category)
  return [...new Set([...defaults, ...fromDb])] 
})

const selectCategory = (cat) => {
  formData.value.category = cat
  isCategoryDropdownOpen.value = false
}
const enableNewCategory = () => {
  isAddingNewCategory.value = true
  isCategoryDropdownOpen.value = false
  formData.value.category = '' 
}
const cancelNewCategory = () => {
  isAddingNewCategory.value = false
  formData.value.category = 'hits'
}

const editCategoryName = async (oldName) => {
  const newName = prompt(`Ubah nama kategori "${oldName}" menjadi:`, oldName)
  if (!newName || newName.trim() === '' || newName === oldName) return
  try {
    const { error } = await supabase.from('products').update({ category: newName }).eq('category', oldName)
    if (error) throw error
    alert('Nama kategori berhasil diubah di seluruh katalog!')
    if (formData.value.category === oldName) formData.value.category = newName
    fetchProducts() 
  } catch (error) {
    alert('Gagal mengubah kategori: ' + error.message)
  }
}

const deleteCategory = async (catName) => {
  const isConfirmed = confirm(`PERINGATAN!\n\nMenghapus kategori "${catName}" akan MENGHAPUS SEMUA DESAIN di dalamnya.\nYakin?`)
  if (!isConfirmed) return
  try {
    const { error } = await supabase.from('products').delete().eq('category', catName)
    if (error) throw error
    alert(`Kategori "${catName}" beserta isinya dihapus!`)
    if (formData.value.category === catName) formData.value.category = 'hits'
    fetchProducts()
  } catch (error) {
    alert('Gagal menghapus kategori: ' + error.message)
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(10px); }

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in-up { animation: fadeInUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.2); border-radius: 10px; }
.custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255, 255, 255, 0.3); }
</style>