<script setup lang="ts">
import { fetchMePageData } from '@/api/me'
import type OpLoadingView from '@/components/OpLoadingView.vue'
import type { ISuperCard } from '@/types'
import { useAsync } from '@/use/useAsync'
import { useAuth } from '@/use/useAuth'
import { useRouter } from 'vue-router'

const { user, logout } = useAuth()
const { data, pending } = useAsync(fetchMePageData, {
  cards: [],
  superCard: {} as ISuperCard,
})

const router = useRouter()

const gotoLogin = () => {
  router.push({
    name: 'login',
  })
}
</script>

<template>
  <div class="me-page op-fullscreen">
    <div class="me-page__top">
      <template v-if="user.id">
        <img class="avatar" :src="user.avatar" />
        <div class="name">{{ user.nickname }}</div>
        <div class="account op-thin-border" @click="logout">退出</div>
      </template>
      <template v-else>
        <img class="avatar" src="https://b.yzcdn.cn/vant/icon-demo-1126.png" />
        <div class="name" @click="gotoLogin">请登陆</div>
        <div class="account op-thin-border" @click="gotoLogin">账号登陆</div>
      </template>
    </div>
    <div class="me-page__super-card">
      <div class="super-card__left">
        <div class="super-card__left__top">
          <img class="card-img" src="@/assets/imgs/me_page/super-card.png" />
          <div class="divider"></div>
          <div class="bean">吃货豆：</div>
          <div class="bean-count">{{ data.superCard.beanCount }}</div>
        </div>
        <div class="super-card__left__tips">{{ data.superCard.tips }}</div>
      </div>
      <VanIcon name="arrow" size="14" color="rgb(212,189,178)"></VanIcon>
    </div>
    <OpLoadingView :loading="pending" type="skeleton">
      <div class="me-page__card" v-for="v in data.cards" :key="v.label">
        <div class="me-page__card__title">{{ v.label }}</div>
        <div class="me-page__card__items">
          <div class="me-page__card__item" v-for="cv in v.items" :key="cv.iconUrl">
            <VanIcon :name="cv.iconUrl" :size="v.size"></VanIcon>
            <div class="label">
              {{ cv.label }}
              <span v-if="cv.count" class="count">{{ cv.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </OpLoadingView>
  </div>
</template>

<style lang="scss" scoped>
.me-page {
  background: var(--op-gray-bg-color);
  padding: 0 10px 75px 10px;
  &__top {
    padding: 10px;
    display: flex;
    align-items: center;
    background-color: rgb(244, 244, 244);
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .name {
      flex: 1;
      font-size: 15px;
      text-align: left;
    }
    .account {
      color: rgb(23, 179, 244);
      font-size: 8px;
      padding: 1px 10px;
      &:before {
        border-color: rgb(33, 179, 244);
        border-radius: 50px;
      }
    }
  }

  &__super-card {
    background: rgb(42, 33, 46);
    color: rgb(253, 208, 159);
    margin-bottom: 15px;
    padding: 10px 10px 10px 20px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    .super-card__left {
      flex: 1;
      &__top {
        display: flex;
        align-items: center;
        .card-img {
          width: 81px;
          height: 23px;
        }
        .divider {
          position: relative;
          width: 1px;
          height: 20px;
          margin: 0 10px;
          background: rgb(253, 208, 159);
        }
        .bean {
          font-size: 12px;
          font-weight: bold;
          align-items: baseline;
        }
        .bean-count {
          font-size: 22px;
          font-weight: bold;
          line-height: 22px;
        }
      }
      &__tips {
        font-size: 12px;
        margin-top: 6px;
        color: rgb(212, 189, 178);
      }
    }
  }
  &__card {
    background: white;
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 10px;
    &__title {
      font-weight: bold;
    }
    &__items {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
    }
    &__item {
      margin-top: 10px;
      text-align: center;
      .label {
        font-size: 12px;
        color: gray;
        margin-top: 5px;
      }
      .count {
        color: black;
        font-weight: bold;
      }
    }
  }
}
</style>
