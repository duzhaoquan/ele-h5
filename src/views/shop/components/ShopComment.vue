<script setup lang="ts">
import { ref } from 'vue'
import { fetchCommentData } from '@/api/comments'
import type { Comment, CommentCategory } from '@/types/comments'
import CommentItem from './CommentItem.vue'
import { computed } from 'vue'

let page = 1

let categoresData: CommentCategory
const categoreskey = ref([] as string[])

const commentlist = ref([] as Comment[])
const selected = ref(0)

const clickCategory = (i: number) => {
  selected.value = i
  page = 1
  commentlist.value = []
  loading.value = true
  finished.value = false
  onLoad()
}
const list = ref()
const loading = ref(false)
const finished = ref(false)
const onLoad = async () => {
  let categore = ''
  if (categoreskey.value.length > 0) {
    categore = categoreskey.value[selected.value].split('(')[0]
  }

  const { total, categores, comments } = await fetchCommentData({
    _page: page,
    _limit: 5,
    _filter: categore,
  })
  if (!categoresData) {
    categoresData = categores
    const keyValueStringArray: string[] = Object.entries(categoresData).map(
      ([key, value]) => `${key}(${value})`,
    )
    categoreskey.value = keyValueStringArray
  }
  if (page === 1) {
    commentlist.value = comments
  } else {
    commentlist.value.push(...comments)
  }
  if (commentlist.value.length >= total) {
    finished.value = true
  }
  loading.value = false
  page++
}
</script>

<template>
  <div class="comment-list op-fullscreen">
    <div class="categores">
      <div
        :class="{ categore: true, selected: i === selected }"
        v-for="(v, i) in categoreskey"
        :key="v"
        @click="clickCategory(i)"
      >
        {{ v }}
      </div>
    </div>

    <VanList
      ref="list"
      class="list"
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem class="item" v-for="v in commentlist" :key="v.id" :data="v"></CommentItem>
    </VanList>
    <VanLoading class="loading" type="spinner"></VanLoading>
  </div>
</template>

<style lang="scss" scoped>
body {
  padding-bottom: constant(safe-area-inset-bottom);
  //padding-bottom: env(safe-area-inset-bottom);
}
.comment-list {
  background: white;
  padding: 10px 10px;
  height: 100%;
  position: relative;

  .categores {
    .categore {
      display: inline-block;
      font-size: 12px;
      border-radius: 10px;
      color: var(--van-gray-6);
      background: var(--van-gray-1);
      padding: 4px 8px;
      margin-right: 10px;
      margin-bottom: var(--van-padding-xs);
    }
    .selected {
      background: var;
      border: 1px solid var(--op-primary-color);
    }
  }
  .list {
    overflow-y: auto;
    height: 100%;
  }
}
</style>
