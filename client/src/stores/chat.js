import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useChatStore = defineStore('chat', () => {
  const servers = ref([
    {
      id: '1',
      name: 'Сервер программистов',
      channels: [
        { id: 'general', name: 'Общий чат' },
        { id: 'vue', name: 'Vue.js' },
        { id: 'webrtc', name: 'WebRTC' }
      ]
    }
  ])
  
  const activeServerId = ref(servers.value[0].id)
  const activeChannelId = ref(servers.value[0].channels[0].id)
  
  const currentServer = computed(() => 
    servers.value.find(s => s.id === activeServerId.value)
  )
  
  const selectChannel = (channelId) => {
    activeChannelId.value = channelId
  }
  
  return {
    servers,
    activeServerId,
    activeChannelId,
    currentServer,
    selectChannel
  }
})
