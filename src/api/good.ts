import axios from './base'
import type { IMenuList } from '@/types/good'

export const fetchGoodListData = (shopId: string) => {
  return axios.get<IMenuList, IMenuList>('goods_list', {
    params: { shopId },
  })
}
