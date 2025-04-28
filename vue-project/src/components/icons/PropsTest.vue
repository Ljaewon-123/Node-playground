<template>
  <div>
    {{ message }}
    <span>{{ cnt }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, onUpdated } from 'vue'

interface Props {
  message: string
  cnt: number
}

const { message = '', cnt = 0 } = defineProps< Props >()

onUpdated(() => {
  // 텍스트 내용은 현재 `message`와 같아야 함
  console.log('renderer')
})
</script>