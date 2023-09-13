<script setup lang="ts">
// import TabsViews from './views/tabs/TabsViews.vue'
import { RouterView } from 'vue-router'

import { fetchTest } from '@/api/test'

fetchTest()
</script>

<template>
  <!-- <TabsViews></TabsViews> -->
  <RouterView />
</template>

<style scoped></style>
