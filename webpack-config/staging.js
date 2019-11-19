'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base')('dist');

let config = Object.assign({}, baseConfig, {
  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([
      { from: 'src/fonts', to: 'fonts' },
      { from: 'src/img', to: 'img' }
    ]),
    new HtmlWebpackPlugin({
      template: 'index.html.template',
      filename: 'index.html',
      templateParameters: {
        'GA_TRACKING_ID': 'UA-63671047-3',
        'INTERCOM_ID': 'gbsby1ik',
        'DISABLE_SEARCH_INDEX': true,
        'CLICKY_TRACKING_ID': '101221747',
      }
    })
  ]
});
module.exports = config;
