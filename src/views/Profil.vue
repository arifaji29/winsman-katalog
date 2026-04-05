<template>
  <div class="flex flex-col items-center min-h-screen pb-16 relative">
    
    <!-- TOMBOL SIMPAN (Hanya muncul saat Mode Edit aktif) -->
    <transition name="fade">
      <div v-if="isEditMode" class="fixed bottom-10 right-6 md:right-10 z-100">
        <button @click="saveAllChanges" :disabled="isSubmitting" class="px-6 md:px-8 py-4 bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white font-bold rounded-full shadow-[0_0_20px_rgba(22,163,74,0.5)] flex items-center gap-2 transition duration-300">
          <svg v-if="isSubmitting" class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          {{ isSubmitting ? 'Mengupload & Menyimpan...' : 'Simpan Perubahan Profil' }}
        </button>
      </div>
    </transition>

    <!-- BAGIAN 1: HEADER / TENTANG KAMI -->
    <div class="text-center mb-16 w-full max-w-4xl px-4">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4 flex flex-col md:flex-row items-center justify-center gap-2">
        <template v-if="!isEditMode">
          {{ localContent.hero_title_1 }}
          <!-- TYPO DIPERBAIKI DI SINI: bg-gradient-to-r -->
          <span class="font-logo tracking-widest text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">{{ localContent.hero_title_2 }}</span>
        </template>
        <template v-else>
          <input v-model="localContent.hero_title_1" class="bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
          <input v-model="localContent.hero_title_2" class="bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 text-center text-indigo-400 font-logo tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
        </template>
      </h1>

      <p v-if="!isEditMode" class="text-gray-400 max-w-2xl mx-auto">{{ localContent.hero_subtitle }}</p>
      <textarea v-else v-model="localContent.hero_subtitle" rows="2" class="w-full max-w-2xl mx-auto bg-dark/80 border border-indigo-500 rounded-xl p-3 text-center text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
    </div>

    <!-- BAGIAN 2: CERITA KAMI (GAMBAR & TEKS) -->
    <div class="flex flex-col lg:flex-row gap-12 items-center w-full mb-20 px-4 md:px-0">
      
      <!-- Kolom Gambar -->
      <div class="w-full lg:w-1/2 relative group">
        <div class="absolute -inset-1 bg-linear-to-r from-indigo-500 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div class="relative glass rounded-3xl overflow-hidden aspect-4/3">
          <img :src="localContent.story_image" alt="Cerita Winsman" class="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
          <div class="absolute inset-0 bg-dark/20"></div>
          
          <!-- Input URL & Upload Gambar saat Mode Edit -->
          <div v-if="isEditMode" class="absolute inset-0 bg-dark/90 flex flex-col justify-center p-6 backdrop-blur-md overflow-y-auto">
            <div class="bg-black/30 p-4 rounded-xl border border-white/10 w-full">
              <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">1. Upload Gambar Baru</label>
              <input type="file" accept="image/*" @change="handleFileUpload" class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-500 file:text-white hover:file:bg-indigo-600 cursor-pointer mb-3 outline-none" />
              
              <div class="flex items-center gap-2 mb-3">
                <div class="h-px bg-white/20 flex-1"></div>
                <span class="text-xs text-gray-500 font-bold">ATAU</span>
                <div class="h-px bg-white/20 flex-1"></div>
              </div>

              <label class="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2 block">2. Gunakan URL Gambar</label>
              <input v-model="localContent.story_image" placeholder="https://..." class="w-full bg-black/50 border border-indigo-500/50 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500" />
              <p class="text-[10px] text-gray-500 mt-1">*Jika Anda mengupload file, URL di atas akan otomatis terganti saat disimpan.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Kolom Teks Cerita -->
      <div class="w-full lg:w-1/2 flex flex-col justify-center">
        <!-- Judul Cerita -->
        <h2 v-if="!isEditMode" class="text-3xl md:text-4xl font-bold mb-6 text-white">{{ localContent.story_title }}</h2>
        <div v-else class="mb-6">
          <label class="text-indigo-400 font-bold mb-1 block text-sm">Judul Cerita</label>
          <input v-model="localContent.story_title" class="w-full bg-dark/80 border border-indigo-500 rounded-xl p-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
        </div>
        
        <div class="space-y-4 text-gray-300 leading-relaxed text-lg">
          <p v-if="!isEditMode">{{ localContent.story_p1 }}</p>
          <textarea v-else v-model="localContent.story_p1" rows="3" class="w-full bg-dark/80 border border-indigo-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>

          <p v-if="!isEditMode">{{ localContent.story_p2 }}</p>
          <textarea v-else v-model="localContent.story_p2" rows="5" class="w-full bg-dark/80 border border-indigo-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>

          <p v-if="!isEditMode">{{ localContent.story_p3 }}</p>
          <textarea v-else v-model="localContent.story_p3" rows="3" class="w-full bg-dark/80 border border-indigo-500 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
        </div>
      </div>
    </div>

    <!-- BAGIAN 3: NILAI INTI KAMI -->
    <div class="w-full px-4 md:px-0">
      <div class="text-center mb-10">
        <h3 v-if="!isEditMode" class="text-2xl font-bold text-white">{{ localContent.values_title }}</h3>
        <input v-else v-model="localContent.values_title" class="bg-dark/80 border border-indigo-500 rounded-xl px-4 py-2 text-center text-white font-bold w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-indigo-500">
        <div class="w-20 h-1 bg-indigo-500 mx-auto mt-4 rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <!-- Kartu 1 -->
        <div class="glass p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
          <div class="w-16 h-16 rounded-full bg-indigo-500/20 flex items-center justify-center mb-6 text-indigo-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
          </div>
          <h4 v-if="!isEditMode" class="text-xl font-bold text-white mb-3">{{ localContent.v1_title }}</h4>
          <input v-else v-model="localContent.v1_title" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 mb-3 text-white font-bold text-center focus:outline-none">
          
          <p v-if="!isEditMode" class="text-gray-400 text-sm">{{ localContent.v1_desc }}</p>
          <textarea v-else v-model="localContent.v1_desc" rows="4" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-3 text-sm text-gray-300 text-center focus:outline-none"></textarea>
        </div>

        <!-- Kartu 2 -->
        <div class="glass p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
          <div class="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
          </div>
          <h4 v-if="!isEditMode" class="text-xl font-bold text-white mb-3">{{ localContent.v2_title }}</h4>
          <input v-else v-model="localContent.v2_title" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 mb-3 text-white font-bold text-center focus:outline-none">
          
          <p v-if="!isEditMode" class="text-gray-400 text-sm">{{ localContent.v2_desc }}</p>
          <textarea v-else v-model="localContent.v2_desc" rows="4" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-3 text-sm text-gray-300 text-center focus:outline-none"></textarea>
        </div>

        <!-- Kartu 3 -->
        <div class="glass p-8 rounded-2xl flex flex-col items-center text-center hover:-translate-y-2 transition duration-300">
          <div class="w-16 h-16 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
          </div>
          <h4 v-if="!isEditMode" class="text-xl font-bold text-white mb-3">{{ localContent.v3_title }}</h4>
          <input v-else v-model="localContent.v3_title" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-2 mb-3 text-white font-bold text-center focus:outline-none">
          
          <p v-if="!isEditMode" class="text-gray-400 text-sm">{{ localContent.v3_desc }}</p>
          <textarea v-else v-model="localContent.v3_desc" rows="4" class="w-full bg-dark/80 border border-indigo-500 rounded-lg p-3 text-sm text-gray-300 text-center focus:outline-none"></textarea>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { supabase } from '../supabase'

