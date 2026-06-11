export type FulfillmentType = 'pickup' | 'delivery'
export type OrderStatus = 'pendingPay' | 'preparing' | 'readyForPickup' | 'delivering' | 'completed' | 'cancelled' | 'afterSale'

export interface BzpCategory {
  id: string
  name: string
  sort: number
  isActive: boolean
}

export interface BzpProductOption {
  id: string
  name: string
  priceDelta?: number
}

export interface BzpProductMedia {
  type: 'image' | 'video'
  url: string
}

export interface BzpNutritionItem {
  label: string
  value: string
}

export interface BzpProduct {
  id: string
  categoryId: string
  categoryName?: string
  name: string
  subtitle: string
  description?: string
  price: number
  originalPrice?: number
  stock: number
  sales: number
  points: number
  cover: string
  media: BzpProductMedia[]
  detailImages: string[]
  tags: string[]
  flavors: BzpProductOption[]
  specs: BzpProductOption[]
  batchLabel?: string
  serveWindow?: string
  steamTag?: string
  ingredients: string
  nutrition: BzpNutritionItem[]
  isActive: boolean
  isRecommended: boolean
  isNew: boolean
}

export interface BzpHomeBanner {
  id: string
  title: string
  subtitle: string
  image: string
  linkUrl: string
  sort: number
  isActive: boolean
}

export interface BzpHomePayload {
  categories: BzpCategory[]
  products: BzpProduct[]
  banners: BzpHomeBanner[]
  recommendedProducts: BzpProduct[]
  newProducts: BzpProduct[]
}

export interface BzpStore {
  id: string
  name: string
  address: string
  phone: string
  businessHours: string
  isPickupEnabled: boolean
}

export interface BzpShopSettings {
  id?: string
  name: string
  title: string
  avatar: string
  address: string
  serviceHours: string
  contactPhone: string
  contactText: string
  qualificationImage: string
  isActive: boolean
}

export interface BzpAddress {
  id: string
  name: string
  phone: string
  region: string
  detail: string
  tag: string
  isDefault: boolean
}

export interface BzpFulfillmentSlot {
  id: string
  date: string
  startTime: string
  endTime: string
  batchLabel?: string
  fulfillmentType: FulfillmentType
  storeId?: string
  capacity: number
  reservedCapacity: number
  availableCapacity: number
  isActive: boolean
}

export interface BzpCartItem {
  productId: string
  quantity: number
  selected: boolean
  flavorId?: string
  specId?: string
}

export interface BzpCoupon {
  id: string
  title: string
  threshold: number
  discount: number
  status: 'unused' | 'used' | 'expired'
  expiresAt: string
}

export interface BzpMemberAsset {
  balance: number
  points: number
  couponCount: number
}

export interface BzpUserProfile {
  id?: string
  avatar: string
  nickname: string
  phone: string
  level: string
  asset: BzpMemberAsset
}

export interface BzpOrderItem {
  productId: string
  quantity: number
  price: number
  flavorId?: string
  specId?: string
  batchLabel?: string
  serveWindow?: string
  steamTag?: string
  product?: BzpProduct | null
}

export interface BzpOrder {
  id: string
  orderNo: string
  status: OrderStatus
  fulfillmentType: FulfillmentType
  storeId?: string
  addressId?: string
  slotId: string
  appointmentDate: string
  appointmentStartTime: string
  appointmentEndTime: string
  pickupCode?: string
  pickupContactName?: string
  pickupContactPhone?: string
  items: BzpOrderItem[]
  productAmount: number
  deliveryAmount: number
  couponAmount: number
  pointsAmount: number
  payableAmount: number
  message: string
  createdAt: string
  paidAt?: string
}

export interface BzpOrderPreview {
  items: BzpOrderItem[]
  productAmount: number
  deliveryAmount: number
  couponAmount: number
  pointsAmount: number
  payableAmount: number
}

export interface BzpPaymentParams {
  appId: string
  timeStamp: string
  nonceStr: string
  package: string
  signType: string
  paySign: string
  mock: boolean
  bypass: boolean
}

export interface BzpOrderPayResult {
  orderId: string
  orderNo: string
  payableAmount: number
  payment: BzpPaymentParams
  bypass: boolean
  order?: BzpOrder | null
}
