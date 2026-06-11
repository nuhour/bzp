import Taro, { useRouter } from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import { useEffect, useState } from 'react'
import type { BzpProduct } from '@/types'
import { catalogStore } from '@/store/catalog'
import { cartStore } from '@/store/cart'
import { checkoutStore } from '@/store/checkout'
import { AppNavBar } from '@/components/ui/AppNavBar'
import { PriceText } from '@/components/ui/PriceText'
import { openShopContact } from '@/utils/service'
import './index.scss'

export default function ProductDetailPage() {
  const router = useRouter()
  const id = String(router.params.id || '')
  const [product, setProduct] = useState<BzpProduct | undefined>(catalogStore.findProduct(id))
  const [quantity, setQuantity] = useState(1)
  const [flavorId, setFlavorId] = useState(product?.flavors[0]?.id)
  const [specId, setSpecId] = useState(product?.specs[0]?.id)

  useEffect(() => {
    catalogStore.loadProduct(id).then((item) => {
      if (!item) return
      setProduct(item)
      setFlavorId(item.flavors[0]?.id)
      setSpecId(item.specs[0]?.id)
    })
  }, [id])

  if (!product) return <View className="bzp-page bzp-detail-page" />
  const soldOut = !product.isActive || product.stock <= 0

  const buyNow = () => {
    if (soldOut) {
      Taro.showToast({ title: '商品已售罄', icon: 'none' })
      return
    }
    checkoutStore.set({ source: 'buyNow', productId: product.id, quantity, flavorId, specId })
    Taro.navigateTo({ url: '/pages/checkout/index' })
  }

  const addToCart = async () => {
    try {
      await cartStore.add(product.id, quantity, flavorId, specId)
      Taro.showToast({ title: '已加入购物车', icon: 'success' })
    } catch (error) {
      Taro.showToast({ title: error instanceof Error ? error.message : '加入失败', icon: 'none' })
    }
  }

  return (
    <View className="bzp-page bzp-detail-page">
      <AppNavBar title="商品详情" back />
      <View className="bzp-detail-hero">
        <Image className="bzp-detail-hero__image" src={product.cover} mode="aspectFill" />
      </View>
      <View className="bzp-detail-panel">
        <View className="bzp-detail-head">
          <Text className="bzp-detail-title">{product.name}</Text>
          <PriceText value={product.price} original={product.originalPrice} />
        </View>
        <Text className="bzp-detail-subtitle">{product.subtitle}</Text>
        <View className="bzp-detail-batch">
          {product.batchLabel && <Text className="bzp-detail-batch__label">{product.batchLabel}</Text>}
          {product.steamTag && <Text className="bzp-detail-batch__steam">{product.steamTag}</Text>}
          {product.serveWindow && <Text className="bzp-detail-batch__window">{product.serveWindow}</Text>}
        </View>
        <Text className={soldOut ? 'bzp-detail-stock bzp-detail-stock--warn' : 'bzp-detail-stock'}>{soldOut ? '已售罄' : `库存 ${product.stock} 件`}</Text>
        <Text className="bzp-detail-desc">每日小批量制作，支持预约到店自提和预约配送。建议提前选择时段，下单后门店按预约时间备货。</Text>

        <Text className="bzp-detail-label">口味</Text>
        <View className="bzp-detail-options">
          {product.flavors.map((item) => (
            <Text key={item.id} className={`bzp-detail-chip ${flavorId === item.id ? 'bzp-detail-chip--active' : ''}`} onClick={() => setFlavorId(item.id)}>{item.name}</Text>
          ))}
        </View>

        <Text className="bzp-detail-label">规格</Text>
        <View className="bzp-detail-options">
          {product.specs.map((item) => (
            <Text key={item.id} className={`bzp-detail-chip ${specId === item.id ? 'bzp-detail-chip--active' : ''}`} onClick={() => setSpecId(item.id)}>{item.name}</Text>
          ))}
        </View>

        <View className="bzp-detail-quantity">
          <Text className="bzp-detail-label">数量</Text>
          <View className="bzp-detail-stepper">
            <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
            <Text>{quantity}</Text>
            <Button disabled={quantity >= product.stock} onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}>+</Button>
          </View>
        </View>

        <View className="bzp-detail-note">
          <Text className="bzp-detail-note__title">热乎出笼提醒</Text>
          <Text className="bzp-detail-note__body">门店按预约档期现包鲜蒸，建议在出笼窗口内到店或等待配送，热乎口感更好。</Text>
        </View>
      </View>
      <View className="bzp-detail-bar">
        <Button className="bzp-detail-bar__ghost" onClick={openShopContact}>客服</Button>
        <Button className="bzp-detail-bar__ghost">收藏</Button>
        <Button className="bzp-detail-bar__cart" disabled={soldOut} onClick={addToCart}>加入购物车</Button>
        <Button className="bzp-detail-bar__buy" disabled={soldOut} onClick={buyNow}>立即购买</Button>
      </View>
    </View>
  )
}
