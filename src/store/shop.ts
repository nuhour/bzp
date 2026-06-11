import Taro from '@tarojs/taro'
import type { BzpShopSettings } from '@/types'
import { bzpApi } from '@/api/bzp'

const KEY = 'bzp_shop_settings'

const defaultShop: BzpShopSettings = {
  name: '包子铺',
  title: '热乎包子预约',
  avatar: '',
  address: '麦香巷18号',
  serviceHours: '08:00 - 20:00',
  contactPhone: '029-88886666',
  contactText: '欢迎咨询包子预约、到店自提、预约配送和订单进度。',
  qualificationImage: '',
  isActive: true
}

let shop: BzpShopSettings = Taro.getStorageSync(KEY) || defaultShop

const persist = () => Taro.setStorageSync(KEY, shop)

export const shopStore = {
  get: () => shop,
  async load() {
    try {
      shop = await bzpApi.shop()
      persist()
    } catch (_error) {}
    return shop
  }
}
