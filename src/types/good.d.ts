interface IGood {
  cartCount: number
  checked: boolean
  discount: IGoodDiscount
  id: number
  imgUrl: string
  name: string
  oldPrice: number
  price: number
  sellCount: number
  tips: string
  rating: number
}

export interface IGoodDiscount {
  type: number
  limitCount: number
}

export interface IMenu {
  value: number
  label: string
  icon: string
  goods: IGood[]
}

export interface IMenuList {
  shopId: number
  data: IMenu[]
}
