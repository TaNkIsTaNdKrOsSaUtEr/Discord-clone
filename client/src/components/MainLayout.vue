<template>
  <div class="flex h-screen bg-gray-900 text-white">
    <ChannelsSidebar />
    
    <div class="flex-1 flex flex-col">
      <ChatHeader />
      <MessagesList />
      <MessageInput />
    </div>
    
    <VoiceCall />
    <MembersList />
  </div>
</template>

<script setup>
import ChannelsSidebar from './ChannelsSidebar.vue';
import ChatHeader from './ChatHeader.vue';
import MessagesList from './MessagesList.vue';
import MessageInput from './MessageInput.vue';
import VoiceCall from './VoiceCall.vue';
import MembersList from './MembersList.vue';
</script>
