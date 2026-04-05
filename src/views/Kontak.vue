<template>
  <div class="flex flex-col items-center min-h-screen pb-16 relative">
    
    <!-- TOMBOL SIMPAN (Hanya muncul saat Mode Edit aktif) -->
    <transition name="fade">
      <div v-if="isEditMode" class="fixed bottom-10 right-6 md:right-10 z-100">
        <button @click="saveAllChanges" :disabled="isSubmitting" class="px-6 md:px-8 py-4 bg-green-600 hover:bg-green-500 disabled:bg-green-800 text-white font-bold rounded-full shadow-[0_0_20px_rgba(22,163,74,0.5)] flex items-center gap-2 transition duration-300">
          <svg v-if="isSubmitting" class="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>
          {{ isSubmitting ? 'Menyimpan...' : 'Simpan Perubahan Kontak' }}
        </button>
      </div>
    </transition>

    <!-- BAGIAN 1: HEADER -->
    <div class="text-center mb-16 w-full max-w-4xl px-4 pt-12">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-6 flex flex-col md:flex-row items-center justify-center gap-2 text-white">
        <template v-if="!isEditMode">
          {{ localContent.hero_title_1 }}
          <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">{{ localContent.hero_title_2 }}</span>
        </template>
        <template v-else>
          <input v-model="localContent.hero_title_1" class="bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 text-center text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
          <input v-model="localContent.hero_title_2" class="bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 text-center text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-auto">
        </template>
      </h1>

      <p v-if="!isEditMode" class="text-gray-400 max-w-2xl mx-auto leading-relaxed">{{ localContent.hero_subtitle }}</p>
      <textarea v-else v-model="localContent.hero_subtitle" rows="2" class="w-full max-w-2xl mx-auto bg-dark/80 border border-indigo-500 rounded-xl p-3 text-center text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
    </div>

    <div class="flex flex-col lg:flex-row gap-10 w-full max-w-6xl px-4 md:px-0">
      
      <!-- Bagian Kiri: Kartu Informasi Kontak -->
      <div class="w-full lg:w-5/12 flex flex-col gap-6">
        
        <!-- Kartu WhatsApp -->
        <div class="glass p-6 rounded-2xl flex items-center gap-6 hover:-translate-y-2 hover:bg-white/10 transition duration-300 group border border-white/5">
          <div class="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition duration-300 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <div class="w-full">
            <h3 class="text-gray-400 text-sm font-medium mb-1">WhatsApp (Fast Response)</h3>
            <a v-if="!isEditMode" :href="`https://wa.me/${cleanWaNumber(localContent.contact_wa)}`" target="_blank" rel="noopener noreferrer" class="text-xl font-bold text-white group-hover:text-green-400 transition block">
              {{ localContent.contact_wa }}
            </a>
            <input v-else v-model="localContent.contact_wa" class="w-full bg-dark/80 border border-indigo-500 rounded-lg px-3 py-1 text-white font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500">
          </div>
        </div>

        <!-- Kartu Email -->
        <div class="glass p-6 rounded-2xl flex items-center gap-6 hover:-translate-y-2 hover:bg-white/10 transition duration-300 group border border-white/5">
          <div class="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition duration-300 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div class="w-full overflow-hidden">
            <h3 class="text-gray-400 text-sm font-medium mb-1">Email</h3>
            <a v-if="!isEditMode" :href="`mailto:${localContent.contact_email}`" class="text-lg md:text-xl font-bold text-white group-hover:text-indigo-400 transition truncate block">
              {{ localContent.contact_email }}
            </a>
            <input v-else v-model="localContent.contact_email" class="w-full bg-dark/80 border border-indigo-500 rounded-lg px-3 py-1 text-white font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500">
          </div>
        </div>

        <!-- Kartu Instagram -->
        <div class="glass p-6 rounded-2xl flex items-center gap-6 hover:-translate-y-2 hover:bg-white/10 transition duration-300 group border border-white/5">
          <div class="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition duration-300 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <div class="w-full">
            <h3 class="text-gray-400 text-sm font-medium mb-1">Instagram</h3>
            <a v-if="!isEditMode" :href="`https://instagram.com/${cleanUsername(localContent.contact_ig)}`" target="_blank" rel="noopener noreferrer" class="text-xl font-bold text-white group-hover:text-pink-400 transition block">
              {{ localContent.contact_ig }}
            </a>
            <input v-else v-model="localContent.contact_ig" class="w-full bg-dark/80 border border-indigo-500 rounded-lg px-3 py-1 text-white font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500">
          </div>
        </div>

        <!-- Kartu Facebook -->
        <div class="glass p-6 rounded-2xl flex items-center gap-6 hover:-translate-y-2 hover:bg-white/10 transition duration-300 group border border-white/5">
          <div class="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition duration-300 shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </div>
          <div class="w-full">
            <h3 class="text-gray-400 text-sm font-medium mb-1">Facebook</h3>
            <a v-if="!isEditMode" :href="`https://facebook.com/${cleanUsername(localContent.contact_fb)}`" target="_blank" rel="noopener noreferrer" class="text-xl font-bold text-white group-hover:text-blue-400 transition block">
              {{ localContent.contact_fb }}
            </a>
            <input v-else v-model="localContent.contact_fb" class="w-full bg-dark/80 border border-indigo-500 rounded-lg px-3 py-1 text-white font-bold focus:outline-none focus:ring-1 focus:ring-indigo-500">
          </div>
        </div>

      </div>

      <!-- Bagian Kanan: Formulir Pesan Langsung -->
      <div class="w-full lg:w-7/12 glass p-8 md:p-10 rounded-3xl border border-white/5">
        
        <h2 v-if="!isEditMode" class="text-2xl font-bold text-white mb-6">{{ localContent.form_title }}</h2>
        <input v-else v-model="localContent.form_title" class="w-full bg-dark/80 border border-indigo-500 rounded-lg px-4 py-2 mb-6 text-white font-bold text-2xl focus:outline-none focus:ring-1 focus:ring-indigo-500">

        <form @submit.prevent="sendMessageToWhatsApp" class="flex flex-col gap-5">
          
          <div class="flex flex-col md:flex-row gap-5">
            <div class="flex-1">
              <label class="block text-sm text-gray-400 mb-2" for="name">Nama Lengkap</label>
              <input v-model="form.name" type="text" id="name" placeholder="Masukkan nama Anda" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition duration-300">
            </div>
            <div class="flex-1">
              <label class="block text-sm text-gray-400 mb-2" for="email">Alamat Email</label>
              <input v-model="form.email" type="email" id="email" placeholder="nama@email.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition duration-300">
            </div>
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2" for="subject">Subjek / Keperluan</label>
            <input v-model="form.subject" type="text" id="subject" placeholder="Contoh: Tanya harga sablon 24s" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition duration-300">
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2" for="message">Pesan Anda</label>
            <textarea v-model="form.message" id="message" rows="4" placeholder="Tuliskan detail pertanyaan atau pesanan Anda di sini..." required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition duration-300 resize-none"></textarea>
          </div>

          <div v-if="isEditMode" class="bg-indigo-500/20 border border-indigo-500/50 p-4 rounded-xl text-indigo-300 text-sm flex items-start gap-3 mt-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <p>Formulir di bawah ini akan otomatis mengirim pesan ke nomor WhatsApp <strong>{{ localContent.contact_wa }}</strong> yang Anda atur di sebelah kiri saat pengunjung menekan tombol kirim.</p>
          </div>

          <button type="submit" class="mt-2 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition duration-300 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            Kirim Pesan Langsung
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { supabase } from '../supabase'

