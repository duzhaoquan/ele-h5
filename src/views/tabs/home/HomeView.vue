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
import CountDown from './components/CountDown.vue'
import OpSwipe from '@/components/swipe/OpSwipe'
import OpSwipeItem from '@/components/swipe/OpSwipeItem'
import { PRIMARY_COLOR, TRANSPARENT } from '@/config'
import { ref } from 'vue'
import { HOME_TABS } from './config'
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
const tabBackgruondColor = ref(TRANSPARENT)
const onTabScroll = ({ isFixed }: { isFixed: boolean }) => {
  tabBackgruondColor.value = isFixed ? 'white' : TRANSPARENT
}
</script>

<template>
  <div class="home-page">
    <Transition>
      <SearchView v-if="isShowSearchView" @toggle-show-search-view="toggleSearchView"></SearchView>
    </Transition>
    <div v-show="!isShowSearchView">
      <TheTop :recomments="recomments" @search-click="toggleSearchView"></TheTop>
      <OpLoadingView :loading="pending" type="loading">
        <div class="home-page__banner">
          <img v-for="v in data.banner" :key="v.imgUrl" :src="v.imgUrl" />
        </div>
        <TheTransformer :data="data.transformer"></TheTransformer>
        <ScrollBar :data="data.scrollBarInfoList"></ScrollBar>
        <div class="home-page__activity">
          <CountDown :data="data.countdown"></CountDown>
          <OpSwipe class="home-page__activity__swipe" :autoplay="3000" :loop="true">
            <OpSwipeItem v-for="v in data.activities" :key="v">
              <img :src="v" />
            </OpSwipeItem>
          </OpSwipe>
        </div>
        <VanTabs
          sticky
          offset-top="54px"
          :color="PRIMARY_COLOR"
          :background="tabBackgruondColor"
          @scroll="onTabScroll"
        >
          <VanTab v-for="v in HOME_TABS" :key="v.title" :title="v.title">
            <component :is="v.component"></component>
          </VanTab>
        </VanTabs>
      </OpLoadingView>
    </div>
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.home-page {
  background: var(--op-gray-bg-color);
  padding-bottom: 70px;

  &__banner {
    img {
      width: 100%;
      padding-top: 10px;
      background: white;
    }
  }
  &__activity {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;

    &__swipe {
      border-radius: 8px;
      width: 180px;
      height: 170px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
