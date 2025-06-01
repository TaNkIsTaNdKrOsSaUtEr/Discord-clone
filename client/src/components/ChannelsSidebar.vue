<template>
  <div class="w-64 bg-gray-800 h-full flex flex-col">
    <div class="p-4 border-b border-gray-700">
      <h1 class="text-xl font-bold">{{ currentServer.name }}</h1>
    </div>
    
    <div class="flex-1 overflow-y-auto p-2">
      <div v-for="channel in currentServer.channels" :key="channel.id"
           class="p-2 hover:bg-gray-700 rounded cursor-pointer"
           :class="{ 'bg-gray-700': activeChannelId === channel.id }"
           @click="selectChannel(channel.id)">
        # {{ channel.name }}
      </div>
    </div>
    
    <div class="p-3 border-t border-gray-700">
      <div class="flex items-center">
        <img :src="userStore.currentUser.avatar" class="w-8 h-8 rounded-full mr-2">
        <span>{{ userStore.currentUser.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useChatStore } from '@/stores/chat';
import { useUserStore } from '@/stores/user';

const chatStore = useChatStore();
const userStore = useUserStore();

const { currentServer, activeChannelId } = storeToRefs(chatStore);
const { selectChannel } = chatStore;
</script>
