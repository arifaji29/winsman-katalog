<template>
  <div class="flex flex-col items-center min-h-screen pb-16 relative">
    
    <!-- TOMBOL SIMPAN (Hanya muncul saat Mode Edit aktif) -->
    <transition name="fade">
      <div v-if="isEditMode" class="fixed bottom-10 right-6 md:right-10 z-100">
        <button @click="saveAllChanges" :disabled="isSubmitting" class="px-6 md:px-8 py-4 bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white font-bold rounded-full shadow-[0_0_20px_rgba(22,163,74,0.5)] flex items-center gap-2 transition duration-300">
          <svg v-if="isSubmitting" class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan FAQ' }}
        </button>
      </div>
    </transition>

    <!-- BAGIAN 1: HEADER -->
    <div class="text-center mb-12 w-full max-w-4xl px-4 pt-12">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-6 flex flex-col md:flex-row items-center justify-center gap-2 text-white">
        <template v-if="!isEditMode">
          {{ localContent.hero_title_1 || defaultData.hero_title_1 }}
          <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">{{ localContent.hero_title_2 || defaultData.hero_title_2 }}</span>
        </template>
        <template v-else>
          <input v-model="localContent.hero_title_1" class="bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
          <input v-model="localContent.hero_title_2" class="bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 text-center text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
        </template>
      </h1>

      <p v-if="!isEditMode" class="text-gray-400 max-w-2xl mx-auto leading-relaxed">{{ localContent.hero_subtitle }}</p>
      <textarea v-else v-model="localContent.hero_subtitle" rows="2" class="w-full max-w-2xl mx-auto bg-dark/80 border border-indigo-500 rounded-xl p-3 text-center text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
    </div>

    <!-- BAGIAN 2: DAFTAR FAQ -->
    <div class="w-full max-w-3xl px-4 md:px-0 flex flex-col gap-4">
      
      <!-- TAMPILAN BACA (READ MODE) -->
      <template v-if="!isEditMode">
        <template v-for="i in 5" :key="`view-${i}`">
          <!-- Hanya tampilkan FAQ jika pertanyaannya tidak kosong -->
          <div v-if="localContent['faq_'+i+'_q']" class="glass rounded-2xl overflow-hidden border border-white/5 transition-all duration-300">
            <button @click="toggleFaq(i)" class="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none hover:bg-white/5 transition">
              <span class="font-bold text-lg text-white pr-4">{{ i }}. {{ localContent['faq_'+i+'_q'] }}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-6 w-6 text-indigo-400 shrink-0 transition-transform duration-300" 
                :class="openFaq === i ? 'rotate-180' : ''"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <!-- Konten Jawaban (Buka/Tutup) -->
            <div 
              class="px-6 text-gray-300 leading-relaxed overflow-hidden transition-all duration-300 ease-in-out"
              :class="openFaq === i ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 py-0 opacity-0'"
            >
              <div class="h-px w-full bg-white/10 mb-4"></div>
              {{ localContent['faq_'+i+'_a'] }}
            </div>
          </div>
        </template>
      </template>

      <!-- TAMPILAN EDIT (EDIT MODE) -->
      <template v-else>
        <div class="bg-indigo-500/20 border border-indigo-500/50 p-4 rounded-xl text-indigo-300 text-sm flex items-start gap-3 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <p>Jika ada slot FAQ yang tidak ingin digunakan, cukup <strong>kosongkan kotak pertanyaannya</strong>. FAQ tersebut akan disembunyikan secara otomatis di halaman publik.</p>
        </div>

        <div v-for="i in 5" :key="`edit-${i}`" class="glass p-6 rounded-2xl border border-indigo-500/50 flex flex-col gap-4">
          <span class="text-indigo-400 font-bold border-b border-indigo-500/30 pb-2">FAQ {{ i }}</span>
          
          <div>
            <label class="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Pertanyaan</label>
            <input v-model="localContent['faq_'+i+'_q']" placeholder="Ketik pertanyaan di sini..." class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:outline-none focus:border-indigo-500 transition">
          </div>
          
          <div>
            <label class="block text-xs text-gray-400 uppercase tracking-wider font-bold mb-2">Jawaban</label>
            <textarea v-model="localContent['faq_'+i+'_a']" rows="4" placeholder="Ketik jawaban di sini..." class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition resize-none"></textarea>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { supabase } from '../supabase'

