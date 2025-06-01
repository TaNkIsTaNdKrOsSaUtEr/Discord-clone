<template>
  <div class="h-screen flex flex-col">
    <!-- Компонент авторизации -->
    <AuthForm v-if="!userStore.currentUser" />
    
    <!-- Основной интерфейс -->
    <div v-else class="flex flex-1 overflow-hidden bg-gray-900 text-gray-100">
      <!-- Сайдбар серверов -->
      <div class="w-16 bg-gray-900 flex flex-col items-center py-3 space-y-4">
        <button class="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-700 transition">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        
        <div class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition">
          <span class="font-bold">JS</span>
        </div>
        
        <div class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition">
          <span class="font-bold">V</span>
        </div>
        
        <div class="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center hover:bg-gray-600 cursor-pointer transition">
          <span class="font-bold">R</span>
        </div>
      </div>
      
      <!-- Сайдбар каналов -->
      <div class="w-60 bg-gray-800 flex flex-col">
        <div class="p-4 border-b border-gray-900 shadow-md">
          <h1 class="text-xl font-bold">{{ currentServer.name }}</h1>
        </div>
        
        <div class="flex-1 overflow-y-auto py-2 px-3 space-y-1">
          <div class="text-gray-400 uppercase text-xs font-bold px-2 py-1">Текстовые каналы</div>
          <div 
            v-for="channel in currentServer.channels" 
            :key="channel.id"
            @click="selectChannel(channel.id)"
            class="px-2 py-1 rounded hover:bg-gray-700 cursor-pointer flex items-center"
            :class="{ 'bg-gray-700': activeChannelId === channel.id }"
          >
            <span class="mr-1">#</span>
            {{ channel.name }}
          </div>
          
          <div class="text-gray-400 uppercase text-xs font-bold px-2 py-1 mt-4">Голосовые каналы</div>
          <div 
            v-for="voiceChannel in voiceChannels" 
            :key="voiceChannel.id"
            @click="joinVoiceChannel(voiceChannel.id)"
            class="px-2 py-1 rounded hover:bg-gray-700 cursor-pointer flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            {{ voiceChannel.name }}
          </div>
        </div>
        
        <!-- Панель пользователя -->
        <div class="p-2 bg-gray-900 flex items-center">
          <img 
            :src="userStore.currentUser.avatar" 
            class="w-8 h-8 rounded-full mr-2"
          />
          <div class="flex-1 min-w-0">
            <div class="font-medium truncate">{{ userStore.currentUser.name }}</div>
            <div class="text-xs text-green-500">Online</div>
          </div>
          <div class="flex space-x-1">
            <button class="p-1 rounded hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>
            <button class="p-1 rounded hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      <!-- Основная область чата -->
      <div class="flex-1 flex flex-col">
        <!-- Заголовок канала -->
        <div class="h-12 flex items-center px-4 shadow-sm border-b border-gray-700">
          <div class="flex items-center">
            <span class="mr-2 text-gray-400">#</span>
            <span class="font-bold">{{ currentChannel?.name || 'general' }}</span>
          </div>
          <div class="ml-4 text-sm text-gray-400">{{ channelTopic }}</div>
          
          <div class="ml-auto flex items-center space-x-3">
            <button class="p-1 rounded hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button class="p-1 rounded hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button class="p-1 rounded hover:bg-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Список сообщений -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          <div v-for="msg in messages" :key="msg.id">
            <div class="flex items-start space-x-3 group">
              <img 
                :src="msg.user.avatar" 
                class="w-10 h-10 rounded-full mt-1"
              />
              <div class="flex-1 min-w-0">
                <div class="flex items-baseline">
                  <span class="font-bold mr-2">{{ msg.user.name }}</span>
                  <span class="text-xs text-gray-400">{{ formatTime(msg.timestamp) }}</span>
                </div>
                <div class="mt-1">
                  {{ msg.text }}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Ввод сообщения -->
        <div class="p-4">
          <div class="bg-gray-700 rounded-lg px-4 py-2">
            <input 
              v-model="newMessage"
              @keyup.enter="sendMessage"
              class="w-full bg-transparent focus:outline-none"
              :placeholder="`Написать сообщение в #${currentChannel?.name || 'general'}`"
            />
          </div>
        </div>
      </div>
      
      <!-- Сайдбар участников -->
      <div class="w-60 bg-gray-800 hidden md:block">
        <div class="p-4 border-b border-gray-900">
          <h2 class="font-bold">УЧАСТНИКИ — {{ onlineUsers.length }}</h2>
        </div>
        
        <div class="p-3 space-y-2 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div 
            v-for="user in onlineUsers" 
            :key="user.id"
            class="flex items-center p-2 rounded hover:bg-gray-700"
          >
            <div class="relative">
              <img 
                :src="user.avatar" 
                class="w-8 h-8 rounded-full mr-2"
              />
              <div class="absolute bottom-0 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            <span class="truncate">{{ user.name }}</span>
            <div class="ml-auto flex space-x-1">
              <button 
                @click="startVoiceCall(user.id, user.name)"
                class="p-1 rounded hover:bg-gray-600"
                title="Позвонить"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </button>
              <button class="p-1 rounded hover:bg-gray-600" title="Личное сообщение">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Компонент голосового вызова -->
    <VoiceCall v-if="callState !== 'idle'" 
      :callState="callState"
      :callerName="callerName"
      @endCall="endCall"
      @toggleMute="toggleMute"
      :isMuted="isMuted"
    />
    
    <!-- Уведомления -->
    <div v-if="notification" class="fixed top-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg max-w-sm z-50">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="font-medium">{{ notification.title }}</h3>
          <p class="mt-1 text-sm text-gray-300">{{ notification.message }}</p>
        </div>
        <button @click="notification = null" class="ml-4 text-gray-400 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useUserStore } from '@/stores/user'
