<script setup lang="ts">
import type { ILoginInfo } from '@/types'
import { useAuth } from '@/use/useAuth'
import { ref } from 'vue'

const useName = ref('')
const password = ref('')
const { login } = useAuth()
const onClickLeft = () => history.back()
const onSubmit = async (data: ILoginInfo) => {
  await login(data)
  onClickLeft()
}
</script>

<template>
  <div class="login-page op-fullscreen">
    <VanNavBar title="请登录" left-text="返回" left-arrow @click="onClickLeft"></VanNavBar>
    <VanForm class="login-page__form" @submit="onSubmit">
      <VanCellGroup inset>
        <VanField
          v-model="useName"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <VanField
          v-model="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </VanCellGroup>
      <div class="subbutton">
        <VanButton round block type="primary" native-type="submit">提交</VanButton>
      </div>
    </VanForm>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  .login-page__form {
    margin-top: 100px;
    .subbutton {
      margin: 16px;
    }
  }
}
</style>
