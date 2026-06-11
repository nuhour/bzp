import Taro from '@tarojs/taro'

export interface ApiResponse<T> {
  success: boolean
  message?: string
  msg?: string
  result?: T
}

const API_TIMEOUT = 15000
const LOGIN_REQUIRED_EVENT = 'bzp:login-required'

export const getBaseUrl = () => {
  const baseURL = process.env.TARO_APP_BZP_API_BASE_URL || process.env.BZP_API_BASE_URL || 'http://localhost:8000/api'
  return baseURL.replace(/\/$/, '')
}

type RequestOptions = Omit<Taro.request.Option, 'url'>

export function getErrorMessage(error: unknown, fallback = '请求失败') {
  return error instanceof Error && error.message ? error.message : fallback
}

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const baseUrl = getBaseUrl()
  if (!baseUrl) {
    throw new Error('BZP API base URL is not configured')
  }

  const token = Taro.getStorageSync('bzp_token')
  const refreshToken = Taro.getStorageSync('bzp_refresh_token')
  const headers = {
    ...(options.header || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(refreshToken ? { 'X-Refresh-Token': refreshToken } : {})
  }

  let response: Taro.request.SuccessCallbackResult<ApiResponse<T>>
  try {
    response = await Taro.request<ApiResponse<T>>({
      ...options,
      url: `${baseUrl}${path}`,
      header: headers,
      timeout: options.timeout || API_TIMEOUT
    })
  } catch (error) {
    console.warn('[bzp-api] request failed', path, error)
    throw error
  }

  const data = response.data
  if (response.statusCode === 401 || response.statusCode === 403) {
    Taro.removeStorageSync('bzp_token')
    Taro.removeStorageSync('bzp_refresh_token')
    Taro.removeStorageSync('bzp_user')
    Taro.eventCenter.trigger(LOGIN_REQUIRED_EVENT, '登录状态已失效，请重新登录')
    throw new Error('登录状态已失效，请重新登录')
  }
  if (!data?.success) {
    throw new Error(data?.message || data?.msg || '请求失败')
  }
  return data.result as T
}
