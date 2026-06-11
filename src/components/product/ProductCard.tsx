import Taro from '@tarojs/taro'
import { Button, Image, Text, View } from '@tarojs/components'
import type { BzpProduct } from '@/types'
import { PriceText } from '@/components/ui/PriceText'
import './ProductCard.scss'

interface Props {
  product: BzpProduct
  onAdd?: (productId: string) => void
}

export function ProductCard({ product, onAdd }: Props) {
  const openDetail = () => Taro.navigateTo({ url: `/pages/product/detail/index?id=${product.id}` })
  const soldOut = !product.isActive || product.stock <= 0

  return (
    <View className={`bzp-product-card ${soldOut ? 'bzp-product-card--sold-out' : ''}`} onClick={openDetail}>
      <View className="bzp-product-card__media">
        <Image className="bzp-product-card__image" src={product.cover} mode="aspectFill" />
        {product.tags[0] ? <Text className="bzp-product-card__tag">{product.tags[0]}</Text> : null}
        {soldOut ? <Text className="bzp-product-card__sold-out">售罄</Text> : null}
      </View>
      <View className="bzp-product-card__body">
        <Text className="bzp-product-card__name">{product.name}</Text>
        <Text className="bzp-product-card__subtitle">{product.subtitle}</Text>
        <View className="bzp-product-card__batch-row">
          {product.batchLabel && <Text className="bzp-product-card__batch">{product.batchLabel}</Text>}
          {product.steamTag && <Text className="bzp-product-card__steam">{product.steamTag}</Text>}
        </View>
        {product.serveWindow && <Text className="bzp-product-card__window">{product.serveWindow}</Text>}
        <View className="bzp-product-card__footer">
          <PriceText value={product.price} original={product.originalPrice} size="small" />
          <Button
            className="bzp-product-card__add"
            disabled={soldOut}
            onClick={(event) => {
              event.stopPropagation()
              if (soldOut) return
              onAdd?.(product.id)
            }}
          >
            {soldOut ? '售罄' : '+'}
          </Button>
        </View>
      </View>
    </View>
  )
}
