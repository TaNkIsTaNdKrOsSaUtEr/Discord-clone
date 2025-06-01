<template>
  <div class="mb-4 hover:bg-gray-800 p-2 rounded">
    <div class="flex items-start">
      <div class="bg-gray-600 rounded-full w-10 h-10 mr-3"></div>
      <div>
        <span class="font-bold mr-2">{{ msg.user }}</span>
        <span class="text-gray-400 text-sm">{{ msg.time }}</span>
        <p class="mt-1">{{ msg.text }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  msg: Object
})
</script>
