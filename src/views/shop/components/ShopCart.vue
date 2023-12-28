<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import CartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart.png'
import EmptyCartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart-o.png'
import { computed } from 'vue'
import { useToggle } from '@/use/useToggle'
import { useTransition } from '@/use/useTransition'
import GoodsItem from './GoodsItem.vue'
import { ref, onMounted } from 'vue'
import { showConfirmDialog } from 'vant'
import { useEventBus } from '@/use/useEventBus'

const store = useCartStore()
const packageFee = ref(5)

const { items, start, beforeEnter, enter, afterEnter } = useTransition()
const eventBus = useEventBus()

eventBus.on('cart-add', (el) => {
  start(el)
})

const cartLogo = computed(() => (store.total ? CartLogo : EmptyCartLogo))

const [isCartListShow, cartListShow] = useToggle(store.isAllChecked && store.total > 0)
const showCartListPop = () => {
  if (!store.total) {
    return
  }
  cartListShow()
}

const removeAll = () => {
  showConfirmDialog({ title: '确定清空购物车' })
    .then(() => {
      store.setCartItems([])
      cartListShow()
    })
    .catch((error) => {
      //error
      // eslint-disable-next-line no-console
      console.log(error)
    })
}
const safeAreaHeight = ref('0px')
onMounted(() => {
  // 获取底部安全区域的高度
  const isIphone = /iPhone/i.test(navigator.userAgent)
  const bottomSafe = isIphone && window.screen.height > 800 ? '34px' : '0px'
  safeAreaHeight.value = bottomSafe
})
</script>

<template>
  <div class="shop-cart" :style="{ bottom: safeAreaHeight }">
    <VanPopup v-model:show="isCartListShow" round position="bottom">
      <div class="shop-cart__popup">
        <div class="shop-cart__tips">
          <div>满49减3，还差<span>24.7</span>元<span>去凑单></span></div>
          <div class="tips-detail">已包含：配送费满减 5、特价优惠 20元</div>
        </div>
        <div class="popup__all">
          <VanCheckbox
            :model-value="store.isAllChecked"
            @update:model-value="store.toggleAllChecked"
          >
            <span class="all-label">全选</span>
          </VanCheckbox>
          <div class="all-total">(已选{{ store.state.checkIds.length }})</div>
          <span class="all-remove" @click="removeAll"><VanIcon name="delete-o" />清空</span>
        </div>

        <div class="popup__goods">
          <VanCheckboxGroup
            checked-color="rgb(31,175,243)"
            :model-value="store.state.checkIds"
            @update:model-value="(ids) => store.setCheckedIds(ids)"
          >
            <div v-for="v in store.state.items" :key="v.id" class="good-item">
              <VanCheckbox :name="v.id"></VanCheckbox>
              <GoodsItem :data="v" class="flex"></GoodsItem>
            </div>
          </VanCheckboxGroup>
        </div>
        <div class="popup__fee">
          <span>包装费</span>
          <span class="label">
            另需<span class="fee"> ¥ {{ packageFee }}</span>
          </span>
        </div>
      </div>
    </VanPopup>
    <div class="shop-cart__tips">配送费<span>满0.01减7、</span>全店<span>满49减3</span></div>
    <div class="shop-cart__content" @click="showCartListPop">
      <div class="content__left">
        <div class="cart-logo">
          <img :src="cartLogo" />
          <div v-if="store.total" class="total">{{ store.total }}</div>
        </div>
        <div class="cart-info">
          <div class="cart-info__price">
            <div v-if="store.total">
              <span class="cart-info__price-now">
                ¥<span>{{ store.totalPrice }}</span>
              </span>
              <span class="cart-info__price-old">
                ¥<span>{{ store.totalOldPrice }}</span>
              </span>
            </div>
            <div else class="cart-info__price--empty"></div>
          </div>
          <div class="cart-info__desc">另需配送费5元</div>
        </div>
      </div>
      <div class="content__right">
        <div v-if="store.total" class="order-btn">
          <div class="label">领券购买</div>
          <div>预计券后¥{{ store.totalPrice }}</div>
        </div>
        <div v-else class="order-btn order-btn--empty">¥20元起送</div>
      </div>
    </div>
    <div class="shop-cart__ball-container">
      <div v-for="(v, i) in items" :key="i">
        <Transition @beforeEnter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
          <div class="ball" v-show="v.isShow">
            <div class="inner"></div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop-cart {
  width: 100%;
  position: fixed;

  left: 0;
  background: white;
  --var-checkbox-size: 16px;

  &__popup {
    .popup__all {
      display: flex;
      margin: 15px 10px;
      align-items: center;
      justify-content: space-between;
      background: white;

      .all-label {
        font-size: 14px;
        font-weight: bold;
      }
      .all-total {
        font-size: 12px;
        color: gray;
        flex: 1;
      }
      .all-remove {
        color: gray;
      }
    }
    .popup__goods {
      margin: 10px;
      padding: 15px 0px 0 0px;
      background: white;
      max-height: 400px;
      overflow: auto;
      .good-item {
        display: flex;
        margin-bottom: 15px;
        .van-checkbox {
          margin-right: 10px;
        }
        .flex {
          flex: 1;
        }
      }
    }
    .popup__fee {
      padding: 14px;
      font-size: 14px;
      background: rgb(244, 244, 244);
      .label {
        margin-left: 30px;
        color: gray;
        font-size: 14px;
        .fee {
          color: red;
          font-size: 18px;
        }
      }
    }
  }

  &__tips {
    text-align: center;
    background: rgb(253, 245, 222);
    font-size: 12px;
    padding: 8px 0;
    span {
      color: rgb(255, 61, 61);
    }
    .tips-detail {
      color: gray;
    }
  }
  &__content {
    width: 100%;
    padding: 0 10px;
    height: 45px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content__left {
      display: flex;
      align-items: center;
      .cart-logo {
        position: relative;
        img {
          width: 50px;
          height: 50px;
        }
        .total {
          position: absolute;
          right: 0;
          top: 2px;
          background: red;
          color: white;
          height: 18px;
          width: 18px;
          border-radius: 9px;
          padding: 0 1px 2px;
          font-size: 12px;
          text-align: center;
          transform: translateX(40%);
        }
      }
      .cart-info {
        margin-left: 10px;
        font-size: 12px;
        color: gray;
        &__price {
          line-height: 18px;
          &-now {
            color: rgb(20, 16, 16);
            font-weight: bold;
            span {
              font-size: 18px;
            }
          }
          &-old {
            text-decoration: line-through;
          }
          &-empty {
            font-weight: bold;
          }
        }
        &__desc {
          font-size: 12px;
          color: gray;
        }
      }
    }
    .content__right {
      .order-btn {
        color: white;
        height: 36px;
        padding: 0 18px;
        font-size: 12px;
        border-radius: 18px;
        text-align: center;
        background: var(--op-primary-color);
        .label {
          font-size: 14px;
          padding-top: 2px;
          line-height: 16px;
        }
        &--empty {
          font-size: 16px;
          background: rgb(152, 152, 152);
          line-height: 36px;
        }
      }
    }
  }

  &__ball-container {
    .ball {
      position: fixed;
      bottom: 10px;
      left: 25px;
      transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
      .inner {
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background: var(--op-primary-color);
        transition: all 0.4s linear;
      }
    }
  }
}
</style>
