<script setup lang="ts">
import TheTop from './components/TheTop.vue'

const recomments = [
  {
    value: 1,
    label: '牛腩',
  },
  {
    value: 2,
    label: '色拉',
  },
]
</script>

<template>
  <TheTop :recomments="recomments"></TheTop>
</template>

<style>
.test {
  font-size: 39px;
}
</style>
