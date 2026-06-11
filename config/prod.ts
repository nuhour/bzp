export default {
  defineConstants: {
    'process.env.TARO_APP_BZP_API_BASE_URL': JSON.stringify('https://hok.bottlefallflat.com/api')
  },
  mini: {
    optimizeMainPackage: {
      enable: true
    }
  },
  h5: {}
}
