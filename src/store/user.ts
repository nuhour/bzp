import Taro from '@tarojs/taro'
import type { BzpUserProfile } from '@/types'
import { bzpApi } from '@/api/bzp'

const USER_KEY = 'bzp_user'

let profile: BzpUserProfile | null = Taro.getStorageSync(USER_KEY) || null

const persist = () => {
  if (profile) Taro.setStorageSync(USER_KEY, profile)
}

export const userStore = {
  getProfile: () => profile,
  isLoggedIn: () => Boolean(Taro.getStorageSync('bzp_token')),
  requireLogin(message = '登录后可继续操作') {
    if (this.isLoggedIn()) return true
    Taro.showToast({ title: message, icon: 'none' })
    Taro.eventCenter.trigger('bzp:login-required', message)
    return false
  },
  async loadProfile() {
    try {
      profile = await bzpApi.profile()
      persist()
    } catch (_error) {}
    return profile
  },
  async login() {
    const loginResult = await Taro.login()
    if (!loginResult.code) {
      throw new Error('微信登录code获取失败')
    }
    const result = await bzpApi.wechatLogin({ code: loginResult.code })
    Taro.setStorageSync('bzp_token', result.access)
    Taro.setStorageSync('bzp_refresh_token', result.refresh)
    profile = result.profile
    persist()
    return profile
  },
  setProfile(next: BzpUserProfile) {
    profile = next
    persist()
  },
  logout() {
    profile = null
    Taro.removeStorageSync('bzp_token')
    Taro.removeStorageSync('bzp_refresh_token')
    Taro.removeStorageSync(USER_KEY)
  }
}
