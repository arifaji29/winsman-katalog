<template>
  <div class="flex flex-col gap-12 pb-16 relative">
    
    <!-- TOMBOL SIMPAN -->
    <transition name="fade">
      <div v-if="isEditMode" class="fixed bottom-10 right-6 md:right-10 z-100">
        <button @click="saveAllChanges" :disabled="isSubmitting" class="px-6 md:px-8 py-4 bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white font-bold rounded-full shadow-[0_0_20px_rgba(22,163,74,0.5)] flex items-center gap-2 transition duration-300">
          <svg v-if="isSubmitting" class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          {{ isSubmitting ? 'Mengupload & Menyimpan...' : 'Simpan Beranda' }}
        </button>
      </div>
    </transition>

    <!-- BAGIAN 1: HERO SLIDER -->
    <div class="relative w-full h-[70vh] rounded-3xl overflow-hidden glass group">
      
      <transition-group name="slide" tag="div" class="relative w-full h-full">
        <!-- Looping 3 Slide -->
        <div 
          v-for="i in 3" 
          :key="i"
          v-show="currentSlide === i - 1"
          class="absolute inset-0 w-full h-full"
        >
          <!-- Gambar Background -->
          <img :src="localContent['slide_'+i+'_image']" class="w-full h-full object-cover" />
          
          <!-- Overlay Gelap -->
          <div class="absolute inset-0 bg-slate-900/70 backdrop-blur-[2px]"></div>

          <!-- TAMPILAN BACA (Read Mode) -->
          <div v-if="!isEditMode" class="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h1 class="text-4xl md:text-6xl font-extrabold text-white mb-4 drop-shadow-xl">
              {{ localContent['slide_'+i+'_title1'] }} <br>
              <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">{{ localContent['slide_'+i+'_title2'] }}</span>
            </h1>
            <p class="text-gray-200 text-lg md:text-xl max-w-2xl mb-8 drop-shadow-md">{{ localContent['slide_'+i+'_subtitle'] }}</p>
            <router-link :to="localContent['slide_'+i+'_btn_link']" class="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-full transition duration-300 shadow-[0_0_20px_rgba(79,70,229,0.5)] hover:shadow-[0_0_25px_rgba(79,70,229,0.7)]">
              {{ localContent['slide_'+i+'_btn_text'] }}
            </router-link>
          </div>

          <!-- TAMPILAN EDIT (Edit Mode) -->
          <div v-else class="absolute inset-0 bg-dark/80 flex flex-col items-center justify-center px-4 overflow-y-auto py-8">
            <div class="w-full max-w-2xl flex flex-col gap-4 bg-white/5 p-6 rounded-2xl border border-indigo-500/50">
              <span class="text-indigo-400 font-bold mb-1 text-center border-b border-indigo-500/30 pb-2">EDIT SLIDE {{ i }}</span>
              
              <!-- BAGIAN INPUT GAMBAR (FILE & URL) -->
              <div class="bg-black/30 p-4 rounded-xl border border-white/10">
                <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">1. Upload Gambar Baru</label>
                <input type="file" accept="image/*" @change="(e) => handleFileUpload(e, i)" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 cursor-pointer mb-3 outline-none" />
                
                <div class="flex items-center gap-2 mb-3">
                  <div class="h-px bg-white/20 flex-1"></div>
                  <span class="text-xs text-gray-500 font-bold">ATAU</span>
                  <div class="h-px bg-white/20 flex-1"></div>
                </div>

                <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">2. Gunakan URL Gambar</label>
                <input v-model="localContent['slide_'+i+'_image']" placeholder="https://..." class="w-full bg-black/50 border border-indigo-500/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
                <p class="text-[10px] text-gray-500 mt-1">*Jika Anda mengupload file, URL di atas akan otomatis terganti.</p>
              </div>

              <!-- BAGIAN INPUT TEKS -->
              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 block">Teks Baris 1 (Putih)</label>
                  <input v-model="localContent['slide_'+i+'_title1']" class="w-full bg-black/50 border border-indigo-500 rounded-lg px-3 py-2 font-bold text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="flex-1">
                  <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 block">Teks Baris 2 (Gradasi)</label>
                  <input v-model="localContent['slide_'+i+'_title2']" class="w-full bg-black/50 border border-indigo-500 rounded-lg px-3 py-2 font-bold text-indigo-300 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>

              <div>
                <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 block">Subjudul (Deskripsi)</label>
                <textarea v-model="localContent['slide_'+i+'_subtitle']" rows="2" class="w-full bg-black/50 border border-indigo-500 rounded-lg px-3 py-2 text-sm text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"></textarea>
              </div>

              <div class="flex gap-4">
                <div class="flex-1">
                  <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 block">Teks Tombol</label>
                  <input v-model="localContent['slide_'+i+'_btn_text']" class="w-full bg-black/50 border border-indigo-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
                <div class="flex-1">
                  <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 block">Link Tombol (misal: /katalog)</label>
                  <input v-model="localContent['slide_'+i+'_btn_link']" class="w-full bg-black/50 border border-indigo-500 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-indigo-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Navigasi Panah -->
      <button @click="prevSlide" class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition z-20" :class="isEditMode ? 'opacity-100 bg-indigo-600' : 'opacity-0 group-hover:opacity-100'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>
      </button>
      <button @click="nextSlide" class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition z-20" :class="isEditMode ? 'opacity-100 bg-indigo-600' : 'opacity-0 group-hover:opacity-100'">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" /></svg>
      </button>

      <!-- Pagination Dots -->
      <div class="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        <button 
          v-for="(_, index) in 3" 
          :key="index"
          @click="currentSlide = index"
          class="w-3 h-3 rounded-full transition-all duration-300"
          :class="currentSlide === index ? 'bg-indigo-500 w-8 shadow-[0_0_10px_rgba(99,102,241,0.8)]' : 'bg-white/50 hover:bg-white'"
        ></button>
      </div>
    </div>

    <!-- BAGIAN 2: FITUR UNGGULAN -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Fitur 1 -->
      <div class="glass p-8 rounded-3xl hover:-translate-y-2 transition duration-300">
        <div class="w-14 h-14 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
        </div>
        <h3 v-if="!isEditMode" class="text-xl font-bold text-white mb-3">{{ localContent.feat_1_title }}</h3>
        <input v-else v-model="localContent.feat_1_title" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 mb-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500">
        
        <p v-if="!isEditMode" class="text-gray-400 leading-relaxed">{{ localContent.feat_1_desc }}</p>
        <textarea v-else v-model="localContent.feat_1_desc" rows="3" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"></textarea>
      </div>
      
      <!-- Fitur 2 -->
      <div class="glass p-8 rounded-3xl hover:-translate-y-2 transition duration-300">
        <div class="w-14 h-14 bg-purple-500/20 text-purple-400 rounded-2xl flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
        </div>
        <h3 v-if="!isEditMode" class="text-xl font-bold text-white mb-3">{{ localContent.feat_2_title }}</h3>
        <input v-else v-model="localContent.feat_2_title" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 mb-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500">
        
        <p v-if="!isEditMode" class="text-gray-400 leading-relaxed">{{ localContent.feat_2_desc }}</p>
        <textarea v-else v-model="localContent.feat_2_desc" rows="3" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"></textarea>
      </div>

      <!-- Fitur 3 -->
      <div class="glass p-8 rounded-3xl hover:-translate-y-2 transition duration-300">
        <div class="w-14 h-14 bg-pink-500/20 text-pink-400 rounded-2xl flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
        </div>
        <h3 v-if="!isEditMode" class="text-xl font-bold text-white mb-3">{{ localContent.feat_3_title }}</h3>
        <input v-else v-model="localContent.feat_3_title" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 mb-3 text-white font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500">
        
        <p v-if="!isEditMode" class="text-gray-400 leading-relaxed">{{ localContent.feat_3_desc }}</p>
        <textarea v-else v-model="localContent.feat_3_desc" rows="3" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"></textarea>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, inject, watch } from 'vue'
