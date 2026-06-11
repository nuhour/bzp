import { Text, View } from '@tarojs/components'
import type { BzpFulfillmentSlot } from '@/types'
import './SlotPicker.scss'

interface Props {
  slots: BzpFulfillmentSlot[]
  selectedId?: string
  onSelect: (slotId: string) => void
}

export function SlotPicker({ slots, selectedId, onSelect }: Props) {
  return (
    <View className="bzp-slot-picker">
      {slots.map((slot) => (
        <View
          key={slot.id}
          className={`bzp-slot-picker__item ${selectedId === slot.id ? 'bzp-slot-picker__item--active' : ''}`}
          onClick={() => onSelect(slot.id)}
        >
          <Text className="bzp-slot-picker__time">{slot.startTime}-{slot.endTime}</Text>
          <Text className="bzp-slot-picker__capacity">余 {slot.availableCapacity}</Text>
        </View>
      ))}
    </View>
  )
}
