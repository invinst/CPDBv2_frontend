'use strict';

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const utils = require('./utils');
const baseConfig = require('./base')('dist');

let config = Object.assign({}, baseConfig, {
  output: Object.assign({}, baseConfig.output, {
    publicPath: utils.staticFileBase()
  }),
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
        'GA_TRACKING_ID': 'UA-63671047-3',
        'INTERCOM_ID': 'gbsby1ik'
      }
    })
  ]
});
module.exports = config;
