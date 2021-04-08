//eslint-disable-next-line
const path = require('path')//引入一个path模块

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/QinXiu-J-website/'
    : '/',
  lintOnSave: false,
  //eslint-disable-next-line
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons')

    config.module//config是vue把webpack的api封装了暴露给我们的一个对象
      .rule('svg-sprite')
      .test(/\.svg$/)// 如果文件匹配到正则,以.svg结尾的
      .include.add(dir).end()//只包含icons目录，其他不走.svg规则
      .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()//不解析成文件
      .use('svgo-loader').loader('svgo-loader')
      .tap(options => ({...options, plugins: [{removeAttrs: {attrs: 'fill'}}]})).end()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir)//其他 svg loader 排除 icons目录
  }
}
