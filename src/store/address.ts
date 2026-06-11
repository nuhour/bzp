import Taro from '@tarojs/taro'
import type { BzpAddress } from '@/types'
import { bzpApi } from '@/api/bzp'
import { userStore } from './user'

const KEY = 'bzp_addresses'
export const ADDRESS_UPDATED_EVENT = 'bzp:address-updated'

let addresses: BzpAddress[] = Taro.getStorageSync(KEY) || []

const persist = () => Taro.setStorageSync(KEY, addresses)
const notifyUpdated = () => Taro.eventCenter.trigger(ADDRESS_UPDATED_EVENT, [...addresses])

const replace = (next: BzpAddress[]) => {
  addresses = next.map((item) => ({ ...item }))
  persist()
  notifyUpdated()
}

export const addressStore = {
  getList: () => addresses,
  getDefault: () => addresses.find((item) => item.isDefault) || addresses[0],
  find: (id?: string) => addresses.find((item) => item.id === id),
  async load() {
    if (!userStore.isLoggedIn()) return addresses
    try {
      replace(await bzpApi.addresses())
    } catch (_error) {}
    return addresses
  },
  async save(address: BzpAddress) {
    const saved = await bzpApi.saveAddress(address)
    const next = addresses.some((item) => item.id === saved.id)
      ? addresses.map((item) => item.id === saved.id ? saved : item)
      : [saved, ...addresses]
    replace(saved.isDefault ? next.map((item) => ({ ...item, isDefault: item.id === saved.id })) : next)
    return saved
  },
  async setDefault(id: string) {
    const saved = await bzpApi.setDefaultAddress(id)
    replace(addresses.map((item) => ({ ...item, isDefault: item.id === saved.id })))
    return saved
  },
  async remove(id: string) {
    await bzpApi.deleteAddress(id)
    replace(addresses.filter((item) => item.id !== id))
    return addresses
  }
}
