<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import CartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart.png'
import EmptyCartLogo from '@/assets/imgs/shop_page/shop-cart/shop-cart-o.png'
import { computed } from 'vue'

const store = useCartStore()

const cartLogo = computed(() => (store.total ? CartLogo : EmptyCartLogo))
</script>

<template>
  <div class="shop-cart">
    <div class="shop-cart__tips">配送费<span>满0.01减7、</span>全店<span>满49减3</span></div>
    <div class="shop-cart__content">
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
          <div>预计券后¥{{ store.totalOldPrice }}</div>
        </div>
        <div v-else class="order-btn order-btn--empty">¥20元起送</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.shop-cart {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: white;
  --var-checkbox-size: 16px;

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
}
</style>
