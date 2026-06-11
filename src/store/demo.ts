import type { BzpCategory, BzpFulfillmentSlot, BzpHomePayload, BzpProduct, BzpStore } from '@/types'

const cover = (seed: string) => `https://picsum.photos/seed/bzp-${seed}/640/480`

export const bzpDemoCategories = [
  { id: 'meat', name: '鲜肉包' },
  { id: 'veg', name: '素菜包' },
  { id: 'sweet', name: '甜口包' },
  { id: 'drink', name: '粥饮豆浆' },
  { id: 'side', name: '小菜卤味' },
  { id: 'set', name: '早餐套餐' },
]

export const demoCategories: BzpCategory[] = bzpDemoCategories.map((item, index) => ({
  ...item,
  sort: index + 1,
  isActive: true
}))

export const demoProducts: BzpProduct[] = [
  {
    id: 'bzp-meat-001',
    categoryId: 'meat',
    categoryName: '鲜肉包',
    name: '招牌鲜肉大包',
    subtitle: '三七肥瘦肉馅，清晨现包鲜蒸',
    description: '肉汁丰盈，适合早餐热乎档到店即取。',
    price: 4.8,
    originalPrice: 5.8,
    stock: 180,
    sales: 526,
    points: 5,
    cover: cover('meat-bao'),
    media: [{ type: 'image', url: cover('meat-bao') }],
    detailImages: [cover('meat-bao-detail')],
    tags: ['热卖', '早餐首选'],
    flavors: [{ id: 'classic', name: '经典鲜肉' }, { id: 'pepper', name: '胡椒鲜肉' }],
    specs: [{ id: 'single', name: '单个' }, { id: 'pack6', name: '6个装', priceDelta: 23 }],
    batchLabel: '明早热乎档',
    serveWindow: '07:00-09:00 出笼',
    steamTag: '现包鲜蒸',
    ingredients: '小麦粉、猪肉、葱姜、酱油、芝麻油',
    nutrition: [{ label: '热量', value: '245kcal' }, { label: '蛋白质', value: '10g' }],
    isActive: true,
    isRecommended: true,
    isNew: false
  },
  {
    id: 'bzp-veg-001',
    categoryId: 'veg',
    categoryName: '素菜包',
    name: '香菇青菜包',
    subtitle: '青菜脆嫩，香菇提鲜',
    description: '素馅清爽，蒸笼出锅后香气更足。',
    price: 3.8,
    originalPrice: 0,
    stock: 150,
    sales: 318,
    points: 4,
    cover: cover('veg-bao'),
    media: [{ type: 'image', url: cover('veg-bao') }],
    detailImages: [cover('veg-bao-detail')],
    tags: ['清爽', '素食'],
    flavors: [{ id: 'mushroom', name: '香菇青菜' }, { id: 'cabbage', name: '粉丝包菜' }],
    specs: [{ id: 'single', name: '单个' }, { id: 'pack6', name: '6个装', priceDelta: 18 }],
    batchLabel: '明早热乎档',
    serveWindow: '07:00-09:00 出笼',
    steamTag: '清爽素馅',
    ingredients: '小麦粉、青菜、香菇、粉丝、芝麻油',
    nutrition: [{ label: '热量', value: '188kcal' }, { label: '膳食纤维', value: '3g' }],
    isActive: true,
    isRecommended: true,
    isNew: false
  },
  {
    id: 'bzp-sweet-001',
    categoryId: 'sweet',
    categoryName: '甜口包',
    name: '豆沙小圆包',
    subtitle: '细腻豆沙，甜而不腻',
    description: '小朋友也喜欢的软糯甜口包。',
    price: 3.5,
    originalPrice: 4,
    stock: 120,
    sales: 236,
    points: 4,
    cover: cover('sweet-bao'),
    media: [{ type: 'image', url: cover('sweet-bao') }],
    detailImages: [cover('sweet-bao-detail')],
    tags: ['甜口', '新品'],
    flavors: [{ id: 'red-bean', name: '红豆沙' }, { id: 'black-sesame', name: '黑芝麻' }],
    specs: [{ id: 'single', name: '单个' }, { id: 'pack8', name: '8个装', priceDelta: 24 }],
    batchLabel: '午间蒸笼档',
    serveWindow: '11:00-13:00 出笼',
    steamTag: '甜香软糯',
    ingredients: '小麦粉、红豆、白砂糖、芝麻',
    nutrition: [{ label: '热量', value: '218kcal' }, { label: '碳水', value: '38g' }],
    isActive: true,
    isRecommended: false,
    isNew: true
  },
  {
    id: 'bzp-drink-001',
    categoryId: 'drink',
    categoryName: '粥饮豆浆',
    name: '原味现磨豆浆',
    subtitle: '黄豆现磨，温热装杯',
    description: '搭配鲜肉包或素菜包更顺口。',
    price: 5,
    originalPrice: 0,
    stock: 100,
    sales: 288,
    points: 5,
    cover: cover('soy-milk'),
    media: [{ type: 'image', url: cover('soy-milk') }],
    detailImages: [cover('soy-milk-detail')],
    tags: ['热饮', '早餐搭配'],
    flavors: [{ id: 'plain', name: '原味' }, { id: 'less-sugar', name: '少糖' }],
    specs: [{ id: 'cup', name: '单杯' }, { id: 'family', name: '家庭壶', priceDelta: 16 }],
    batchLabel: '清晨热饮档',
    serveWindow: '06:30-10:00 供应',
    steamTag: '温热现磨',
    ingredients: '黄豆、饮用水、少量白砂糖',
    nutrition: [{ label: '热量', value: '96kcal' }, { label: '蛋白质', value: '6g' }],
    isActive: true,
    isRecommended: true,
    isNew: false
  },
  {
    id: 'bzp-side-001',
    categoryId: 'side',
    categoryName: '小菜卤味',
    name: '爽口萝卜小菜',
    subtitle: '酸甜脆口，解腻开胃',
    description: '早餐档常备小菜，适合搭配包子和粥。',
    price: 4.5,
    originalPrice: 0,
    stock: 90,
    sales: 142,
    points: 5,
    cover: cover('pickled-radish'),
    media: [{ type: 'image', url: cover('pickled-radish') }],
    detailImages: [cover('pickled-radish-detail')],
    tags: ['开胃', '小份'],
    flavors: [{ id: 'classic', name: '酸甜' }, { id: 'spicy', name: '微辣' }],
    specs: [{ id: 'small', name: '小份' }, { id: 'large', name: '大份', priceDelta: 4 }],
    batchLabel: '早餐配菜档',
    serveWindow: '07:00-10:30 供应',
    steamTag: '爽脆开胃',
    ingredients: '白萝卜、米醋、糖、辣椒',
    nutrition: [{ label: '热量', value: '62kcal' }, { label: '钠', value: '320mg' }],
    isActive: true,
    isRecommended: false,
    isNew: false
  },
  {
    id: 'bzp-set-001',
    categoryId: 'set',
    categoryName: '早餐套餐',
    name: '热乎双人早餐',
    subtitle: '鲜肉包、素菜包、豆浆、小菜一次配齐',
    description: '双人早餐组合，适合提前预约明早自提。',
    price: 29.9,
    originalPrice: 36,
    stock: 60,
    sales: 176,
    points: 30,
    cover: cover('breakfast-set'),
    media: [{ type: 'image', url: cover('breakfast-set') }],
    detailImages: [cover('breakfast-set-detail')],
    tags: ['套餐', '划算'],
    flavors: [{ id: 'classic', name: '经典搭配' }],
    specs: [{ id: 'set', name: '双人份' }, { id: 'family', name: '家庭份', priceDelta: 26 }],
    batchLabel: '明早热乎档',
    serveWindow: '07:00-09:00 出笼',
    steamTag: '一袋拎走',
    ingredients: '鲜肉包、素菜包、豆浆、萝卜小菜',
    nutrition: [{ label: '热量', value: '680kcal' }, { label: '蛋白质', value: '28g' }],
    isActive: true,
    isRecommended: true,
    isNew: true
  }
]

