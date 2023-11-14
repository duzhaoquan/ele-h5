import type { IMeInfor } from '@/types'
import axios from './base'

export const fetchMePageData = () => {
  return axios.get<IMeInfor, IMeInfor>('me_page')
}
