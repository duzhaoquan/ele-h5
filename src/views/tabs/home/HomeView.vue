<script setup lang="ts">
import SearchView from '@/views/search/SearchView.vue'
import TheTop from './components/TheTop.vue'
import { useToggle } from '@/use/useToggle'

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
</script>

<template>
  <Transition>
    <SearchView v-if="isShowSearchView" @toggle-show-search-view="toggleSearchView"></SearchView>
  </Transition>
  <div v-show="!isShowSearchView">
    <TheTop :recomments="recomments" @search-click="toggleSearchView"></TheTop>
  </div>
</template>

<style>
.test {
  font-size: 39px;
}
</style>
