export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/category/index',
    'pages/cart/index',
    'pages/mine/index'
  ],
  subPackages: [
    {
      root: 'pages/product',
      pages: ['detail/index']
    },
    {
      root: 'pages/checkout',
      pages: ['index']
    },
    {
      root: 'pages/order',
      pages: ['list/index', 'detail/index']
    },
    {
      root: 'pages/address',
      pages: ['list/index']
    }
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationStyle: 'custom',
    backgroundColor: '#fbf9f5'
  },
  tabBar: {
    color: '#524534',
    selectedColor: '#835500',
    backgroundColor: '#fbf9f5',
    borderStyle: 'black',
    list: [
      { pagePath: 'pages/home/index', text: '首页' },
      { pagePath: 'pages/category/index', text: '分类' },
      { pagePath: 'pages/cart/index', text: '购物车' },
      { pagePath: 'pages/mine/index', text: '我的' }
    ]
  }
})
