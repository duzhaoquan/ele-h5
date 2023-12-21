<script lang="ts" setup>
import type { IGood } from '@/types/good'
import { useRouter } from 'vue-router'
import CartControl from './CartControl.vue'

interface IProps {
  data: IGood
}
const props = defineProps<IProps>()
const route = useRouter()
const gotoGoods = () => {
  route.push({
    path: '/goods',
    query: { data: JSON.stringify(props.data) },
  })
}
</script>
<template>
  <div class="shop-good-item" @click="gotoGoods">
    <img class="img" v-lazy="data.imgUrl" />
    <div class="content">
      <div class="name">{{ data.name }}</div>
      <div class="tips op-ellipsis" v-if="data.tips">{{ data.tips }}</div>
      <div class="extra">
        <span class="count">月售{{ data.sellCount }}份</span>
        <span class="rating">评分 {{ data.rating }}</span>
      </div>
      <div class="price">
        <div class="now">
          ¥ <span>{{ data.price }}</span>
        </div>
        <div class="old">¥{{ data.oldPrice }}</div>
      </div>
      <div class="cart-control-warpper"><CartControl :good="data"></CartControl></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.shop-good-item {
  display: flex;
  font-size: 12px;
  margin-bottom: 20px;
  .img {
    width: 85px;
    height: 85px;
    border-radius: 5px;
  }
  .content {
    flex: 1;
    margin-left: 10px;
    position: relative;
    .name {
      font-size: 15px;
      font-weight: bold;
      margin-bottom: 4px;
    }
    .tips {
      width: 180px;
      color: gray;
    }
    .extra {
      color: gray;

      .count {
        margin-right: 6px;
      }
    }
    .price {
      display: flex;
      font-size: 12px;
      align-items: baseline;
      margin-top: 10px;
      .now {
        color: red;
        margin-right: 4px;
        span {
          font-size: 18px;
        }
      }
      .old {
        color: gray;
        text-decoration: line-through;
      }
    }
    .cart-control-warpper {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
