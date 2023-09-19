export interface IItem {
  count: number
  iconUrl: string
  label: string
}
export interface ICard {
  size: number
  label: string
  items: IItem[]
}
export interface ISuperCard {
  beanCount: number
  tips: string
}

export interface IMefor {
  cards: ICard[]
  superCard: ISuperCard
}
