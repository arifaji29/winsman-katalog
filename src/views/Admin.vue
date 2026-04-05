<template>
  <div class="min-h-screen pb-16 px-4 md:px-0">
    
    <div class="glass p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-white">Dashboard Admin</h1>
        <p class="text-gray-400 text-sm">Kelola data katalog desain Winsman</p>
      </div>
      <button @click="openAddModal" class="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full font-bold transition duration-300 flex items-center gap-2 shadow-lg w-full md:w-auto justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
        </svg>
        Tambah Katalog
      </button>
    </div>

    <div v-if="isLoadingData" class="text-center py-20 w-full glass rounded-3xl mb-6">
      <p class="text-indigo-400 text-xl font-bold animate-pulse">Memuat Data Katalog...</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in products" :key="item.id" class="glass rounded-2xl overflow-hidden flex flex-col">
        <div class="h-48 overflow-hidden bg-dark/50 relative">
          <img :src="item.image" :alt="item.title" class="w-full h-full object-cover" />
          <span class="absolute top-3 right-3 bg-dark/80 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            {{ formatCategoryDisplay(item.category) }}
          </span>
        </div>
        
        <div class="p-5 flex-1 flex flex-col justify-between gap-4">
          <div>
            <h3 class="text-lg font-bold text-white mb-1 leading-tight">{{ item.title }}</h3>
            <p class="text-indigo-300 font-medium text-sm">{{ item.price }}</p>
          </div>
          
          <div class="flex gap-2 mt-2">
            <button @click="openEditModal(item)" class="flex-1 py-2 bg-white/10 hover:bg-indigo-600 text-white text-sm font-bold rounded-lg transition duration-300">
              Edit
            </button>
            <button @click="deleteProduct(item.id)" class="flex-1 py-2 bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-sm font-bold rounded-lg transition duration-300">
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="!isLoadingData && products.length === 0" class="text-center py-20 w-full glass rounded-3xl mt-6">
      <p class="text-gray-400 text-lg">Katalog masih kosong. Silakan tambah data.</p>
    </div>

    <!-- MODAL FORM -->
    <div v-if="isModalOpen" class="fixed inset-0 z-70 flex items-center justify-center p-4 bg-dark/90 backdrop-blur-md" @click.self="closeModal">
      <div class="glass max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 relative animate-fade-in-up">
        
        <button @click="closeModal" class="absolute top-6 right-6 z-10 p-2 bg-dark/50 hover:bg-red-500 text-white rounded-full transition duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <h2 class="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-4">
          {{ isEditMode ? 'Edit Katalog' : 'Tambah Katalog Baru' }}
        </h2>

        <form @submit.prevent="submitForm" class="flex flex-col gap-5">
          <div class="flex flex-col md:flex-row gap-5 relative">
            <div class="flex-1">
              <label class="block text-sm text-gray-400 mb-2">Nama Desain</label>
              <input v-model="formData.title" type="text" required class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500">
            </div>
            
            <!-- BAGIAN KATEGORI KUSTOM -->
            <div class="flex-1 relative">
              <label class="block text-sm text-gray-400 mb-2">Kategori</label>
              
              <!-- Mode Pilih Dropdown -->
              <div v-if="!isAddingNewCategory" class="relative">
                <button type="button" @click="isCategoryDropdownOpen = !isCategoryDropdownOpen" class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 flex justify-between items-center text-left">
                  <span class="truncate pr-2">{{ formatCategoryDisplay(formData.category) }}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                </button>

                <!-- Invisible backdrop to close dropdown when clicking outside -->
                <div v-if="isCategoryDropdownOpen" class="fixed inset-0 z-40" @click="isCategoryDropdownOpen = false"></div>

                <div v-if="isCategoryDropdownOpen" class="absolute z-50 w-full mt-2 bg-slate-800 border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                  <ul class="max-h-52 overflow-y-auto">
                    <li v-for="cat in uniqueCategories" :key="cat" class="hover:bg-indigo-600 transition border-b border-white/5 last:border-none flex items-center justify-between group">
                      
                      <!-- Area Klik untuk Pilih Kategori -->
                      <div @click="selectCategory(cat)" class="px-4 py-3 cursor-pointer flex-1 text-white truncate">
                        {{ formatCategoryDisplay(cat) }}
                      </div>

                      <!-- Tombol Edit & Hapus (Hanya untuk kategori kustom) -->
                      <div v-if="!['hits', 'signature', 'customer'].includes(cat)" class="flex gap-1 pr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <!-- Tombol Edit -->
                        <button type="button" @click.stop="editCategoryName(cat)" class="p-1.5 text-blue-300 hover:text-white hover:bg-blue-500 rounded-md transition" title="Edit Nama Kategori">
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                        </button>
                        <!-- Tombol Hapus -->
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

              <!-- Mode Ketik Kategori Baru -->
              <div v-else class="flex gap-2">
                <input v-model="formData.category" type="text" placeholder="Ketik kategori..." required class="flex-1 bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500">
                <button type="button" @click="cancelNewCategory" class="px-4 bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white rounded-xl transition font-bold" title="Batal">X</button>
              </div>
            </div>
            <!-- AKHIR BAGIAN KATEGORI KUSTOM -->

          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Estimasi Harga</label>
            <input v-model="formData.price" type="text" required class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500">
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Upload Gambar <span v-if="isEditMode" class="text-xs text-indigo-400">(Biarkan kosong jika tidak ingin mengubah gambar)</span></label>
            <input type="file" accept="image/*" :required="!isEditMode" @change="handleFileUpload" class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 cursor-pointer">
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2">Deskripsi Produk</label>
            <textarea v-model="formData.description" required rows="3" class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 resize-none"></textarea>
          </div>

          <button type="submit" :disabled="isSubmitting" class="mt-4 w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold rounded-xl transition duration-300">
            {{ isSubmitting ? 'Memproses Data...' : (isEditMode ? 'Simpan Perubahan' : 'Simpan Produk Baru') }}
          </button>
        </form>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'

