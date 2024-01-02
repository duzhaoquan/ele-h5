<script setup lang="ts">
import type { IShop } from '@/types'
import { useToggle } from '@/use/useToggle'
import { defineStore } from 'pinia'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

interface IProps {
  data: IShop
}
const props = defineProps<IProps>()

const shopName = computed(() => `${props.data.shopName}(${props.data.branch})`)
const reduction = computed(() => {
  return props.data.activitys.find((v) => v.type === 2)?.infos || []
})

const router = useRouter()
const gotoShop = () => {
  //js与原生交互
  // const para = { params: { content: 'go to shop' } }
  // const body = JSON.stringify(para)
  // window.webkit.messageHandlers.gotoshop.postMessage(body)
  router.push({
    path: 'shop',
    query: {
      id: props.data.id,
    },
  })
}

// js与原生交互
// window.gotoshopDetail = () => {
//   router.push({
//     name: 'shop',
//     params: {
//       id: props.data.id,
//     },
//   })
// }
const [isMoreShown, showMore] = useToggle(false)
</script>

<template>
  <router-view></router-view>
  <div class="home-shop-item" @click="gotoShop">
    <img class="home-shop-item__poster" v-lazy="data.postUrl" />
    <div class="home-shop-item__info">
      <div class="info__top">
        <div class="info__name op-ellipsis">{{ shopName }}</div>
        <VanIcon name="weapp-nav" color="rgb(207,207,207)" style="margin-left: 10px"></VanIcon>
      </div>
      <div class="info__desc">
        <span class="score">{{ data.score }}</span>
        <span class="monthly-count">月售{{ data.monthlyCount }}</span>
        <span class="delivery-time">{{ data.deliveryTime }}</span>
        <span class="delivery-distance">{{ data.deliveryDistance }}</span>
      </div>
      <div class="info__desc">
        <span class="delivery-strating-price">起送{{ data.deliveryStratingPrice }}</span>
        <span class="delivery-strategy">{{ data.deliveryStrategy }}</span>
        <span class="delivery-tag op-thin-border" v-for="v in data.deliveryTags" :key="v">{{
          v
        }}</span>
      </div>
      <div class="info__comment">{{ data.comments[0] }}</div>
      <div class="info__more" @click.stop="showMore">
        <div v-if="isMoreShown" class="label">活动</div>
        <div class="activities">
          <div v-if="!isMoreShown" class="activity op-thin-border">
            {{ reduction[0] }} | {{ reduction[1] }}
          </div>
          <template v-else>
            <div v-for="v in reduction" :key="v" class="activity op-thin-border">{{ v }}</div>
          </template>
        </div>
        <VanIcon :name="`arrow-${isMoreShown ? 'up' : 'down'}`" color="rgb(207,207,207)"></VanIcon>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home-shop-item {
  background: white;
  border-radius: 10px;
  padding: 15px 15px 12px 10px;
  margin-bottom: 10px;
  font-size: 12px;
  text-align: left;
  display: flex;

  &__poster {
    width: 105px;
    height: 105px;
  }
  &__info {
    flex: 1;
    width: 0;
    margin-left: 10px;
    .info__top {
      display: flex;
      .info__name {
        font-weight: bold;
        font-size: 16px;
        line-height: 16px;
        margin-bottom: 4px;
      }
    }
    .info__desc {
      display: flex;
      align-items: baseline;
      margin-bottom: 4px;
      color: gray;
      .score {
        color: rgb(252, 95, 4);
        font-size: bold;
        margin-right: 7px;
      }
      .monthly-count {
        flex: 1;
      }
      .delivery-time {
        margin-right: 7px;
      }
      .delivery-distance {
        display: inline-block;
        vertical-align: baseline;
      }
      .delivery-strating-price {
        margin-right: 5px;
      }
      .delivery-strategy {
        flex: 1;
        margin-right: 6px;
      }
      .delivery-tag {
        color: var(--op-primary-color);
        padding: 1px 2px;
        &:before {
          border: 1px solid var(--op-primary-color);
        }
      }
    }
    .info__comment {
      border-radius: 2px;
      color: rgb(252, 95, 4);
      background: rgb(253, 239, 229);
      width: fit-content;
      padding: 1px 5px;
      margin-bottom: 5px;
      font-size: 10px;
    }
    .info__more {
      display: flex;
      .activities {
        flex: 1;
      }
      .label {
        color: gray;
        width: 35px;
      }
      .van-icon {
        margin-top: 3px;
      }
      .activity {
        display: inline-block;
        color: rgb(247, 68, 68);
        padding: 0 4px;
        margin-right: 5px;
        margin-bottom: 2px;
        font-size: 10px;
        &:before {
          border: 1px solid rgb(247, 68, 68);
        }
      }
    }
  }
}
</style>
