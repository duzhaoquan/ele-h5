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
import { computed } from 'vue'
import { useRect } from '@/use/useRect'
import ShopComment from './components/ShopComment.vue'
import ShopInfo from './components/ShopInfo.vue'
const SHOP_TABS = [
  {
    value: 1,
    label: '全部商品',
    component: GoodList,
  },
  {
    value: 2,
    label: '评价',
    component: ShopComment,
  },
  {
    value: 3,
    label: '商家',
    component: ShopInfo,
  },
]
const active = ref(SHOP_TABS[0].value)
useLockScroll(() => active.value === 1)
const route = useRoute()
const id = route.query.id
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
const root = ref()
const goods = ref()

const conponentHeight = computed(() => {
  if (root.value && goods) {
    return useRect(root).height - useRect(goods).top
  }
  return 0
})
</script>

<template>
  <div class="shop-page op-fullscreen" ref="root">
    <img src="imgs/shop_page/shop-store.jpg" />
    <VanIcon class="back-icon" name="arrow-left" @click="onClickLeft"></VanIcon>
    <OpLoadingView :loading="pending" type="skeleton">
      <div class="header">
        <ShopHeader :data="data"></ShopHeader>
      </div>
      <div ref="goods"></div>
      <VanTabs v-model:active="active" sticky :color="PRIMARY_COLOR" animated swipeable>
        <VanTab v-for="v in SHOP_TABS" :key="v.label" :title="v.label" :name="v.value">
          <div v-bind:style="{ height: conponentHeight + 'px' }">
            <component :is="v.component"></component>
          </div>
        </VanTab>
      </VanTabs>
      <ShopCart class="shop-vart" v-if="active === 1"></ShopCart>
    </OpLoadingView>
  </div>
</template>

<style lang="scss" scoped>
.shop-page {
  background: white;
  img {
    position: absolute;
    width: 100%;
    z-index: 0;
    object-fit: cover;
  }
  .header {
    position: relative;
    z-index: 1;
  }
  .back-icon {
    margin-left: 10px;
    margin-top: 20px;
    padding: 6px 8px 6px 4px;
    background: rgb(203, 233, 203);
    border-radius: 50%;
  }
  .van-tabs--line {
    z-index: 0;
  }
}
</style>
