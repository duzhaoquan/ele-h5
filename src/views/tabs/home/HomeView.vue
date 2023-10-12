<script setup lang="ts">
import SearchView from '@/views/search/SearchView.vue'
import TheTop from './components/TheTop.vue'
import { useToggle } from '@/use/useToggle'
import OpLoadingView from '@/components/OpLoadingView.vue'
import { fetchHomePageData } from '@/api/home'
import { useAsync } from '@/use/useAsync'
import type { ICountdown, IHomeInfo } from '@/types'
import TheTransformer from './components/TheTransformer.vue'
import ScrollBar from './components/ScrollBar.vue'

const [isShowSearchView, toggleSearchView] = useToggle(false)
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
const { data, pending } = useAsync(fetchHomePageData, {
  banner: [],
  searchRecomments: [],
  transformer: [],
  scrollBarInfoList: [],
  countdown: {} as ICountdown,
  activities: [],
} as IHomeInfo)
</script>

<template>
  <div class="home-page">
    <Transition>
      <SearchView v-if="isShowSearchView" @toggle-show-search-view="toggleSearchView"></SearchView>
    </Transition>
    <div v-show="!isShowSearchView">
      <TheTop :recomments="recomments" @search-click="toggleSearchView"></TheTop>
      <OpLoadingView :loading="pending" type="loading">
        <TheTransformer :data="data.transformer"></TheTransformer>
        <ScrollBar :data="data.scrollBarInfoList"></ScrollBar>
      </OpLoadingView>
    </div>
  </div>
</template>

<style>
.test {
  font-size: 39px;
}
</style>