const isEditMode = inject('isEditMode', ref(false))
const isSubmitting = ref(false)
const selectedFile = ref(null)

const defaultData = {
  hero_title_1: 'Tentang',
  hero_title_2: 'WINSMAN',
  hero_subtitle: 'Lebih dari sekadar pakaian, kami adalah kanvas untuk identitas dan kreativitas Anda.',
  story_image: 'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=1000',
  story_title: 'Lahir dari Estetika & Kualitas',
  story_p1: 'Berawal dari kecintaan terhadap detail visual dan standar material yang tinggi, Winsman hadir untuk menjembatani ide-ide kreatif menjadi produk apparel kebanggaan.',
  story_p2: 'Lahir dan berkembang di Pekalongan—kota yang kaya akan warisan dan pemahaman mendalam tentang industri tekstil—kami memadukan keahlian desain grafis modern dengan ketelitian konveksi premium. Kami mengerti bahwa sebuah desain kaos yang hebat membutuhkan lebih dari sekadar gambar yang bagus; ia membutuhkan eksekusi teknis yang sempurna.',
  story_p3: 'Oleh karena itu, setiap helai pakaian yang keluar dari ruang produksi kami telah melewati kurasi ketat. Dari pemilihan benang katun kombed paling lembut, hingga proses sablon presisi tinggi yang menjamin ketajaman warna dan daya tahan maksimal.',
  values_title: 'Nilai Inti Kami',
  v1_title: 'Premium Quality',
  v1_desc: 'Berkomitmen penuh pada penggunaan material Grade A yang menjamin kenyamanan dan keawetan pakaian untuk jangka panjang.',
  v2_title: 'Pixel Perfect Design',
  v2_desc: 'Dengan standar desain grafis profesional, kami memastikan setiap goresan desain Anda dicetak dengan presisi warna dan detail yang akurat.',
  v3_title: 'Customer Centric',
  v3_desc: 'Fleksibilitas pesanan tanpa minimum order dan pelayanan yang responsif untuk memastikan kepuasan setiap pelanggan.'
}

const rawData = ref([])
const localContent = ref({ ...defaultData })

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0]
}

const fetchPageContent = async () => {
  const { data, error } = await supabase
    .from('page_contents')
    .select('*')
    .eq('page_slug', 'profil')

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

    // 1. Proses Upload File (Jika admin memilih gambar dari perangkat)
    if (selectedFile.value) {
      const file = selectedFile.value
      const fileExt = file.name.split('.').pop()
      const fileName = `profil-story-${Date.now()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('katalog-images')
        .upload(fileName, file)

      if (uploadError) throw new Error('Gagal mengupload gambar profil: ' + uploadError.message)

      const { data: { publicUrl } } = supabase.storage
        .from('katalog-images')
        .getPublicUrl(fileName)

      // Update URL gambar di state lokal
      localContent.value.story_image = publicUrl
    }
    
    // 2. Simpan semua data teks dan link gambar ke Database
    const promises = Object.keys(localContent.value).map(async (key) => {
      const existingRow = rawData.value.find(item => item.section_key === key)
      
      if (existingRow) {
        return supabase
          .from('page_contents')
          .update({ content: localContent.value[key] })
          .eq('id', existingRow.id)
      } else {
        return supabase
          .from('page_contents')
          .insert({ 
            page_slug: 'profil', 
            section_key: key, 
            content: localContent.value[key] 
          })
      }
    })

    await Promise.all(promises)
    
    // Reset file setelah berhasil
    selectedFile.value = null

    alert('Halaman Profil berhasil diperbarui!')
    isEditMode.value = false 
    fetchPageContent() 
    
  } catch (err) {
    alert('Terjadi kesalahan saat menyimpan: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  fetchPageContent()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>