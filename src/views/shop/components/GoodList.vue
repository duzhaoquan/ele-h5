<script lang="ts" setup>
import { fetchGoodListData } from '@/api/good'
import OpLoadingView from '@/components/OpLoadingView.vue'
import type { IGood, IMenu } from '@/types/good'
import { useAsync } from '@/use/useAsync'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import GoodsItem from './GoodsItem.vue'
import { useCartStore } from '@/stores/cart'
import { watch } from 'vue'

const route = useRoute()
const { id } = route.params
const categoryActive = ref(0)

const { setCartItems } = useCartStore()

const { data, pending } = useAsync(() => fetchGoodListData(id as string).then((v) => v.data), [])

watch(data, (nv) => {
  const goods = nv.reduce((p: IGood[], v: IMenu) => [...p, ...v.goods], [])
  setCartItems(goods)
})
</script>

<template>
  <OpLoadingView :loading="pending" type="skeleton">
    <div class="shop-good-list">
      <VanSidebar v-model:model-value="categoryActive">
        <VanSidebarItem v-for="v in data" :key="v.label" :title="v.label"> </VanSidebarItem>
      </VanSidebar>
      <div class="list">
        <template v-for="v in data" :key="v.label">
          <div class="category-name">{{ v.label }}</div>
          <GoodsItem class="good" v-for="cv in v.goods" :key="cv.id" :data="cv" />
        </template>
      </div>
    </div>
  </OpLoadingView>
</template>
<style lang="scss" scoped>
.shop-good-list {
  --van-sidebar-selected-border-color: none;
  --van-sidebar-padding: 14px 5px;
  --van-sidebar-font-size: 13px;

  display: flex;
  .list {
    margin: 0 10px;

    .category-name {
      font-size: 15px;
      font-weight: bold;
      padding: 10px 0;
      line-height: 1.2;
    }
  }
}
</style>
