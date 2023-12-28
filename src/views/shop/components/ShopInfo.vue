<script setup lang="ts">
const data = {
  shopName: '切果NOW！（团结湖店）',
  address: '朝阳区团结湖北二条21号楼105室',
  categoryName: '切果店',
  businessHours: '09:00-22:00',
  refund:
    '无忧退款室商家为用户在商超、水果、厨房生鲜、医药、鲜花、鸭脖、卤味店铺下单提供的权益，订单完成之后遇到商品错送漏送或者质量问题可以无忧退',
  invoice: '该商家支持开发票，请下单时填好发票抬头',
}
</script>

<template>
  <div class="shop-info">
    <div class="shop-info__top">
      <div class="name">{{ data.shopName }}</div>
      <div class="address">{{ data.address }}</div>
      <div class="name">商家信息</div>
      <div class="category">商家品类：{{ data.categoryName }}</div>
      <div class="businessHours">营业时间：{{ data.businessHours }}</div>
      <div class="button"><div class="button-text">查看营业资质</div></div>
    </div>
    <div class="shop-info__bottom">
      <div class="name">商家服务</div>
      <div class="refund">
        <div class="refund__wapper"><div class="refund__label">无忧退</div></div>

        <div class="refund__text">{{ data.refund }}</div>
      </div>
      <div class="invoice">
        <div class="invoice__wapper"><div class="invoice__label">开发票</div></div>
        <div class="invoice__text">{{ data.invoice }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.shop-info {
  background: var(--van-gray-1);
  padding: 10px;
  &__top {
    background: white;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    .name {
      margin-top: 20px;
      font-size: 17px;
      font-weight: bold;
    }
    .address,
    .category,
    .businessHours {
      color: var(--van-gray-6);
    }
    .button {
      margin: 20px 0px 8px 0;
      display: grid;
      justify-content: center;
      .button-text {
        color: var(--van-gray-6);
        padding: 5px 10px;
        border-radius: 30px;
        font-size: 15px;
        border: 1px solid var(--van-gray-6);
      }
    }
  }
  &__bottom {
    background: white;
    padding: 10px;
    border-radius: 10px;
    .name {
      font-size: 17px;
      font-weight: bold;
    }
    .refund {
      display: flex;
      &__wapper {
        width: 140px;
      }
      &__label {
        text-align: center;
        font-size: 12px;
        border-radius: 5px;
        line-height: 1.2;

        border: 1px solid var(--van-gray-6);
      }
      &__text {
        margin-left: 5px;
        font-size: 12px;
        color: var(--van-gray-7);
      }
    }
    .invoice {
      margin-top: 10px;
      margin-bottom: 10px;
      display: flex;
      &__wapper {
        width: 50px;
      }
      &__label {
        text-align: center;
        font-size: 12px;
        border-radius: 5px;
        line-height: 1.2;
        width: 50px;
        border: 1px solid var(--van-gray-6);
      }
      &__text {
        margin-left: 5px;
        font-size: 12px;
        color: var(--van-gray-7);
      }
    }
  }
}
</style>
