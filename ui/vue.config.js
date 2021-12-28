module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = "New World Siege Organizer";
      return args;
    })
  }
}