import { useChatStore } from '@/stores/chat'
import { io } from 'socket.io-client'
import AuthForm from '@/components/AuthForm.vue'
import VoiceCall from '@/components/VoiceCall.vue'

// Хранилища
const userStore = useUserStore()
const chatStore = useChatStore()

// Состояние чата
const newMessage = ref('')
const messages = ref([
  {
    id: 1,
    user: {
      id: 'system',
      name: 'Discord Clone',
      avatar: 'https://cdn-icons-png.flaticon.com/512/2111/2111370.png'
    },
    text: 'Добро пожаловать в чат! Начните общение с другими участниками.',
    timestamp: new Date()
  }
])

// Состояние звонка
const callState = ref('idle') // 'idle', 'incoming', 'active'
const callerName = ref('')
const isMuted = ref(false)

// Уведомления
const notification = ref(null)

// Сокет
const socket = ref(null)

// Серверы и каналы
const servers = ref([
  {
    id: '1',
    name: 'Сервер программистов',
    channels: [
      { id: 'general', name: 'общий-чат', topic: 'Обсуждение общих вопросов' },
      { id: 'vue', name: 'vue-js', topic: 'Обсуждение Vue.js' },
      { id: 'webrtc', name: 'webrtc', topic: 'Аудио/видео коммуникации' }
    ],
    voiceChannels: [
      { id: 'voice-1', name: 'Общий голосовой' },
      { id: 'voice-2', name: 'Игровой' }
    ]
  }
])

const currentServer = computed(() => servers.value[0])
const currentChannel = computed(() => 
  currentServer.value.channels.find(c => c.id === chatStore.activeChannelId) || 
  currentServer.value.channels[0]
)
const voiceChannels = computed(() => currentServer.value.voiceChannels)
const channelTopic = computed(() => currentChannel.value?.topic || '')
const activeChannelId = computed(() => chatStore.activeChannelId)

// Пользователи онлайн
const onlineUsers = ref([
  {
    id: 'user1',
    name: 'Алексей Программист',
    avatar: 'https://i.pravatar.cc/150?u=user1'
  },
  {
    id: 'user2',
    name: 'Мария Дизайнер',
    avatar: 'https://i.pravatar.cc/150?u=user2'
  },
  {
    id: 'user3',
    name: 'Иван Тестировщик',
    avatar: 'https://i.pravatar.cc/150?u=user3'
  }
])

// Форматирование времени
const formatTime = (date) => {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// Инициализация сокета
const initSocket = () => {
  socket.value = io('http://localhost:3000')
  
  socket.value.on('connect', () => {
    showNotification('Подключено', 'Успешное подключение к серверу')
  })
  
  socket.value.on('disconnect', () => {
    showNotification('Отключено', 'Соединение с сервером потеряно')
  })
  
  socket.value.on('new-message', (msg) => {
    messages.value.push({
      ...msg,
      timestamp: new Date()
    })
  })
  
  socket.value.on('call-incoming', (data) => {
    callState.value = 'incoming'
    callerName.value = data.callerName
    showNotification('Входящий вызов', `${data.callerName} звонит вам`)
  })
}

// Отправка сообщения
const sendMessage = () => {
  if (newMessage.value.trim() && userStore.currentUser) {
    const msg = {
      id: Date.now(),
      user: {
        id: userStore.currentUser.id,
        name: userStore.currentUser.name,
        avatar: userStore.currentUser.avatar
      },
      text: newMessage.value,
      timestamp: new Date(),
      channel: activeChannelId.value
    }
    
    messages.value.push(msg)
    socket.value.emit('send-message', {
      text: newMessage.value,
      channel: activeChannelId.value
    })
    
    newMessage.value = ''
  }
}

// Управление звонками
const startVoiceCall = (userId, userName) => {
  callerName.value = userName
  callState.value = 'active'
  socket.value.emit('call-user', {
    to: userId,
    callerId: userStore.currentUser.id,
    callerName: userStore.currentUser.name
  })
}

const endCall = () => {
  callState.value = 'idle'
  socket.value.emit('call-end')
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
}

// Уведомления
const showNotification = (title, message) => {
  notification.value = { title, message }
  setTimeout(() => {
    notification.value = null
  }, 5000)
}

// Выбор канала
const selectChannel = (channelId) => {
  chatStore.selectChannel(channelId)
  messages.value = []
}

// Присоединение к голосовому каналу
const joinVoiceChannel = (channelId) => {
  showNotification('Голосовой канал', `Вы присоединились к ${voiceChannels.value.find(c => c.id === channelId)?.name}`)
}

// Инициализация
onMounted(() => {
  if (userStore.currentUser) {
    initSocket()
  }
})

// Очистка
onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect()
  }
})
</script>

<style>
/* Стили для скроллбара */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #2f3136;
}

::-webkit-scrollbar-thumb {
  background: #202225;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
