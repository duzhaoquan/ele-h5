<script setup lang="ts">
import type { IDiscount, IShopDetail } from '@/types'
import { useToggle } from '@/use/useToggle'

import { computed } from 'vue'

interface IProps {
  data: IShopDetail
}
enum DiscountEnum {
  Reducion = 1,
  Delivery = 2,
  Special = 3,
  Optional = 4,
}
const props = defineProps<IProps>()
const redduction = computed(() => {
  const reducion = props.data.discounts.find((v) => v.type === 1)
  return reducion ? reducion.content : []
})
const reductionLabel = computed(() => redduction.value.map((v) => `满${v.if}减${v.count}`))

const [isPopUpShown, popUpShown] = useToggle(false)

const formatter = (v: IDiscount) => {
  if (v.type === DiscountEnum.Reducion) {
    return '全店' + v.content.map((cv) => `满${cv.if}减${cv.count}`).join('，')
  }
  if (v.type === DiscountEnum.Delivery) {
    return v.content.map((cv) => `满${cv.if}减${cv.count}，${cv.limit}`).join('，')
  }
  if (v.type === DiscountEnum.Special) {
    return v.content.map((cv) => `特价 ${cv.count} 元起`).join('，')
  }
  if (v.type === DiscountEnum.Optional) {
    return v.content.map((cv) => cv.label).join('，')
  }
}
</script>

<template>
  <div class="shop-header">
    <div class="shop-header__info">
      <div class="info__left">
        <div class="shop-name op-ellipsis">
          {{ data.shopName }} <span v-if="data.branch">({{ data.branch }})</span>
        </div>
        <div class="delivery">
          <div class="delivery-tag op-thin-border" v-if="data.deliveryTags[0]">
            {{ data.deliveryTags[0] }}
          </div>
          <div class="delivery-time">{{ data.deliveryTime }}</div>
          <div class="delivery-count">月销 {{ data.monthlyCount }}</div>
        </div>
      </div>
      <div class="info__right">
        <img :src="data.postUrl" />
      </div>
    </div>
    <div class="shop-header__service">
      <div class="service-item" v-for="v in data.services.slice(0, 3)" :key="v.label">
        <VanIcon name="passed"></VanIcon>
        {{ v.label }}
      </div>
    </div>
    <div class="shop-header__anouncement op-ellipsis">公告： {{ data.announcement }}</div>
    <div class="shop-header__redbags">
      <div class="redbag" v-for="v in data.redbags" :key="v.type">
        <div class="redbag__left">
          ¥<span class="count">{{ v.count }}</span>
          <span class="if">{{ v.if }}</span>
        </div>
        <div class="redbag__right">领</div>
      </div>
    </div>
    <div class="shop-header__discount" @click.stop="popUpShown">
      <div class="flex">
        <div v-for="v in reductionLabel" :key="v" class="activity op-thin-border">{{ v }}</div>
      </div>
      <VanIcon class="van-icon" name="arrow-down" color="rgb(207,207,207)"></VanIcon>
    </div>
  </div>
  <VanActionSheet
    class="shop-header__action-sheet"
    v-model:show="isPopUpShown"
    title="红包优惠"
    background-color="rgb(2, 244, 244)"
  >
    <div class="content">
      <h4>红包</h4>
      <div class="red-bag" v-for="v in redduction" :key="`${v.if}_${v.count}`">
        <div class="l op-center">
          <div class="count">
            <span class="symbol">¥</span><span class="num">{{ v.count }}</span>
          </div>
        </div>
        <div class="m flex">
          <div class="type">店铺专享红包</div>
          <div class="detail">满 ¥{{ v.count }} 可用2023.12.31到期</div>
        </div>
        <div class="r op-center">
          <div class="recive op-center">领取</div>
        </div>
      </div>
      <h4>商家会员专属</h4>
      <div class="numberShip">
        <div class="l op-center">
          <div class="count">
            <span class="symbol">¥</span>
            <span class="num">5</span>
            <div class="detail">满0.01元可用</div>
          </div>
        </div>
        <div class="m flex">
          <div class="type">配送费满减</div>
          <div class="detail">全场可用，获得后30天内有效</div>
        </div>
        <div class="r op-center">
          <div class="recive op-center">领取</div>
        </div>
      </div>

      <h4>优惠</h4>
      <div class="discount">
        <div v-for="v in data.discounts" :key="v.label">
          <span>{{ v.label }}</span>
          <span>{{ formatter(v) }}</span>
        </div>
      </div>
    </div>
  </VanActionSheet>
