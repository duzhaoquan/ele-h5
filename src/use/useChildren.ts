import type { ComponentInternalInstance, InjectionKey, Ref } from 'vue'
import type { ParentProvide } from './useParent'
import { reactive, provide } from 'vue'

export type NotNullChild = ComponentInternalInstance & Record<string, any>
export type Child = NotNullChild | null

export function useChildren(key: InjectionKey<ParentProvide>) {
  const children = reactive<Child[]>([])

  const linkChildren = (value?: any) => {
    const link = (child: Child) => {
      children.push(child)
    }

    const unlink = (child: Child) => {
      const index = children.indexOf(child)
      children.splice(index, 1)
    }
    //提供注入
    provide(key, {
      link,
      unlink,
      ...value, //把value对象所有属性添加进去
    })
  }

  return {
    children,
    linkChildren,
  }
}
