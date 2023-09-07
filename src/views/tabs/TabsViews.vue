<script setup lang="ts">
import { Tabbar, TabbarItem } from 'vant'
import { ref } from 'vue'

const active = ref('')
</script>

<template>
  <Tabbar v-model="active">
    <TabbarItem name="home" icon="home-o">首页</TabbarItem>
    <TabbarItem name="order" icon="bars">订单</TabbarItem>
    <TabbarItem name="me" icon="contact">我的</TabbarItem>
  </Tabbar>
</template>
