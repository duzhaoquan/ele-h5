<script setup lang="ts">
import type { Comment } from '@/types/comments'
import Avatar from '@/assets/imgs/shop_page/comment/avatar.png'
interface Props {
  data: Comment
}
const props = defineProps<Props>()

const header = props.data.headerImg.length ? props.data.headerImg : Avatar

const freId = (userId: number) => {
  const id = userId.toString()
  const fist = id.slice(0, 1)
  const last = id.slice(-1)
  return fist + '****' + last
}
const rateString = (r: number) => {
  switch (r) {
    case 1:
      return '很不满意'
    case 2:
      return '不好'
    case 3:
      return '一般'
    case 4:
      return '满意'
    case 5:
      return '非常满意'
    default:
      return '一般'
  }
}
</script>

<template>
  <div class="comment-item">
    <div class="top">
      <img :src="header" />
      <div class="top__center">
        <div class="user-id">{{ freId(data.id) }}</div>
        <div class="rate">
          <div class="service">
            服务<span class="ratting">{{ rateString(data.serviceRating) }}</span>
          </div>
          <div class="goods">
            商品<span class="ratting">{{ rateString(data.goodsRating) }}</span>
          </div>
        </div>
      </div>
      <div class="date">
        <div class="time">{{ data.date }}</div>
        <div class="delivery">{{ data.delivery }}分钟送达</div>
      </div>
    </div>
    <div class="comment-text">{{ data.conment }}</div>
    <div class="goods-list">
      <div class="goods" v-for="v in data.goods" :key="v">
        <span>{{ v }}</span>
      </div>
    </div>
    <img class="comment-image" v-if="data.imgUrl" :src="data.imgUrl" />
    <div class="shop-onwer" v-if="data.reply.length">
      <div style="font-size: 15px; font-weight: bolder">商家回复</div>
      <div class="replay">{{ data.reply }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-item {
  margin: 20px 0px;

  .top {
    display: flex;
    img {
      width: 42px;
      height: 42px;
      border-radius: 10px;
    }

    &__center {
      margin-left: 5px;
      .rate {
        display: flex;
        .service {
          color: var(--van-gray-6);
        }
        .goods {
          margin-left: 10px;
          color: var(--van-gray-6);
        }
        .ratting {
          margin-left: 10px;
          color: black;
        }
      }
    }
    .date {
      flex: 1;
      color: var(--van-gray-6);
      text-align: right;
    }
  }
  .goods-list {
    .goods {
      margin: 8px 0;
      color: aqua;
      span {
        padding: 4px 10px;
        background: gray;
        border-radius: 5px;
      }
    }
  }
  .comment-image {
    width: 150px;
  }
  .shop-onwer {
    background: gainsboro;
    border-radius: 5px;
    padding: 2px 10px;
    font-size: 13px;
  }
}
</style>
