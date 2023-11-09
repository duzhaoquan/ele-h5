<script setup lang="ts">
import OpList from '@/components/list/OpList'
import type { IShop } from '@/types'
import { ref } from 'vue'
import { fetchShopList } from '@/api/shop'
import ShopItem from './ShopItem.vue'

let page = 1
const shoplist = ref([] as IShop[])
const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  const { data, total } = await fetchShopList({
    _page: page++,
    _limit: 5,
  })
  shoplist.value.push(...data)
  if (shoplist.value.length >= total) {
    finished.value = true
  }
  loading.value = false
}
</script>

<template>
  <div class="home-shop-list">
    <OpList
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ShopItem v-for="v in shoplist" :key="v.id" :data="v">{{ v.shopName }}</ShopItem>
    </OpList>
  </div>
</template>

<style lang="scss" scoped>
.home-shop-list {
  padding: 8px 10px;
}
</style>
