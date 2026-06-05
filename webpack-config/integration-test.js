'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base')('integration-test-build');

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([
      { from: 'src/fonts', to: 'fonts' },
      { from: 'src/img', to: 'img' },
      { from: 'src/static', to: 'static' }
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html.template',
      filename: 'index.html',
      templateParameters: {
        'GA_TRACKING_ID': 'UA-XXXXX-Y',
        'TAG_ID': 'G-G8F567LMXG',
        'INTERCOM_ID': 'gbsby1ik',
        'DISABLE_SEARCH_INDEX': true,
        'CLICKY_TRACKING_ID': '000000000',
      }
    })
  ]
});
