<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import { type IGood } from '@/types/good.d'
import { computed } from 'vue'

interface IPorp {
  good: IGood
}
const props = defineProps<IPorp>()

const cartStore = useCartStore()
const cartCount = computed(() => cartStore.cartCountById(props.good.id))
const add = () => {
  cartStore.pushProductionToCart(props.good)
}
const minus = () => {
  cartStore.removeProdutionFromCart(props.good)
}
</script>

<template>
  <div class="shop-cart-control">
    <Transition name="move">
      <div v-if="cartCount" class="minus" @click.stop="minus"></div>
    </Transition>
    <Transition name="fade">
      <div v-if="cartCount" class="count">{{ cartCount }}</div>
    </Transition>

    <div class="add" @click.stop="add"></div>
  </div>
</template>

<style lang="scss" scoped>
.shop-cart-control {
  display: flex;
  align-items: center;
  height: 22px;
  .add {
    background: var(--op-primary-color);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    color: white;
    position: relative;
    &::before {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      width: 50%;
      height: 2px;
      background: white;
      border-radius: 2px;
      transform: translate(-50%, -50%);
    }
    &::after {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      width: 50%;
      height: 2px;
      background: white;
      border-radius: 2px;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
  .count {
    width: 30px;
    text-align: center;

    &.fade-enter-active,
    &.fade-leave-active {
      transition: all 0.2s ease-out;
    }
    &.fade-enter-from,
    &.fade-leave-to {
      opacity: 0;
    }
  }
  .minus {
    background: white;
    border: 1px solid var(--op-primary-color);
    border-radius: 50%;
    width: 22px;
    height: 22px;
    position: relative;
    &::before {
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      content: '';
      width: 50%;
      height: 2px;
      background: var(--op-primary-color);
      border-radius: 2px;
      transform: translate(-50%, -50%);
    }
    &.move-enter-active,
    &.move-leave-active {
      transition: all 0.2s ease-out;
    }
    &.move-enter-from,
    &.move-leave-to {
      opacity: 0;
      transform: translateX(34px) rotate(180deg);
    }
  }
}
</style>
