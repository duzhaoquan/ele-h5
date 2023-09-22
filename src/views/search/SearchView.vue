<script setup lang="ts">
import OpSearch from '@/components/OpSearch.vue'
import { computed, ref } from 'vue'
import { useToggle } from '@/use/useToggle'

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

const historyTags = computed(() =>
  isHistoryTagShow.value ? HISTORY_TAGS : HISTORY_TAGS.slice(0, 5),
)

const searchValue = ref('')

const onsSearch = () => {
  // eslint-disable-next-line no-console
  console.log('onsSearch')
}

const onTagClick = (v: string) => {
  searchValue.value = v
  onsSearch()
}
</script>

<template>
  <div class="search-view">
    <OpSearch
      show-action
      shape="round"
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      @search="onsSearch"
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
}
</style>
