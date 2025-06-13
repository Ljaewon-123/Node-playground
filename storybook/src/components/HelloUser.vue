<template>
  <div class="hello-user">
    <p class="greeting">Hi {{ name }}</p>
    <button class="plus-btn" @click="cnt++">plus</button>
    <h1 class="counter">{{ cnt }}</h1>
    <button class="plus-btn" @click="hitUrl">Hit the URL</button>
    <pre>{{ req }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  /** 사용자 이름 */
  name?: string
}
const { name = 'jaewon' } = defineProps<Props>();

const cnt = defineModel({ default: 0 })
const req = ref()

const hitUrl = async() => {
  return req.value = await Promise.resolve('Success!!')
}

</script>

<style scoped>
.hello-user {
  border: 1px solid #ddd;
  padding: 1rem;
  border-radius: 8px;
  width: 200px;
  text-align: center;
  font-family: sans-serif;
}

.greeting {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.plus-btn {
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.plus-btn:hover {
  background-color: #2563eb;
}

.counter {
  font-size: 2rem;
  color: #10b981;
  margin-top: 1rem;
}
</style>
