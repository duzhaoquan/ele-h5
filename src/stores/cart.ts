import { computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import type { IGood } from '@/types/good'

interface ICcartState {
  items: IGood[]
  checkIds: number[]
}

export const useCartStore = defineStore('cart', () => {
  const state: ICcartState = reactive({
    items: [],
    checkIds: [],
  })
  const total = computed(() => state.items.reduce((p, v) => p + v.cartCount, 0))
  const totalPrice = computed(() =>
    state.items
      .filter((v) => state.checkIds.includes(v.id))
      .reduce((p, v) => p + v.cartCount * v.price, 0)
      .toFixed(2),
  )
  const totalOldPrice = computed(() =>
    state.items
      .filter((v) => state.checkIds.includes(v.id))
      .reduce((p, v) => p + v.cartCount * v.oldPrice, 0)
      .toFixed(2),
  )
  const isAllChecked = computed(() => state.checkIds.length === state.items.length)
  const cartCountById = (id: number) => state.items.find((v) => v.id === id)?.cartCount
  const pushProductionToCart = (item: IGood) => {
    const index = state.items.findIndex((v) => v.id === item.id)
    if (index > -1) {
      state.items[index].cartCount++
    } else {
      item.cartCount = 1
      state.items.push(item)
      state.checkIds.push(item.id)
    }
  }
  const removeProdutionFromCart = (item: IGood) => {
    const index = state.items.findIndex((v) => v.id === item.id)
    if (index > -1) {
      state.items[index].cartCount--
      if (state.items[index].cartCount <= 0) {
        state.items.splice(index, 1)
        const j = state.checkIds.findIndex((v) => v === item.id)
        if (j > -1) {
          state.checkIds.splice(j, 1)
        }
      }
    }
  }
  const setCartItems = (goods: IGood[]) => {
    state.items = goods.filter((v) => v.cartCount > 0)
    state.checkIds = state.items.map((v) => v.id)
  }
  const setCheckedIds = (ids: number[]) => (state.checkIds = ids)
  const toggleAllChecked = () =>
    (state.checkIds = isAllChecked.value ? [] : state.items.map((v) => v.id))
  return {
    state,
    total,
    totalPrice,
    totalOldPrice,
    isAllChecked,
    cartCountById,
    pushProductionToCart,
    removeProdutionFromCart,
    setCartItems,
    setCheckedIds,
    toggleAllChecked,
  }
})
