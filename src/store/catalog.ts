import Taro from '@tarojs/taro'
import type { BzpCategory, BzpHomePayload, BzpProduct } from '@/types'
import { bzpApi } from '@/api/bzp'
import { demoCategories, demoHome, demoProducts } from './demo'

const CATEGORY_KEY = 'bzp_categories'
const PRODUCT_KEY = 'bzp_products'

let categories: BzpCategory[] = Taro.getStorageSync(CATEGORY_KEY) || demoCategories
let products: BzpProduct[] = Taro.getStorageSync(PRODUCT_KEY) || demoProducts
let home: BzpHomePayload = demoHome

const persist = () => {
  Taro.setStorageSync(CATEGORY_KEY, categories)
  Taro.setStorageSync(PRODUCT_KEY, products)
}

export const catalogStore = {
  getCategories: () => categories,
  getProducts: () => products,
  getHome: () => home,
  findProduct: (id?: string) => products.find((item) => item.id === id),
  async loadHome() {
    try {
      home = await bzpApi.home()
      categories = home.categories
      products = home.products
      persist()
    } catch (_error) {
      home = demoHome
      categories = demoCategories
      products = demoProducts
      persist()
    }
    return home
  },
  async loadCategories() {
    try {
      categories = await bzpApi.categories()
      persist()
    } catch (_error) {}
    return categories
  },
  async loadProducts(params: { categoryId?: string; keyword?: string; type?: string } = {}) {
    try {
      products = await bzpApi.products(params)
      persist()
    } catch (_error) {
      const { categoryId, keyword } = params
      products = demoProducts.filter((item) => {
        const matchesCategory = !categoryId || item.categoryId === categoryId
        const matchesKeyword = !keyword || item.name.includes(keyword) || item.subtitle.includes(keyword)
        return matchesCategory && matchesKeyword
      })
    }
    return products
  },
  async loadProduct(id: string) {
    try {
      const product = await bzpApi.productDetail(id)
      products = products.some((item) => item.id === product.id)
        ? products.map((item) => item.id === product.id ? product : item)
        : [product, ...products]
      persist()
      return product
    } catch (_error) {
      return this.findProduct(id)
    }
  }
}
