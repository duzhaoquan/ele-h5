<script setup lang="ts">
import type { ITransformer } from '@/types'
interface Iprop {
  data: ITransformer[]
}
defineProps<Iprop>()
</script>

<template>
  <div class="home-transformer">
    <div v-for="v in data" :key="v.label" class="home-transformer_item">
      <img :src="v.imgUrl" />
      <div>{{ v.label }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-transformer {
  display: grid;
  grid-template-columns: repeat(5, 1fr);

  grid-gap: 10px;

  &_item {
    font-size: 13px;
    line-height: 15px;
    text-align: center;

    img {
      width: 48px;
    }
  }
}
</style>
