<template>
  <div class="flex items-center justify-center min-h-[70vh] px-6">
    <div class="glass max-w-md w-full p-8 rounded-3xl animate-fade-in-up">
      <div class="text-center mb-8">
        <h2 class="text-3xl font-extrabold text-white mb-2">Login Admin</h2>
        <p class="text-gray-400 text-sm">Masuk untuk mengelola katalog Winsman.</p>
      </div>

      <form @submit.prevent="handleLogin" class="flex flex-col gap-5">
        <div>
          <label class="block text-sm text-gray-400 mb-2">Email</label>
          <input v-model="email" type="email" required placeholder="admin@winsman.com" class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition duration-300">
        </div>

        <div>
          <label class="block text-sm text-gray-400 mb-2">Password</label>
          <input v-model="password" type="password" required placeholder="••••••••" class="w-full bg-dark/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition duration-300">
        </div>

        <button type="submit" :disabled="isLoading" class="mt-4 w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-bold rounded-xl transition duration-300 shadow-[0_0_15px_rgba(79,70,229,0.4)] flex justify-center items-center">
          {{ isLoading ? 'Memeriksa...' : 'Masuk' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'

const router = useRouter()
const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  try {
    isLoading.value = true
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    })

    if (error) throw error

    // Jika sukses, arahkan ke halaman dashboard admin
    router.push('/admin')
  } catch (error) {
    alert('Login Gagal: Email atau Password salah.')
  } finally {
    isLoading.value = false
  }
}
</script>