import { supabase } from '../supabase'

const isEditMode = inject('isEditMode', ref(false))
const isSubmitting = ref(false)

const currentSlide = ref(0)
let slideInterval = null

// State untuk menampung file gambar yang baru dipilih dari masing-masing slide
const selectedFiles = ref({
  1: null,
  2: null,
  3: null
})

// Fungsi menangkap file yang diupload
const handleFileUpload = (event, slideIndex) => {
  selectedFiles.value[slideIndex] = event.target.files[0]
}

// --- DATA DEFAULT BERANDA ---
const defaultData = {
  slide_1_image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1600',
  slide_1_title1: 'KAOS CUSTOM,',
  slide_1_title2: 'KUALITAS PREMIUM.',
  slide_1_subtitle: 'Wujudkan desain impianmu dengan material terbaik dari Winsman.',
  slide_1_btn_text: 'Lihat Katalog',
  slide_1_btn_link: '/katalog',
  
  slide_2_image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1600',
  slide_2_title1: 'Teknologi Cetak',
  slide_2_title2: 'Presisi Tinggi.',
  slide_2_subtitle: 'Warna lebih solid, detail lebih tajam, dan tahan lama.',
  slide_2_btn_text: 'Pelajari FAQ',
  slide_2_btn_link: '/faq',
  
  slide_3_image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=1600',
  slide_3_title1: 'Bebas Berekspresi,',
  slide_3_title2: 'Tanpa Batas.',
  slide_3_subtitle: 'Mulai dari baju komunitas hingga koleksi fashion pribadi.',
  slide_3_btn_text: 'Hubungi Kami',
  slide_3_btn_link: '/kontak',

  feat_1_title: 'Material Grade A',
  feat_1_desc: 'Katun kombed kualitas ekspor yang nyaman, adem, dan awet dipakai harian.',
  feat_2_title: 'Custom Suka-Suka',
  feat_2_desc: 'Tanpa minimum order. Wujudkan ide desainmu walaupun hanya memesan 1 pcs.',
  feat_3_title: 'Pengerjaan Cepat',
  feat_3_desc: 'Proses produksi efisien memastikan pesananmu selesai dan dikirim tepat waktu.'
}

