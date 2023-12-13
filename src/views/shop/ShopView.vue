<script setup lang="ts">
import OpLoadingView from '@/components/OpLoadingView.vue'
import { useAsync } from '@/use/useAsync'
import { useRoute } from 'vue-router'
import { fetchShopPageData } from '@/api/shop'
import ShopHeader from './components/ShopHeader.vue'
import OpTodo from '@/components/OpTodo.vue'
import { ref } from 'vue'
import { PRIMARY_COLOR } from '@/config'
import GoodList from './components/GoodList.vue'
import ShopCart from './components/ShopCart.vue'

import { useLockScroll } from '@/use/useLockScroll'

const SHOP_TABS = [
  {
    value: 1,
    label: '全部商品',
    component: GoodList,
  },
  {
    value: 2,
    label: '评价',
    component: OpTodo,
  },
  {
    value: 3,
    label: '商家',
    component: OpTodo,
  },
]
const active = ref(SHOP_TABS[0].value)
useLockScroll(() => active.value === 1)
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
    <VanNavBar left-text="返回" @click-left="onClickLeft" sticky></VanNavBar>
    <OpLoadingView :loading="pending" type="skeleton">
      <ShopHeader :data="data"></ShopHeader>
      <VanTabs v-model:active="active" sticky :color="PRIMARY_COLOR" animated swipeable>
        <VanTab v-for="v in SHOP_TABS" :key="v.label" :title="v.label" :name="v.value">
          <component :is="v.component"></component>
        </VanTab>
      </VanTabs>
      <ShopCart v-if="active === 1"></ShopCart>
    </OpLoadingView>
  </div>
</template>

<style lang="scss" scoped>
.shop-page {
  background: white;
  .van-tabs__line,
  .van-nav-bar {
    z-index: 0;
  }
}
</style>
