export interface Ipaginate {
  _page: number
  _limit: number
}

export interface IList<T> {
  data: T[]
  total: number
}
