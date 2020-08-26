const { override, addWebpackPlugin, addPostcssPlugins, fixBabelImports } = require('customize-cra');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

/* 分析开启 bundle-analyzer */
const IS_ANALYSE = process.argv.includes('--analyse');

/* 分析是不是生产环境，如果是生产环境移除 console */
const IS_ONLINE = process.argv.includes('--online');

module.exports = override(
  fixBabelImports('lodash', {
    libraryDirectory: '',
    camel2DashComponentName: false,
  }),
  // postCSS plugin
  addPostcssPlugins([
    require('postcss-px-to-viewport')({
      unitToConvert: 'px', // 要转化的单位
      viewportWidth: 750, // UI设计稿的宽度
      unitPrecision: 6, // 转换后的精度，即小数点位数
      propList: ['*'], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: ['wrap'], // 指定不转换为视窗单位的类名，
      minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true, // 是否转换后直接更换属性值
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
      landscape: false, // 是否处理横屏情况
    }),
  ]),
  IS_ANALYSE ? addWebpackPlugin(new BundleAnalyzerPlugin()) : undefined,
  config => {
    if (IS_ONLINE) {
      // 上线的时候移除 console
      config.optimization.minimizer[0].options.terserOptions.compress['drop_console'] = true;
    }
    return config;
  },
);
