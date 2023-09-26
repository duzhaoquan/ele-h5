<script setup lang="ts">
import OpSearch from '@/components/OpSearch.vue'
import { computed, ref, watch } from 'vue'
import { useToggle } from '@/use/useToggle'
import type { ISearchResult } from '@/types'
import { fetchSearchData } from '@/api/search'
import { useDebounce } from '@/use/useDebounce'

interface IEmits {
  (e: 'toggleShowSearchView'): void
}
const emits = defineEmits<IEmits>()

const HISTORY_TAGS = [
  '比萨',
  '栗子',
  '切果NOW',
  '炒饭',
  '出前一丁',
  '玉米',
  '牛腩',
  '土豆焗饭',
  '烧烤',
  '水果',
]
const [isHistoryTagShow, toggleHistoryTag] = useToggle(false)
const [INNT, DONE, DOING] = [-1, 0, 1]
const searchState = ref(INNT)
const searchResult = ref([] as ISearchResult[])
const historyTags = computed(() =>
  isHistoryTagShow.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5),
)

const searchValue = ref('')

const onSearch = async (v?: string | number) => {
  try {
    searchState.value = DOING
    const { list } = await fetchSearchData(v as string)
    searchResult.value = list
  } finally {
    searchState.value = DONE
  }
}

const onTagClick = (v: string) => {
  searchValue.value = v
  onSearch(v)
}

// watch(
//   searchResult,
//   useDebounce<string>((nv) => {
//     onSearch(nv as string)
//   }, 1000),
// )
const debounceValue = useDebounce(searchValue, 1000)
watch(debounceValue, (nv) => {
  if (!nv) {
    searchResult.value = []
    return
  }
  onSearch(nv as string)
})
</script>

<template>
  <div class="search-view">
    <OpSearch
      show-action
      shape="round"
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="emits('toggleShowSearchView')"
    ></OpSearch>
    <div class="search-view__history" v-if="!searchValue">
      <div class="label">历史搜索</div>
      <div class="history-tag" v-for="v in historyTags" :key="v" @click="onTagClick(v)">
        {{ v }}
      </div>
      <div class="history-tag" key="arrow" @click="toggleHistoryTag">
        <VanIcon v-if="isHistoryTagShow" name="arrow-up"></VanIcon>
        <VanIcon v-else name="arrow-down"></VanIcon>
      </div>
    </div>

    <div class="search-view__result">
      <div class="searching" v-if="searchState === DOING">~正在搜索~</div>
      <template v-if="searchState === DONE">
        <div class="result-item" v-for="v in searchResult" :key="v.label">
          <VanIcon name="search"></VanIcon>
          <div class="name">{{ v.label }}</div>
          <div class="count">约{{ v.resultCount }}个结果</div>
        </div>
        <div class="no-reslut" v-if="!searchResult.length">~暂无推荐~</div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.search-view {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  z-index: 999;

  &__history {
    padding: var(--van-padding-sm);
    .label {
      margin-bottom: var(--van-padding-xs);
    }
    .history-tag {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
  }

  &__result {
    .result-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      padding: 10px;
      border-radius: 1px solid var(--van-gray-1);
      .name {
        flex: 1;
        padding-left: 6px;
      }
      .count {
        font-size: 12px;
        color: var(--van-gray-6);
      }
    }
    .searching,
    .no-reslut {
      font-size: 12px;
      color: var(--van-gray-6);
      padding: 100px 0;
      text-align: center;
    }
  }
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leae-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
