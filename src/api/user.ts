import type { ILoginInfo, Iauth } from '@/types'
import axios from './base'

export const auth = ({ username, password }: ILoginInfo) => {
  return axios.post<Iauth, Iauth>('auth', {
    username,
    password,
  })
}
