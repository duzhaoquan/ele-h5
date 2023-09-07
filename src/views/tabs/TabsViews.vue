<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant'
import { ref } from 'vue'
import { RouterView } from 'vue-router'
const active = ref('')
</script>

<template>
  <RouterView />
  <Tabbar v-model="active">
    <TabbarItem name="home" icon="home-o">首页</TabbarItem>
    <TabbarItem name="order" icon="bars">订单</TabbarItem>
    <TabbarItem name="me" icon="contact">我的</TabbarItem>
  </Tabbar>
</template>
