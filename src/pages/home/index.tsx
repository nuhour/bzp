import Taro, { useDidShow } from '@tarojs/taro'
import { Button, Image, ScrollView, Text, View } from '@tarojs/components'
import { useState } from 'react'
import type { BzpHomePayload } from '@/types'
import { catalogStore } from '@/store/catalog'
import { cartStore } from '@/store/cart'
import { userStore } from '@/store/user'
import { shopStore } from '@/store/shop'
import { demoHome } from '@/store/demo'
import { AppNavBar } from '@/components/ui/AppNavBar'
import { ProductCard } from '@/components/product/ProductCard'
import { openShopContact } from '@/utils/service'
import './index.scss'

const tabBarPages = new Set(['/pages/home/index', '/pages/category/index', '/pages/cart/index', '/pages/mine/index'])

function openBzpPage(url: string) {
  if (tabBarPages.has(url)) {
    Taro.switchTab({ url })
    return
  }
  Taro.navigateTo({ url })
}

export default function HomePage() {
  const [home, setHome] = useState<BzpHomePayload>(catalogStore.getHome() || demoHome)
  const profile = userStore.getProfile()

  useDidShow(() => {
    catalogStore.loadHome().then(setHome)
    shopStore.load()
  })

  const addProduct = async (productId: string) => {
    await cartStore.add(productId)
    Taro.showToast({ title: '已加入购物车', icon: 'success' })
  }

  return (
    <View className="bzp-page bzp-home-page">
      <AppNavBar title="包子铺" />
      <View className="bzp-home-member">
        <View>
          <Text className="bzp-home-member__hello">{profile?.nickname || '你好，包子铺客人'}</Text>
          <View className="bzp-home-member__stats">
            <Text>积分 {profile?.asset.points ?? 1280}</Text>
            <Text>余额 ¥{(profile?.asset.balance ?? 86).toFixed(2)}</Text>
          </View>
        </View>
        <Button className="bzp-home-member__login" onClick={() => userStore.requireLogin('请先登录包子铺')}>登录</Button>
      </View>

      <View className="bzp-home-hero" onClick={() => openBzpPage('/pages/category/index')}>
        <Image className="bzp-home-hero__image" src={home.banners[0]?.image || home.products[0]?.cover} mode="aspectFill" />
        <View className="bzp-home-hero__content">
          <Text className="bzp-home-hero__tag">今日现蒸</Text>
          <Text className="bzp-home-hero__title">{home.banners[0]?.title || '明早热乎档'}</Text>
          <Text className="bzp-home-hero__subtitle">{home.banners[0]?.subtitle || '预定下单，预约到店或配送'}</Text>
        </View>
      </View>

      <View className="bzp-home-grid">
        {[
          ['鲜肉包', '/pages/category/index'],
          ['素菜包', '/pages/category/index'],
          ['粥饮豆浆', '/pages/category/index'],
          ['预约订单', '/pages/order/list/index'],
          ['优惠券', '/pages/mine/index'],
          ['收藏', '/pages/mine/index'],
          ['门店', '/pages/checkout/index'],
          ['客服', 'service']
        ].map(([label, url]) => (
          <View key={label} className="bzp-home-grid__item" onClick={() => url === 'service' ? openShopContact() : openBzpPage(url)}>
            <Text className="bzp-home-grid__icon">✦</Text>
            <Text>{label}</Text>
          </View>
        ))}
      </View>

      <View className="bzp-section-title">
        <Text>今日特惠</Text>
        <Text className="bzp-home-more" onClick={() => openBzpPage('/pages/category/index')}>查看全部</Text>
      </View>
      <ScrollView className="bzp-home-specials" scrollX>
        {home.recommendedProducts.map((product) => (
          <View key={product.id} className="bzp-home-specials__item">
            <ProductCard product={product} onAdd={addProduct} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
