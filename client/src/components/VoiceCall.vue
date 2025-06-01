<template>
  <div v-if="callState !== 'idle'" class="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-xl w-80">
    <div class="flex justify-between items-center mb-4">
      <h3 class="font-bold">Звонок с {{ callerName }}</h3>
      <button @click="$emit('endCall')" class="text-red-500">
        ✕
      </button>
    </div>
    
    <div class="grid grid-cols-2 gap-4 mb-4">
      <div class="bg-gray-700 rounded-lg p-4">
        <div class="bg-gray-600 w-16 h-16 rounded-full mx-auto mb-2"></div>
        <p class="text-center">Вы</p>
      </div>
      <div class="bg-gray-700 rounded-lg p-4">
        <div class="bg-gray-600 w-16 h-16 rounded-full mx-auto mb-2"></div>
        <p class="text-center">{{ callerName }}</p>
      </div>
    </div>
    
    <div class="flex justify-center gap-4">
      <button @click="$emit('toggleMute')" :class="['p-3 rounded-full', isMuted ? 'bg-red-500' : 'bg-gray-700']">
        {{ isMuted ? 'Включить звук' : 'Выключить звук' }}
      </button>
      <button @click="$emit('endCall')" class="bg-red-500 p-3 rounded-full">
        Завершить
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  callState: String,
  callerName: String,
  isMuted: Boolean
})

defineEmits(['endCall', 'toggleMute'])
</script>
