import type { IShop, IList, IPaginate } from '@/types'
import axios from './base'

export const fetchShopList = ({ _page, _limit }: IPaginate) => {
  return axios.get<IList<IShop>, IList<IShop>>('shop_list', {
    params: {
      _page,
      _limit,
    },
  })
}
