import type { IUserInfo } from '@/types'
import { useLocalStorage } from '@/use/useLocalStorage'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface IUserState {
  userInfo: IUserInfo
  token: string
}

const getDefalutUserInfo: () => IUserInfo = () => {
  return {
    id: '',
    avatar: 'https://b.yzcdn.cn/vant/icon-demo-1126.png',
    nickname: '请登录',
  }
}
export const useUserStore = defineStore('user', () => {
  const userStore = useLocalStorage('userInfor', getDefalutUserInfo())
  const tokenStore = useLocalStorage('token', '')

  const state = ref({
    userInfor: getDefalutUserInfo(),
    token: '',
  })
  const getUserInfo = computed(() => {
    if (!state.value.userInfor || !state.value.userInfor.id) {
      state.value.userInfor = userStore.value.value
    }
    return state.value.userInfor
  })

  const setInfo = ({ token, userInfo }: IUserState) => {
    state.value.userInfor = userInfo
    state.value.token = token
    //
    userStore.setVlue(userInfo)
    tokenStore.setVlue(token)
  }

  const removeInfo = () => {
    state.value.userInfor = getDefalutUserInfo()
    state.value.token = ''
    //
    userStore.removeItem()
    tokenStore.removeItem()
  }

  return {
    state,
    getUserInfo,
    setInfo,
    removeInfo,
  }
})
