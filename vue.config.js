const path = require('path')
const title = 'To Do List' // TODO: get this variable from setting.ts

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    },
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/quasar.variables.scss'),
      ]
    }
  },
  transpileDependencies: [
    'quasar'
  ],
  lintOnSave: false,
  productionSourceMap: process.env.NODE_ENV === 'development',
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'development' ? 'eval-source-map' : undefined,
  },
  chainWebpack(config) {
    // provide the app's title in html-webpack-plugin's options list so that
    // it can be accessed in index.html to inject the correct title.
    // https://cli.vuejs.org/guide/webpack.html#modifying-options-of-a-plugin
    config.plugin('html').tap(args => {
      args[0].title = title
      return args
    })

    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // https://webpack.js.org/configuration/devtool/#development
    // Change development env source map if you want.
    // The default in vue-cli is 'eval-cheap-module-source-map'.
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('eval-cheap-source-map')
      )

    config
    .when(process.env.NODE_ENV !== 'development',
      config => {
        config
        .optimization.splitChunks({
          chunks: 'all',
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial' // only package third parties that are initially dependent
            },
            commons: {
              name: 'chunk-commons',
              test: path.resolve(__dirname, 'src/components'),
              minChunks: 3, //  minimum common number
              priority: 5,
              reuseExistingChunk: true
            }
          }
        })
        // https://webpack.js.org/configuration/optimization/#optimizationruntimechunk
        config.optimization.runtimeChunk('single')
      }
    )

    config.module
    .rule('svg')
    .exclude.add(path.resolve(__dirname, 'src/assets/icons'))
    .end()

    //再添加svg-sprite-loader处理该文件夹
    config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(path.resolve(__dirname, 'src/assets/icons'))
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
  },
  css: {
    sourceMap: process.env.NODE_ENV === 'development'
  }
}
