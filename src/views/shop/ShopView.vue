<script setup lang="ts">
import OpLoadingView from '@/components/OpLoadingView.vue'
import { useAsync } from '@/use/useAsync'
import { useRoute } from 'vue-router'
import { fetchShopPageData } from '@/api/shop'
import ShopHeader from './components/ShopHeader.vue'

const router = useRoute()
const { id } = router.params
const { data, pending } = useAsync(() => fetchShopPageData(id as string), {
  announcement: '',
  discounts: [],
  redbags: [],
  activitys: [],
  branch: '',
  comments: [],
  deliveryDistance: '',
  deliveryStrategy: '',
  deliveryStratingPrice: '',
  deliveryTags: [],
  deliveryTime: '',
  id: '',
  monthlyCount: 0,
  postUrl: '',
  bgUrl: '',
  score: 0,
  services: [],
  shopName: '',
  tops: [],
})
const onClickLeft = () => history.back()
</script>

<template>
  <div class="shop-page op-fullscreen">
    <VanNavBar left-text="返回" @click-left="onClickLeft"></VanNavBar>
    <OpLoadingView :loading="pending" type="skeleton">
      <ShopHeader :data="data"></ShopHeader>
    </OpLoadingView>
  </div>
</template>

<style lang="scss" scoped>
.shop-page {
  background: var(--op-gray-bg-color);
}
</style>