const products = ref([])
const isLoadingData = ref(true)
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const isEditMode = ref(false)

// State Khusus Dropdown Kategori
const isCategoryDropdownOpen = ref(false)
const isAddingNewCategory = ref(false)

const selectedFile = ref(null)
const formData = ref({
  id: null,
  title: '',
  category: 'hits',
  price: '',
  description: '',
  image: ''
})

// Mengumpulkan daftar kategori unik dari database + default
const uniqueCategories = computed(() => {
  const defaults = ['hits', 'signature', 'customer']
  const fromDb = products.value.map(p => p.category)
  return [...new Set([...defaults, ...fromDb])] 
})

const formatCategoryDisplay = (cat) => {
  const map = {
    'hits': 'Desain Hits',
    'signature': 'Desain Signature',
    'customer': 'Desain Kreasi Customer'
  }
  return map[cat] || cat 
}

// === LOGIKA MANAJEMEN KATEGORI DALAM DROPDOWN ===

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

// Fungsi Edit Kategori Keseluruhan
const editCategoryName = async (oldName) => {
  const newName = prompt(`Ubah nama kategori "${oldName}" menjadi:`, oldName)
  
  if (!newName || newName.trim() === '' || newName === oldName) return

  try {
    // Memperbarui semua produk yang memiliki nama kategori lama menjadi baru
    const { error } = await supabase.from('products').update({ category: newName }).eq('category', oldName)
    if (error) throw error
    
    alert('Nama kategori berhasil diubah di seluruh katalog!')
    
    // Jika kategori yang sedang dipilih di form adalah yang baru saja diubah, perbarui form-nya
    if (formData.value.category === oldName) {
      formData.value.category = newName
    }
    
    fetchProducts() // Segarkan data agar dropdown langsung berubah
  } catch (error) {
    alert('Gagal mengubah kategori: ' + error.message)
  }
}

// Fungsi Hapus Kategori Keseluruhan
const deleteCategory = async (catName) => {
  const isConfirmed = confirm(`PERINGATAN KERAS!\n\nMenghapus kategori "${catName}" akan MENGHAPUS SEMUA DESAIN (PRODUK) yang ada di dalamnya secara permanen.\n\nApakah Anda benar-benar yakin ingin melanjutkan?`)
  
  if (!isConfirmed) return

  try {
    // Menghapus seluruh baris produk yang nama kategorinya sama
    const { error } = await supabase.from('products').delete().eq('category', catName)
    if (error) throw error
    
    alert(`Kategori "${catName}" beserta semua desainnya berhasil dihapus!`)
    
    // Jika kategori yang sedang dipilih di form ikut terhapus, kembalikan ke default 'hits'
    if (formData.value.category === catName) {
      formData.value.category = 'hits'
    }
    
    fetchProducts() // Segarkan data
  } catch (error) {
    alert('Gagal menghapus kategori: ' + error.message)
  }
}

// === LOGIKA CRUD PRODUK ===

const fetchProducts = async () => {
  try {
    isLoadingData.value = true
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false })
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

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const openAddModal = () => {
  isEditMode.value = false
  isAddingNewCategory.value = false
  formData.value = { id: null, title: '', category: 'hits', price: '', description: '', image: '' }
  selectedFile.value = null
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const openEditModal = (item) => {
  isEditMode.value = true
  isAddingNewCategory.value = false
  formData.value = { ...item }
  selectedFile.value = null 
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeModal = () => {
  isModalOpen.value = false
  isCategoryDropdownOpen.value = false
  document.body.style.overflow = 'auto'
}

const deleteProduct = async (id) => {
  if (!confirm('Yakin ingin menghapus katalog desain ini?')) return;

  try {
    const { error } = await supabase.from('products').delete().eq('id', id)
    if (error) throw error
    alert('Katalog berhasil dihapus!')
    fetchProducts()
  } catch (error) {
    alert('Gagal menghapus data: ' + error.message)
  }
}

const submitForm = async () => {
  try {
    isSubmitting.value = true
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
      title: formData.value.title,
      category: formData.value.category,
      price: formData.value.price,
      description: formData.value.description,
      image: imageUrl
    }

    if (isEditMode.value) {
      const { error: updateError } = await supabase.from('products').update(payloadData).eq('id', formData.value.id)
      if (updateError) throw updateError
      alert('Katalog berhasil diperbarui!')
    } else {
      const { error: insertError } = await supabase.from('products').insert([payloadData])
      if (insertError) throw insertError
      alert('Produk baru berhasil ditambahkan!')
    }

    closeModal()
    fetchProducts() 
  } catch (error) {
    alert(error.message)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Memastikan scrollbar pada dropdown terlihat elegan */
ul::-webkit-scrollbar {
  width: 6px;
}
ul::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
}
ul::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
ul::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>