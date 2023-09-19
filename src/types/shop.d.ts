export interface IService {
  type: number
  label: string
}

export interface IActivity {
  type: number
  tips?: string
  info?: string[]
}

export interface IShop {
  activitys: IActivity[]
  branch: string
  comments: string[]
  deliveryDistance: string
  deliveryStrategy: string
  deliveryStratingPrice: string
  deliveryTags: string[]
  deliveryTime: string
  id: string
  monthlyCount: number
  services: IService[]
  shopName: string
  tops: string[]
}

export interface IDiscount {
  type: number
  label: string
  content: IDiscountContent[]
}

export interface IRedBag {
  type: number
  count: number
  if: string
}

export interface IDiscountContent {
  count: number
  if: number
  limit: number
  label: string
}
