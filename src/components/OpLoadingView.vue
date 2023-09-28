<script setup lang="ts">
interface IProps {
  loading: boolean
  type: 'loading' | 'skeleton'
}
defineProps<IProps>()
</script>

<template>
  <div v-if="loading" class="op-loading-view">
    <slot name="template">
      <div v-if="type === 'loading'" class="loading-wapper">
        <VanLoading></VanLoading>
      </div>
      <div v-if="type === 'skeleton'" class="skeleton-wrapper">
        <VanSkeleton :row="10"></VanSkeleton>
        <VanSkeleton title avatar :row="5"></VanSkeleton>
        <VanSkeleton title :row="5"></VanSkeleton>
      </div>
    </slot>
  </div>
  <slot v-else></slot>
</template>

<style lang="scss">
.op-loading-view {
  background: white;
  .loading-wapper {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
  }
  .skeleton-wrapper {
    padding: 20px 10px;
  }
}
</style>
