<script setup lang="ts">
import type { ISearchRecomment } from '@/types'

interface IProps {
  recomments: ISearchRecomment[]
}
defineProps<IProps>()
</script>

<template>
  <div class="home-top">
    <div class="top">
      <img class="location-icon" src="@/assets/imgs/index_page/location.png" />
      <dev class="location"> 幸福小区（北一区南门）</dev>
      <img class="shopcart-icon" src="@/assets/imgs/index_page/shopcart.png" />
      <img class="comments-icon" src="@/assets/imgs/index_page/comments.png" />
    </div>
    <VanSearch shape="round"> </VanSearch>
    <div class="search-recomend">
      <div v-for="v in recomments" :key="v.value" class="tag">{{ v.label }}</div>
    </div>
  </div>
</template>

<style lang="scss">
.home-top {
  background: liner-gradient(to right, rgb(53, 200, 250), rgb(31, 175, 243));
  color: white;
  .top {
    display: flex;
    align-items: center;
    padding: 10px 10px 0 10px;
    line-height: 15px;
    font-size: 15px;
    font-weight: bold;
  }
}
</style>
