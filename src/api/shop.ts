import type { IList, IShop, Ipaginate } from '@/types'
import axios from './base'

export function fetchShopList({ _page, _limit }: Ipaginate) {
  return axios.get<IList<IShop>, IList<IShop>>('shop_list', {
    params: {
      _page,
      _limit,
    },
  })
}
