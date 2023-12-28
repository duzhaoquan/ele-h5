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

const left = ref()
const right = ref()

function leftControlRightScroll(index: number) {
  if (!right.value) {
    return
  }
  const rightTo = right.value.querySelectorAll('.category-name')[index].offsetTop

  const scrollMove = (ele: Element, target: number) => {
    // 根据当前scrollTop与目标点距离算出单次改变量
    const vector = Math.round((target - ele.scrollTop) / 10)
    if ((ele.scrollTop >= target && vector > 0) || (ele.scrollTop <= target && vector < 0)) {
      return
    }
    const scrollTimer = setInterval(() => {
      ele.scrollTop += vector
      // 超出目标点后 或者 已经滚动到底清空定时器
      // 上滑(scrollTop>=目标点 且 vector为正) 或 下滑(scrollTop <= 目标点 且 vector为负)或 滑到最底
      if (
        (ele.scrollTop >= target && vector > 0) ||
        (ele.scrollTop <= target && vector < 0) ||
        ele.scrollTop + ele.clientHeight + 1 >= ele.scrollHeight
      ) {
        // +1 正确激活当前左栏状态
        ele.scrollTop = target + 1
        clearInterval(scrollTimer)
      }
    }, 1000 / 100)
  }
  scrollMove(right.value, rightTo)
  //right.value.scrollTop = rightTo
}

const scrollAction = () => {
  const ti = right.value.querySelectorAll('.category-name')

  let targetIndex = 0
  for (let i = 0; i < ti.length; i++) {
    if (right.value.scrollTop > ti[i].offsetTop) {
      targetIndex = i
    }
  }
  categoryActive.value = targetIndex
}
</script>

<template>
  <OpLoadingView :loading="pending" type="skeleton">
    <div class="shop-good-list">
      <div class="left" ref="left">
        <VanSidebar v-model:model-value="categoryActive">
          <VanSidebarItem
            v-for="v in data"
            :key="v.label"
            :title="v.label"
            @click="leftControlRightScroll"
          >
          </VanSidebarItem>
        </VanSidebar>
      </div>

      <div class="right" ref="right" @scroll="scrollAction">
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
  padding-bottom: 120px;
  display: flex;
  height: 100%;
  .left {
    overflow: hidden;
    overflow-y: auto;
  }
  .right {
    overflow: hidden;
    overflow-y: auto;
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
