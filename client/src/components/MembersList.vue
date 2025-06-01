<template>
  <div class="w-60 bg-gray-800 h-full flex flex-col">
    <!-- Заголовок списка участников -->
    <div class="p-4 border-b border-gray-900">
      <h2 class="font-bold text-sm uppercase tracking-wide text-gray-400">
        УЧАСТНИКИ — {{ onlineUsers.length }}
      </h2>
    </div>
    
    <!-- Список участников -->
    <div class="flex-1 overflow-y-auto p-2 space-y-1">
      <div 
        v-for="user in onlineUsers" 
        :key="user.id"
        class="flex items-center p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer group"
      >
        <!-- Аватар и индикатор онлайн-статуса -->
        <div class="relative mr-2">
          <img 
            :src="user.avatar" 
            class="w-8 h-8 rounded-full object-cover"
          />
          <div 
            class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800"
            :class="{
              'bg-green-500': user.status === 'online',
              'bg-yellow-500': user.status === 'idle',
              'bg-red-500': user.status === 'dnd',
              'bg-gray-500': user.status === 'offline'
            }"
          ></div>
        </div>
        
        <!-- Имя пользователя и статус -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center">
            <span class="font-medium text-sm truncate">{{ user.name }}</span>
            <span v-if="user.bot" class="ml-2 bg-indigo-500 text-xxs px-1 rounded">BOT</span>
          </div>
          <div class="text-xs text-gray-400 truncate">
            {{ userActivity(user) }}
          </div>
        </div>
        
        <!-- Кнопки действий -->
        <div class="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            v-if="!user.bot"
            @click.stop="startVoiceCall(user.id, user.name)"
            class="p-1 rounded hover:bg-gray-600 text-gray-300 hover:text-white"
            title="Начать звонок"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          
          <button 
            class="p-1 rounded hover:bg-gray-600 text-gray-300 hover:text-white"
            title="Отправить сообщение"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
          
          <button 
            class="p-1 rounded hover:bg-gray-600 text-gray-300 hover:text-white"
            title="Друзья"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Разделитель ботов -->
      <div v-if="botUsers.length > 0" class="pt-4 mt-2 border-t border-gray-700">
        <div class="text-xs font-bold uppercase text-gray-400 px-2 py-1">Боты</div>
        <div 
          v-for="bot in botUsers" 
          :key="bot.id"
          class="flex items-center p-2 rounded hover:bg-gray-700 transition-colors cursor-pointer group"
        >
          <div class="relative mr-2">
            <img 
              :src="bot.avatar" 
              class="w-8 h-8 rounded-full object-cover"
            />
            <div class="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 bg-indigo-500"></div>
          </div>
          
          <div class="flex-1 min-w-0">
            <div class="font-medium text-sm truncate">{{ bot.name }}</div>
            <div class="text-xs text-gray-400 truncate">
              {{ bot.description || 'Бот-помощник' }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Кнопка создания приглашения -->
    <div class="p-3 bg-gray-900">
      <button 
        class="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded text-sm font-medium flex items-center justify-center"
        @click="createInvite"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
        Создать приглашение
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user';
import { useChatStore } from '@/stores/chat';

const userStore = useUserStore();
const chatStore = useChatStore();

// Список пользователей (в реальном приложении получаем с сервера)
const onlineUsers = ref([
  {
    id: 'user1',
    name: 'Алексей Программист',
    avatar: 'https://i.pravatar.cc/150?u=user1',
    status: 'online',
    activity: {
      type: 'playing',
      text: 'VS Code'
    }
  },
  {
    id: 'user2',
    name: 'Мария Дизайнер',
    avatar: 'https://i.pravatar.cc/150?u=user2',
    status: 'online',
    activity: {
      type: 'listening',
      text: 'Lofi Beats'
    }
  },
  {
    id: 'user3',
    name: 'Иван Тестировщик',
    avatar: 'https://i.pravatar.cc/150?u=user3',
    status: 'idle',
    activity: {
      type: 'custom',
      text: 'Отдыхает'
    }
  },
  {
    id: 'user4',
    name: 'Ольга Разработчик',
    avatar: 'https://i.pravatar.cc/150?u=user4',
    status: 'dnd',
    activity: {
      type: 'coding',
      text: 'В потоке'
    }
  },
  {
    id: 'user5',
    name: 'Дмитрий Менеджер',
    avatar: 'https://i.pravatar.cc/150?u=user5',
    status: 'offline',
    activity: null
  }
]);

// Список ботов
const botUsers = ref([
  {
    id: 'bot1',
    name: 'Музыкальный Бот',
    avatar: 'https://cdn-icons-png.flaticon.com/512/4474/4474034.png',
    description: 'Воспроизведение музыки',
    commands: 24
  },
  {
    id: 'bot2',
    name: 'Модератор',
    avatar: 'https://cdn-icons-png.flaticon.com/512/4474/4474059.png',
    description: 'Автомодерация чата',
    commands: 18
  }
]);

// Форматирование активности пользователя
const userActivity = (user) => {
  if (!user.activity) return 'Не в сети';
  
  const activities = {
    playing: 'Играет в',
    listening: 'Слушает',
    streaming: 'Стримит',
    watching: 'Смотрит',
    custom: '',
    coding: 'Кодит'
  };
  
  return `${activities[user.activity.type] || ''} ${user.activity.text}`.trim();
};

// Начать голосовой вызов
const startVoiceCall = (userId, userName) => {
  chatStore.startVoiceCall(userId, userName);
};

// Создать приглашение
const createInvite = () => {
  const inviteCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  navigator.clipboard.writeText(`https://discord-clone.ru/invite/${inviteCode}`);
  
  chatStore.showNotification(
    'Приглашение создано', 
    `Код приглашения ${inviteCode} скопирован в буфер`
  );
};
</script>

<style scoped>
/* Стили для скроллбара */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: #4a4d52;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #5e6269;
}
</style>
