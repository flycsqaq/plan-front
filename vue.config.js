module.exports = {
  devServer: {
    port: '8888',
    proxy: {
      target: 'http://47.107.147.152:82/',
      changeOrigin: true,
      ws: true
    }
  }
}
