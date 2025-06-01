<template>
  <div class="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
    <div class="bg-gray-800 p-8 rounded-xl w-full max-w-md">
      <h2 class="text-2xl font-bold mb-6 text-center">Вход в Discord Clone</h2>
      <input 
        v-model="username"
        class="w-full bg-gray-700 p-3 rounded-lg mb-4"
        placeholder="Ваше имя"
      >
      <button 
        @click="login"
        class="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold"
      >
        Продолжить
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'

const username = ref('')
const userStore = useUserStore()

const login = () => {
  if (username.value.trim()) {
    userStore.setUser({
      id: Date.now().toString(),
      name: username.value,
      avatar: `https://i.pravatar.cc/150?u=${Date.now()}`
    })
  }
}
</script>