// Mengambil status Mode Edit dari App.vue
const isEditMode = inject('isEditMode', ref(false))
const isSubmitting = ref(false)

// State Form Pesan Pengunjung
const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// Data Default Teks Kontak
const defaultData = {
  hero_title_1: 'Hubungi',
  hero_title_2: 'Kami',
  hero_subtitle: 'Punya pertanyaan seputar desain, bahan, atau ingin langsung memesan? Jangan ragu untuk menghubungi tim Winsman.',
  contact_wa: '+62 896-7343-3900',
  contact_email: 'winsmanfashion32@gmail.com',
  contact_ig: '@winsman.fashion',
  contact_fb: '@winsman.fashion',
  form_title: 'Kirim Pesan Langsung'
}

const rawData = ref([])
const localContent = ref({ ...defaultData })

// Helper Pembersih Teks untuk URL Dinamis
const cleanWaNumber = (num) => {
  if (!num) return '';
  let cleaned = num.replace(/\D/g, ''); 
  if (cleaned.startsWith('0')) cleaned = '62' + cleaned.substring(1);
  return cleaned;
}

const cleanUsername = (username) => {
  if (!username) return '';
  return username.replace('@', '').trim();
}

// FUNGSI READ: Ambil data dari Supabase
const fetchPageContent = async () => {
  const { data, error } = await supabase
    .from('page_contents')
    .select('*')
    .eq('page_slug', 'kontak')

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
        return supabase.from('page_contents').insert({ page_slug: 'kontak', section_key: key, content: contentToSave })
      }
    })

    await Promise.all(promises)
    
    alert('Halaman Kontak berhasil diperbarui!')
    isEditMode.value = false 
    fetchPageContent() 
    
  } catch (err) {
    alert('Terjadi kesalahan saat menyimpan: ' + err.message)
  } finally {
    isSubmitting.value = false
  }
}

// FUNGSI FORM: Kirim data ke WhatsApp Admin
const sendMessageToWhatsApp = () => {
  if(isEditMode.value) {
    alert("Silakan matikan Mode Edit terlebih dahulu untuk mencoba fitur kirim pesan.");
    return;
  }

  const waNumber = cleanWaNumber(localContent.value.contact_wa);
  const messageText = `Halo Admin Winsman,\n\nSaya *${form.value.name}*.\nKeperluan: *${form.value.subject}*\nEmail: ${form.value.email ? form.value.email : '-'}\n\nPesan:\n"${form.value.message}"`;
  const encodedMessage = encodeURIComponent(messageText);

  window.open(`https://wa.me/${waNumber}?text=${encodedMessage}`, '_blank');
  
  form.value = { name: '', email: '', subject: '', message: '' };
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