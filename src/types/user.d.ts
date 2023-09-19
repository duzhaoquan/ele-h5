export interface ILoginInfo {
  username: string
  password: string
}

export interface IUserInfo {
  id: number | string
  avatar: string
  nickname: string
}

export interface Iauth {
  userInfo: IUserInfo
  token: string
}