// Mengambil status Mode Edit dari App.vue
const isEditMode = inject('isEditMode', ref(false))
const isSubmitting = ref(false)

// State untuk mengatur Akordeon FAQ mana yang terbuka
const openFaq = ref(1) // Default FAQ pertama terbuka

const toggleFaq = (index) => {
  if (openFaq.value === index) {
    openFaq.value = null // Tutup jika yang diklik sudah terbuka
  } else {
    openFaq.value = index // Buka yang baru
  }
}

// Data Default Teks FAQ
const defaultData = {
  hero_title_1: 'Tanya',
  hero_title_2: 'Jawab',
  hero_subtitle: 'Temukan jawaban cepat untuk pertanyaan yang sering diajukan seputar layanan Winsman.',
  
  faq_1_q: 'Kaosnya pakai bahan apa?',
  faq_1_a: 'Kami menggunakan bahan Katun Kombed (Cotton Combed) kualitas premium (umumnya 24s dan 30s). Bahan ini sangat lembut, menyerap keringat dengan baik, tidak kaku, dan sangat nyaman digunakan untuk aktivitas sehari-hari maupun luar ruangan.',
  
  faq_2_q: 'Bisa pesan satuan apa tidak?',
  faq_2_a: 'Tentu saja bisa! Kami melayani pemesanan tanpa minimum order (tanpa batas). Anda bisa mewujudkan ide desain Anda meskipun hanya memesan 1 pcs kaos.',
  
  faq_3_q: 'Bisa pakai desain sendiri?',
  faq_3_a: 'Sangat bisa. Konsep utama kami adalah custom apparel, jadi Anda bebas mengirimkan desain, gambar, atau foto yang ingin dicetak di kaos Anda.',
  
  faq_4_q: 'Berapa lama proses pengerjaannya?',
  faq_4_a: 'Estimasi waktu pengerjaan bervariasi tergantung antrian dan jumlah pesanan. Untuk pesanan satuan, normalnya memakan waktu 2-3 hari kerja. Tim kami akan menginformasikan estimasi yang akurat saat Anda melakukan pemesanan.',
  
  faq_5_q: 'Apakah hasil sablonnya awet?',
  faq_5_a: 'Ya, kami menggunakan teknologi cetak presisi tinggi dan tinta berkualitas sehingga hasil sablon menempel kuat pada kain, warnanya cerah, dan tidak mudah pecah atau luntur jika dicuci sesuai petunjuk.'
}

const rawData = ref([])
const localContent = ref({ ...defaultData })

// FUNGSI READ: Ambil data dari Supabase
const fetchPageContent = async () => {
  const { data, error } = await supabase
    .from('page_contents')
    .select('*')
    .eq('page_slug', 'faq')

  if (!error && data) {
    rawData.value = data
    data.forEach(item => {
      if (localContent.value[item.section_key] !== undefined && item.content) {
        localContent.value[item.section_key] = item.content
      }
    })
  }
}

// FUNGSI UPDATE/INSERT: Simpan perubahan ke Supabase
const saveAllChanges = async () => {
  try {
    isSubmitting.value = true
    
    const promises = Object.keys(localContent.value).map(async (key) => {
      const existingRow = rawData.value.find(item => item.section_key === key)
      const contentToSave = localContent.value[key] || '';

      if (existingRow) {
        return supabase.from('page_contents').update({ content: contentToSave }).eq('id', existingRow.id)
      } else {
        return supabase.from('page_contents').insert({ page_slug: 'faq', section_key: key, content: contentToSave })
      }
    })

    await Promise.all(promises)
    
    alert('Halaman FAQ berhasil diperbarui!')
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