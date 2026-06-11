import Taro from '@tarojs/taro'
import { Button, Text, View } from '@tarojs/components'
import type { BzpOrder } from '@/types'
import { PriceText } from '@/components/ui/PriceText'
import { getCardInlineActions, getCardPrimaryActions, type BzpOrderActionId, orderStatusText } from '@/utils/orderActions'
import './OrderCard.scss'

interface Props {
  order: BzpOrder
  onAction?: (actionId: BzpOrderActionId, order: BzpOrder) => void
}

export function OrderCard({ order, onAction }: Props) {
  const primaryActions = getCardPrimaryActions(order)
  const inlineActions = getCardInlineActions(order)
  const actions = [...inlineActions, ...primaryActions]
  const batchTags = order.items
    .flatMap((item) => [
      item.batchLabel || item.product?.batchLabel,
      item.serveWindow || item.product?.serveWindow,
      item.steamTag || item.product?.steamTag
    ])
    .filter((tag): tag is string => Boolean(tag))
  const uniqueBatchTags = Array.from(new Set(batchTags)).slice(0, 3)

  return (
    <View className="order-card" onClick={() => Taro.navigateTo({ url: `/pages/order/detail/index?id=${order.id}` })}>
      <View className="order-card__head">
        <Text>{order.orderNo}</Text>
        <Text className="order-card__status">{orderStatusText[order.status] || order.status}</Text>
      </View>
      <Text className="order-card__slot">
        {order.fulfillmentType === 'pickup' ? '到店自提' : '预约配送'} · {order.appointmentDate} {order.appointmentStartTime}-{order.appointmentEndTime}
      </Text>
      {uniqueBatchTags.length ? (
        <View className="order-card__batch">
          {uniqueBatchTags.map((tag) => <Text key={tag}>{tag}</Text>)}
        </View>
      ) : null}
      <Text className="order-card__items">共 {order.items.reduce((total, item) => total + item.quantity, 0)} 件商品</Text>
      <View className="order-card__foot">
        <PriceText value={order.payableAmount} size="small" />
        {actions.length ? (
          <View className="order-card__actions">
            {actions.map((action) => (
              <Button
                key={action.id}
                className={action.primary ? 'order-card__primary' : 'order-card__ghost'}
                onClick={(event) => {
                  event.stopPropagation()
                  onAction?.(action.id, order)
                }}
              >
                {action.label}
              </Button>
            ))}
          </View>
        ) : null}
      </View>
    </View>
  )
}
