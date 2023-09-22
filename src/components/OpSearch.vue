<script setup lang="ts">
interface IProps {
  showAction?: boolean
  background?: string
  placeholder?: string
  shape?: string
  modelValue?: string | number
}
const props = defineProps<IProps>()

interface IEmits {
  (e: 'search', v?: string | number): void
  (e: 'cancel'): void
  (e: 'clear'): void
  (e: 'update:mdelValue', v?: string): void
  (e: 'inputClick'): void
}
const emits = defineEmits<IEmits>()

const onclear = () => {
  emits('update:mdelValue', '')
  emits('clear')
}
const onkeypress = (e: KeyboardEvent) => {
  if (e.keyCode === 13) {
    e.preventDefault()
    emits('search', props.modelValue)
  }
}
</script>

<template>
  <div class="op-search" :class="{ 'op-search--show-action': showAction }" :style="{ background }">
    <div class="op-search__content" :class="shape ? `op-search__content--${shape}` : ''">
      <div class="op-cell op-search__field">
        <div class="op-field__left-icon">
          <VanIcon name="search"></VanIcon>
        </div>
        <div class="op-cell__value">
          <div class="op-feild__body">
            <input
              type="search"
              class="op-feild__control"
              :value="modelValue"
              :placeholder="placeholder"
              @keypress="onkeypress"
              @click="emits('inputClick')"
              @input="(e) => emits('update:mdelValue', (e.target as HTMLInputElement).value)"
            />
          </div>
          <div v-if="$slots['right-icon']" class="op-feild__right-icon">
            <slot name="right-icon"></slot>
          </div>
          <VanIcon
            v-else-if="modelValue"
            class="op-feild__clear"
            name="clear"
            @click="onclear"
          ></VanIcon>
        </div>
      </div>
    </div>
    <div v-if="showAction" class="op-search__action">
      <slot name="action">
        <!-- //默认插槽内容 -->
        <div @click="emits('cancel')">取消</div>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
:root {
  --op-search-padding: 10px var(--van-padding-sm);
  --op-search-background-color: var(--van-background-color-light);
  --op-search-content-background: var(--van-gray-1);
  --op-search-left-icon-color: var(--van-gray-6);
  --op-search-action-padding: 0 var(--van-padding-xs);
  --op-search-action-text-color: var(--van-text-color);
  --op-search-action-font-size: var(--van-font-size-md);
  --op-search-input-height: 34px;
}
.op-search {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  padding: var(--op-search-padding);
  background: var(--op-search-background-color);

  &--show-action {
    padding-right: 0;
  }

  &__content {
    display: flex;
    flex: 1;
    padding-left: var(--van-padding-sm);
    background: var(--op-search-content-background);
    border-radius: var(--van-border--radius-sm);
    &--round {
      border-radius: var(--van-radius-max);
    }
  }
  &__action {
    padding: var(--op-search-action-padding);
    color: var(--op-search-action-text-color);
    font-size: var(--op-search-action-font-size);
    line-height: var(--op-search-input-height);
    cursor: pointer;
    user-select: none;
  }
  &__field {
    flex: 1;
    padding: 5px var(--van-padding-xs) 5px 0;
    background-color: transparent;

    .op-field__left-icon {
      color: var(--op-search-left-icon-color);
      margin-right: var(--van-padding-base);
      .van-icon {
        font-size: var(--van-field-icon-size);
      }
    }
  }
}
.op-cell {
  display: flex;
  box-sizing: border-box;
  width: 100%;
  color: var(--van-cell-text-color);
  font-size: var(--van-cell-font-size);
  line-height: var(--van-cel-line-height);
  &__value {
    display: flex;
    flex: 1;
    color: var(--van-cell-text-color);
    vertical-align: middle;
    word-wrap: break-word;
  }
}
.op-feild {
  &__body {
    display: flex;
    flex: 1;
    align-items: center;
  }

  &__control {
    display: block;
    box-sizing: border-box;
    width: 100%;
    min-width: none;
    margin: 0;
    padding: 0;
    border: 0;
    color: var(--van-feild-input-text-color);
    text-align: left;
    background-color: transparent;
    resize: none;
    user-select: none;
    &::placeholder {
      color: var(--van-feild-input-placeholder-color);
    }
  }
  &__right-icon {
    color: var(--van-field-right-icon-color);
    padding: 0 var(--van-padding-xs);
    line-height: inherit;
    flex-shrink: 0;
  }
  &__clear {
    color: var(--van-field-clear-icon-color);
    font-size: var(--van-field-clear-icon-size) !important;
    cursor: pointer;
  }
}
input {
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    display: none;
  }
}
</style>
