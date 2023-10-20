'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base')('dist');

let config = Object.assign({}, baseConfig, {
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
        'GA_TRACKING_ID': 'UA-63671047-2',
        'TAG_ID': 'G-G8F567LMXG',
        'INTERCOM_ID': 'p51vy1rb',
        'DISABLE_SEARCH_INDEX': false,
        'CLICKY_TRACKING_ID': '101220048',
      }
    })
  ]
});
module.exports = config;
