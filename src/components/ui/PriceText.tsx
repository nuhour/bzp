import { Text, View } from '@tarojs/components'
import './PriceText.scss'

interface Props {
  value: number
  original?: number
  size?: 'small' | 'normal' | 'large'
}

export function PriceText({ value, original, size = 'normal' }: Props) {
  const showOriginal = typeof original === 'number' && original > value
  return (
    <View className={`bzp-price-text bzp-price-text--${size}`}>
      <Text className="bzp-price-text__symbol">¥</Text>
      <Text className="bzp-price-text__value">{value.toLocaleString()}</Text>
      {showOriginal ? <Text className="bzp-price-text__original">¥{original?.toLocaleString()}</Text> : null}
    </View>
  )
}
