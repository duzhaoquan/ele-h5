<script setup lang="ts">
import CartControl from './CartControl.vue'
import { useRoute } from 'vue-router'
import type { IGood } from '@/types/good'
import { ref } from 'vue'
import ShopCart from './ShopCart.vue'

const router = useRoute()
const data = router.query.data
const goods = JSON.parse(data as string) as IGood
const onClickLeft = () => history.back()

const sheight = ref(300) //高度
const imgWidth = ref(1) //放大比例
const isPlay = ref(false) //是否播放动画

let clientMoveY = 0 //按下
const move = (e: TouchEvent) => {
  if (clientMoveY === 0) {
    clientMoveY = e.changedTouches[0].clientY
    return
  }
  // 本次手指移动的位置和上次移动的位置对比 <0 证明用户在下拉
  if (clientMoveY - e.changedTouches[0].clientY < 0) {
    // 拿到下拉的距离
    const distance = (clientMoveY - e.changedTouches[0].clientY) * 0.5
    //放大1.5倍大小
    if (imgWidth.value < 1.5) {
      sheight.value -= distance
      imgWidth.value -= distance / 300
    } else {
      //超过1.5倍就return 优化性能
      return
    }
  } else {
    return
  }
  // 上边的代码执行结束之后再把本次手指的位置赋值给data中,用来下一次对比
  clientMoveY = e.changedTouches[0].clientY
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const end = (e: unknown) => {
  clientMoveY = 0
  // 当图片的高度大于400的时候手指抬起再调用函数
  if (sheight.value > 300) {
    // 执行动画
    isPlay.value = true
    //动画结束后把顶部图片的高度和放大比例该会原来的值
    setTimeout(() => {
      sheight.value = 300
      imgWidth.value = 1
      // 并把动画的class名取消掉
      isPlay.value = false
    }, 505)
  }
}
</script>
<template>
  <div class="good-detail op-fullscreen" @touchmove="move" @touchend="end">
    <VanIcon class="back-icon" name="arrow-left" @click="onClickLeft"></VanIcon>
    <div :class="{ banner: true, isPlay: isPlay }" :style="{ height: sheight + 'px' }">
      <img
        id="zoomingImage"
        :src="goods.imgUrl"
        :class="{ isPlay: isPlay }"
        :style="{ height: sheight + 'px', transform: `scale(${imgWidth})` }"
      />
    </div>
    <div class="content">
      <div class="name">{{ goods.name }}</div>
      <div class="tips op-ellipsis" v-if="goods.tips">{{ goods.tips }}</div>
      <div class="extra">
        <span class="count">月售{{ goods.sellCount }}份</span>
        <span class="rating">评分 {{ goods.rating }}</span>
      </div>
      <div class="price">
        <div class="now">
          ¥ <span>{{ goods.price }}</span>
        </div>
        <div class="old">¥{{ goods.oldPrice }}</div>
      </div>
      <div class="cart-control-warpper"><CartControl :good="goods"></CartControl></div>
    </div>
    <div class="red-bag">
      <div class="bag">红包保障</div>
      <div class="no-back">不支持七天无理由退换</div>
    </div>
    <ShopCart></ShopCart>
  </div>
</template>

<style lang="scss" scoped>
.good-detail {
  overflow-y: scroll;
  .back-icon {
    position: absolute;
    z-index: 1;
    margin-left: 10px;
    margin-top: 20px;
    padding: 6px 8px 6px 4px;
    background: rgb(203, 233, 203);
    border-radius: 50%;
  }
  .content {
    background: white;
    margin: 10px 0;
    padding: 10px;
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
      bottom: 10px;
      right: 10px;
    }
  }
  .red-bag {
    background: white;
    margin-top: 10px;
    display: flex;
    padding: 10px;
    align-items: end;
    .bag {
      color: gray;
      width: 40px;
    }
  }
  .banner {
    width: 100%;
    overflow: hidden; //防止图片放大，宽度被撑开
    background-size: cover;
    position: relative;
    img {
      width: 100%;
      max-height: 500px;
      position: absolute;
      bottom: 0;
    }
  }
  // 一个动画
  .isPlay {
    animation: big 0.5s 1 alternate ease-in-out forwards;
  }
  @keyframes big {
    100% {
      transform: scale(1);
      height: 300px;
    }
  }
}
</style>
