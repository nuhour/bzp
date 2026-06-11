import type {
  FulfillmentType,
  BzpAddress,
  BzpCartItem,
  BzpCategory,
  BzpCoupon,
  BzpFulfillmentSlot,
  BzpHomePayload,
  BzpMemberAsset,
  BzpOrder,
  BzpOrderPayResult,
  BzpOrderPreview,
  BzpProduct,
  BzpShopSettings,
  BzpStore,
  BzpUserProfile
} from '@/types'
import type { BzpCheckoutState } from '@/store/checkout'
import { request } from './client'

const query = (params: Record<string, string | number | undefined>) => {
  const parts = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== '')
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
  return parts.length ? `?${parts.join('&')}` : ''
}

export interface WechatLoginResult {
  access: string
  refresh: string
  profile: BzpUserProfile
  openid: string
}

export const bzpApi = {
  home: () => request<BzpHomePayload>('/bzp/home'),
  shop: () => request<BzpShopSettings>('/bzp/service/shop-settings'),
  categories: () => request<BzpCategory[]>('/bzp/categories'),
  products: (params: { categoryId?: string; keyword?: string; type?: string } = {}) =>
    request<BzpProduct[]>(`/bzp/products${query(params)}`),
  productDetail: (id: string) => request<BzpProduct>(`/bzp/products/${id}`),
  stores: () => request<BzpStore[]>('/bzp/stores'),
  slots: (params: { date?: string; fulfillmentType?: FulfillmentType; storeId?: string } = {}) =>
    request<BzpFulfillmentSlot[]>(`/bzp/slots${query(params)}`),
  wechatLogin: (data: { code: string; nickname?: string; avatar?: string }) =>
    request<WechatLoginResult>('/bzp/auth/wechat-login', { method: 'POST', data }),
  logout: (refresh?: string) => request<{ loggedOut: boolean }>('/bzp/auth/logout', { method: 'POST', data: { refresh } }),
  profile: () => request<BzpUserProfile>('/bzp/auth/profile'),
  assets: () => request<BzpMemberAsset>('/bzp/auth/assets'),
  addresses: () => request<BzpAddress[]>('/bzp/addresses'),
  saveAddress: (address: BzpAddress) => request<BzpAddress>('/bzp/addresses', { method: 'POST', data: address }),
  setDefaultAddress: (id: string) => request<BzpAddress>(`/bzp/addresses/${id}`, { method: 'POST', data: { action: 'setDefault' } }),
  deleteAddress: (id: string) => request<{ deleted: boolean }>(`/bzp/addresses/${id}`, { method: 'POST', data: { action: 'delete' } }),
  cart: () => request<BzpCartItem[]>('/bzp/cart'),
  addCartItem: (data: { productId: string; quantity?: number; flavorId?: string; specId?: string }) =>
    request<BzpCartItem[]>('/bzp/cart/items', { method: 'POST', data }),
  updateCartItem: (productId: string, data: Partial<BzpCartItem>) =>
    request<BzpCartItem[]>(`/bzp/cart/items/${productId}`, { method: 'POST', data }),
  deleteCartItem: (productId: string, data: Partial<BzpCartItem> = {}) =>
    request<BzpCartItem[]>(`/bzp/cart/items/${productId}`, { method: 'POST', data: { ...data, action: 'delete' } }),
  coupons: () => request<BzpCoupon[]>('/bzp/coupons'),
  previewOrder: (checkout: BzpCheckoutState) =>
    request<BzpOrderPreview>('/bzp/orders/preview', { method: 'POST', data: checkout }),
  createOrder: (checkout: BzpCheckoutState) =>
    request<BzpOrder>('/bzp/orders', { method: 'POST', data: checkout }),
  orders: (status?: string) => request<BzpOrder[]>(`/bzp/orders${query({ status })}`),
  orderDetail: (id: string) => request<BzpOrder>(`/bzp/orders/${id}`),
  payOrder: (id: string) => request<BzpOrderPayResult>(`/bzp/orders/${id}/pay`, { method: 'POST' }),
  cancelOrder: (id: string) => request<BzpOrder>(`/bzp/orders/${id}/cancel`, { method: 'POST' }),
  confirmOrder: (id: string) => request<BzpOrder>(`/bzp/orders/${id}/confirm`, { method: 'POST' })
}
