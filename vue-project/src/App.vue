<script setup>
import { ref, onUpdated } from 'vue'
import PropsTest from '@/components/icons/PropsTest.vue'

const count = ref(0)

onUpdated(() => {
  // 텍스트 내용은 현재 `count.value`와 같아야 함
  console.log(document.getElementById('count').textContent)
})

const updateCount = () => {
  count.value = 0
}
</script>

<template>
  <div>
    <button id="count" @click="updateCount">{{ count }}</button>

    <PropsTest
      :message="`Count is ${count}`"
      :cnt="count"
    />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