const rawData = ref([])
const localContent = ref({ ...defaultData })

// --- LOGIKA DATABASE ---
const fetchPageContent = async () => {
  const { data, error } = await supabase
    .from('page_contents')
    .select('*')
    .eq('page_slug', 'beranda')

  if (!error && data) {
    rawData.value = data
    data.forEach(item => {
      if (localContent.value[item.section_key] !== undefined) {
        localContent.value[item.section_key] = item.content
      }
    })
  }
}

const saveAllChanges = async () => {
  try {
    isSubmitting.value = true

    // 1. PROSES UPLOAD GAMBAR (Jika ada file yang dipilih)
    for (let i = 1; i <= 3; i++) {
      const file = selectedFiles.value[i]
      if (file) {
        const fileExt = file.name.split('.').pop()
        const fileName = `beranda-slide-${i}-${Date.now()}.${fileExt}`

        // Upload ke storage
        const { error: uploadError } = await supabase.storage
          .from('katalog-images')
          .upload(fileName, file)

        if (uploadError) throw new Error(`Gagal mengupload gambar slide ${i}: ` + uploadError.message)

        // Dapatkan Public URL
        const { data: { publicUrl } } = supabase.storage
          .from('katalog-images')
          .getPublicUrl(fileName)

        // Timpa URL lama di localContent dengan URL publik yang baru
        localContent.value[`slide_${i}_image`] = publicUrl
      }
    }

    // 2. SIMPAN SEMUA DATA KE DATABASE
    const promises = Object.keys(localContent.value).map(async (key) => {
      const existingRow = rawData.value.find(item => item.section_key === key)
      if (existingRow) {
        return supabase.from('page_contents').update({ content: localContent.value[key] }).eq('id', existingRow.id)
      } else {
        return supabase.from('page_contents').insert({ page_slug: 'beranda', section_key: key, content: localContent.value[key] })
      }
    })
    
    await Promise.all(promises)
    
    // Reset form file
    selectedFiles.value = { 1: null, 2: null, 3: null }

    alert('Halaman Beranda berhasil diperbarui!')
    isEditMode.value = false
    fetchPageContent()
  } catch (err) {
    alert('Terjadi kesalahan: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}

// --- LOGIKA SLIDER ---
const nextSlide = () => { currentSlide.value = (currentSlide.value + 1) % 3 }
const prevSlide = () => { currentSlide.value = (currentSlide.value - 1 + 3) % 3 }

const startSlider = () => {
  if (!slideInterval && !isEditMode.value) {
    slideInterval = setInterval(nextSlide, 5000) 
  }
}

const stopSlider = () => {
  if (slideInterval) {
    clearInterval(slideInterval)
    slideInterval = null
  }
}

watch(isEditMode, (newVal) => {
  if (newVal) {
    stopSlider()
  } else {
    startSlider()
  }
})

onMounted(() => {
  fetchPageContent()
  startSlider()
})

onUnmounted(() => {
  stopSlider()
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.slide-enter-from {
  opacity: 0;
  transform: scale(1.03);
}
.slide-leave-to {
  opacity: 0;
  transform: scale(0.97);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>