</template>

<style lang="scss" scoped>
.shop-header {
  background: white;
  border-radius: 10px;
  font-size: 12px;
  padding: 10px;
  margin: var(--op-page-padding);
  box-shadow: 0px 0px 20px 0px rgb(0, 0, 0, 0.2);

  &__info {
    display: flex;
    margin-bottom: 5px;
    .info__left {
      flex: 1;
      .shop-name {
        width: 90%;
        font-size: 19px;
        font-weight: bold;
        margin: 6px 0 8px 0;
      }
      .delivery {
        display: flex;
        padding-left: 5px;
        .deliviry-tag {
          color: var(--op-primary-color);
          padding: 1px 5px;

          &::before {
            border: 1px solid var(--op-primary-color);
          }
        }
      }
      .delivery-time {
        margin-left: 10px;
      }
      .delivery-count {
        margin-left: 10px;
      }
    }
    .info__right {
      img {
        width: 50px;
        height: 50px;
      }
    }
  }
  &__service {
    display: flex;
    .service-item {
      margin-right: 5px;
    }
  }

  &__redbags {
    display: flex;
    line-height: 1.4;
    margin: 8px 0;
    align-items: baseline;
    .redbag {
      display: flex;
      margin-right: 5px;

      &__left {
        flex: 1;
        padding: 0px 8px 3px 8px;
        background: red;
        color: white;
        border-radius: 4px;

        .if {
          font-size: 12px;
          font-weight: bold;
          padding: 5px 0px;
        }
        .count {
          font-size: 16px;
          font-weight: bold;
          margin-left: 2px;
          margin-right: 5px;
        }
      }
      &__right {
        background: red;
        padding: 4px 8px;
        color: white;
        font-weight: bold;
        font-size: 12px;
        border-radius: 4px;
      }
    }
  }
  &__discount {
    display: flex;
    .flex {
      flex: 1;
      .activity {
        line-height: 1;
        padding: 1px 5px;
        margin-right: 8px;
        display: inline-block;
      }
    }
    .van-icon {
      margin-top: 3px;
    }
  }
  &__action-sheet {
    .op-center {
      align-items: center;
      display: flex;
      justify-content: center;
    }
    .flex {
      flex: 1;
    }
    background-color: rgb(244, 244, 244) !important;
    .content {
      background: rgb(244, 244, 244);
      padding: 0 10px;
      h4 {
        font-size: 15px;
        margin: 10px 0;
        font-weight: bold;
      }
      .red-bag,
      .numberShip {
        display: flex;
        background: white;
        margin-bottom: 10px;
        padding: 25px 0;
        border-radius: 10px;
        .symbol {
          font-weight: bold;
        }
        .num {
          font-size: 30px;
          line-height: 0.7;
          font-weight: bold;
          margin-bottom: 3px;
        }
      }
      .red-bag {
        .count {
          display: flex;
          color: rgb(252, 76, 60);
          align-items: flex-end;
        }
      }
      .numberShip {
        display: flex;
        .count {
          flex-direction: column;
          color: rgb(133, 71, 0);
          align-items: flex-end;
        }
      }

      .l {
        width: 90px;
        text-align: center;
      }
      .type {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 5px;
      }
      .detail {
        font-size: 12px;
        color: var(--van-gray-7);
      }
      .r {
        width: 90px;

        .recive {
          font-size: 13px;
          width: 75px;
          height: 30px;
          border-radius: 15px;
          background: red;
          color: white;
        }
      }
    }
  }
}
</style>
