<template>
  <div class="flex flex-col items-center min-h-screen pb-16">
    
    <div class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-extrabold mb-4">Hubungi <span class="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 to-purple-500">Kami</span></h1>
      <p class="text-gray-400 max-w-2xl mx-auto">Punya pertanyaan seputar desain, bahan, atau ingin langsung memesan? Jangan ragu untuk menghubungi tim Winsman.</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-10 w-full max-w-6xl">
      
      <!-- Bagian Kiri: Kartu Informasi Kontak -->
      <div class="w-full lg:w-5/12 flex flex-col gap-6">
        
        <!-- Kartu WhatsApp -->
        <a href="https://wa.me/6289673433900" target="_blank" rel="noopener noreferrer" class="glass p-6 rounded-2xl flex items-center gap-6 hover:-translate-y-2 hover:bg-white/10 transition duration-300 group">
          <div class="w-14 h-14 rounded-full bg-green-500/20 flex items-center justify-center text-green-400 group-hover:scale-110 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-gray-400 text-sm font-medium mb-1">WhatsApp (Fast Response)</h3>
            <p class="text-xl font-bold text-white group-hover:text-green-400 transition">+62 896-7343-3900</p>
          </div>
        </a>

        <!-- Kartu Email (Baru) -->
        <a href="mailto:winsmanfashion32@gmail.com" class="glass p-6 rounded-2xl flex items-center gap-6 hover:-translate-y-2 hover:bg-white/10 transition duration-300 group">
          <div class="w-14 h-14 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            </svg>
          </div>
          <div class="overflow-hidden">
            <h3 class="text-gray-400 text-sm font-medium mb-1">Email</h3>
            <p class="text-lg md:text-xl font-bold text-white group-hover:text-indigo-400 transition truncate">winsmanfashion32@gmail.com</p>
          </div>
        </a>

        <!-- Kartu Instagram -->
        <a href="https://instagram.com/winsman.fashion" target="_blank" rel="noopener noreferrer" class="glass p-6 rounded-2xl flex items-center gap-6 hover:-translate-y-2 hover:bg-white/10 transition duration-300 group">
          <div class="w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center text-pink-400 group-hover:scale-110 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
          </div>
          <div>
            <h3 class="text-gray-400 text-sm font-medium mb-1">Instagram</h3>
            <p class="text-xl font-bold text-white group-hover:text-pink-400 transition">@winsman.fashion</p>
          </div>
        </a>

        <!-- Kartu Facebook -->
        <a href="https://facebook.com/winsman.fashion" target="_blank" rel="noopener noreferrer" class="glass p-6 rounded-2xl flex items-center gap-6 hover:-translate-y-2 hover:bg-white/10 transition duration-300 group">
          <div class="w-14 h-14 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
          </div>
          <div>
            <h3 class="text-gray-400 text-sm font-medium mb-1">Facebook</h3>
            <p class="text-xl font-bold text-white group-hover:text-blue-400 transition">@winsman.fashion</p>
          </div>
        </a>

      </div>

      <!-- Bagian Kanan: Formulir Pesan (Mockup) -->
      <div class="w-full lg:w-7/12 glass p-8 md:p-10 rounded-3xl">
        <h2 class="text-2xl font-bold text-white mb-6">Kirim Pesan Langsung</h2>
        <form @submit.prevent="submitForm" class="flex flex-col gap-5">
          
          <div class="flex flex-col md:flex-row gap-5">
            <div class="flex-1">
              <label class="block text-sm text-gray-400 mb-2" for="name">Nama Lengkap</label>
              <input type="text" id="name" placeholder="Masukkan nama Anda" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition duration-300">
            </div>
            <div class="flex-1">
              <label class="block text-sm text-gray-400 mb-2" for="email">Alamat Email</label>
              <input type="email" id="email" placeholder="nama@email.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition duration-300">
            </div>
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2" for="subject">Subjek / Keperluan</label>
            <input type="text" id="subject" placeholder="Contoh: Tanya harga sablon 24s" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition duration-300">
          </div>

          <div>
            <label class="block text-sm text-gray-400 mb-2" for="message">Pesan Anda</label>
            <textarea id="message" rows="4" placeholder="Tuliskan detail pertanyaan atau pesanan Anda di sini..." class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition duration-300 resize-none"></textarea>
          </div>

          <button type="submit" class="mt-2 w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition duration-300 shadow-[0_0_15px_rgba(79,70,229,0.4)]">
            Kirim Pesan
          </button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
const submitForm = () => {
  alert('Terima kasih! Pesan Anda telah terkirim (Ini adalah simulasi form). Silakan hubungi kami via WhatsApp atau Email untuk respon cepat.');
}
</script>