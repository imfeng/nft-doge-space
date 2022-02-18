const { resolve, } = require('path');

module.exports = {
  publicPath: process.env.VUE_APP_BASEURL,
  pages: {
    index: {
      entry: 'src/main.ts',
      title: 'NFT',
    },
  },
  chainWebpack: (config) => {
    config.module.rule('pdf')
      .test(/\.pdf$/)
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: '[name].[hash:8].[ext]',
      });
  },
};
