import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const currentUser = ref(null)
  
  const setUser = (user) => {
    currentUser.value = user
    localStorage.setItem('discord-user', JSON.stringify(user))
  }
  
  // Восстановление из localStorage
  const savedUser = localStorage.getItem('discord-user')
  if (savedUser) currentUser.value = JSON.parse(savedUser)
  
  return { currentUser, setUser }
})
