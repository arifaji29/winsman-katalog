<template>
  <div class="flex flex-col items-center min-h-screen pb-16">
    
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Tanya <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">Jawab</span></h1>
      <p class="text-gray-400 max-w-2xl mx-auto">Temukan jawaban cepat untuk pertanyaan yang sering diajukan seputar layanan Winsman.</p>
    </div>

    <div class="w-full max-w-3xl flex flex-col gap-4">
      <div 
        v-for="(item, index) in faqs" 
        :key="index" 
        class="glass rounded-2xl overflow-hidden transition-all duration-300"
      >
        <button 
          @click="toggleFaq(index)" 
          class="w-full px-6 py-5 flex justify-between items-center text-left focus:outline-none hover:bg-white/10 transition duration-300"
        >
          <span class="text-lg font-bold text-white pr-4">{{ item.question }}</span>
          <svg 
            :class="{'rotate-180 text-indigo-400': activeIndex === index, 'text-gray-400': activeIndex !== index}" 
            class="w-6 h-6 transform transition-transform duration-300 shrink-0" 
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div 
          v-show="activeIndex === index" 
          class="px-6 pb-6 text-gray-300"
        >
          <div class="w-full h-px bg-white/10 mb-4"></div>
          <p class="leading-relaxed">{{ item.answer }}</p>
        </div>
      </div>
    </div>

    <div class="mt-16 text-center glass p-8 rounded-3xl max-w-2xl w-full">
      <h3 class="text-xl font-bold text-white mb-2">Masih punya pertanyaan lain?</h3>
      <p class="text-gray-400 mb-6">Tim kami siap membantu mewujudkan ide desain Anda.</p>
      <router-link to="/kontak" class="inline-block px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-full transition duration-300 shadow-[0_0_15px_rgba(79,70,229,0.5)]">
        Hubungi Kami
      </router-link>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

// Menyimpan index pertanyaan yang sedang terbuka (null = semua tertutup, 0 = buka yang pertama)
const activeIndex = ref(0) 

// Fungsi untuk membuka/menutup jawaban
const toggleFaq = (index) => {
  if (activeIndex.value === index) {
    activeIndex.value = null // Tutup jika diklik lagi
  } else {
    activeIndex.value = index // Buka yang diklik
  }
}

// Data 4 Pertanyaan dari Anda beserta jawabannya
const faqs = [
  {
    question: "1. Kaosnya pakai bahan apa?",
    answer: "Kami menggunakan bahan Katun Kombed (Cotton Combed) kualitas premium (umumnya 24s dan 30s). Bahan ini sangat lembut, menyerap keringat dengan baik, tidak kaku, dan sangat nyaman digunakan untuk aktivitas sehari-hari maupun luar ruangan."
  },
  {
    question: "2. Bisa pesan satuan apa tidak?",
    answer: "Tentu saja bisa! Winsman melayani pemesanan tanpa minimum order. Anda bebas memesan walaupun hanya 1 pcs untuk koleksi pribadi yang eksklusif."
  },
  {
    question: "3. Bisa pakai desain sendiri?",
    answer: "Sangat bisa. Karena konsep kami adalah 'Custom Apparel', Anda bebas berkreasi menggunakan desain, logo, atau ilustrasi milik Anda sendiri. Tim kami akan memastikan visual desain Anda dicetak dengan presisi tinggi di atas pakaian."
  },
  {
    question: "4. Harganya mulai berapa?",
    answer: "Harga cukup bervariasi menyesuaikan tingkat kerumitan desain, ukuran sablon, dan jumlah pesanan. Namun untuk pemesanan custom satuan, harga kami mulai dari Rp 120.000. Tersedia harga khusus (lebih murah) untuk pemesanan skala besar atau komunitas."
  }
]
</script>