export const demoStores: BzpStore[] = [
  {
    id: 'store-main',
    name: '包子铺总店',
    address: '西安市碑林区蒸笼巷 18 号',
    phone: '029-88886666',
    businessHours: '06:30-20:00',
    isPickupEnabled: true
  }
]

export const demoSlots: BzpFulfillmentSlot[] = [
  { id: 'pickup-breakfast-1', date: '2026-06-12', startTime: '07:00', endTime: '08:00', batchLabel: '明早热乎档', fulfillmentType: 'pickup', storeId: 'store-main', capacity: 80, reservedCapacity: 18, availableCapacity: 62, isActive: true },
  { id: 'pickup-breakfast-2', date: '2026-06-12', startTime: '08:00', endTime: '09:00', batchLabel: '明早热乎档', fulfillmentType: 'pickup', storeId: 'store-main', capacity: 80, reservedCapacity: 31, availableCapacity: 49, isActive: true },
  { id: 'delivery-breakfast-1', date: '2026-06-12', startTime: '07:30', endTime: '09:00', batchLabel: '早餐配送档', fulfillmentType: 'delivery', capacity: 45, reservedCapacity: 16, availableCapacity: 29, isActive: true },
  { id: 'pickup-noon-1', date: '2026-06-12', startTime: '11:00', endTime: '13:00', batchLabel: '午间蒸笼档', fulfillmentType: 'pickup', storeId: 'store-main', capacity: 60, reservedCapacity: 14, availableCapacity: 46, isActive: true }
]

export const demoHome: BzpHomePayload = {
  categories: demoCategories,
  products: demoProducts,
  banners: [
    {
      id: 'banner-fresh',
      title: '明早热乎档',
      subtitle: '07:00-09:00 出笼，现包鲜蒸，预约到店即取',
      image: cover('banner-breakfast'),
      linkUrl: '/pages/category/index',
      sort: 1,
      isActive: true
    }
  ],
  recommendedProducts: demoProducts.filter((item) => item.isRecommended),
  newProducts: demoProducts.filter((item) => item.isNew)
}
