import { Text, View } from '@tarojs/components'
import './EmptyState.scss'

export function EmptyState({ title, description }: { title: string; description?: string }) {
  return (
    <View className="bzp-empty-state">
      <Text className="bzp-empty-state__icon">◌</Text>
      <Text className="bzp-empty-state__title">{title}</Text>
      {description ? <Text className="bzp-empty-state__desc">{description}</Text> : null}
    </View>
  )
}
