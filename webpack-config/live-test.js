'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base')('live-test-build');

module.exports = Object.assign({}, baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
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
        'GA_TRACKING_ID': 'UA-XXXXX-Y',
        'INTERCOM_ID': 'gbsby1ik'
      }
    })
  ]
});
