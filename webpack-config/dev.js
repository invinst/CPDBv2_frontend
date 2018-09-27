'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');

let config = Object.assign({}, baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '..'),
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 9966,
    publicPath: '/dist/',
    noInfo: false,
    index: 'index.html'
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin([
      'CPDB_APP_ENV'
    ])
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [path.join(__dirname, '/../src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['react-hot-loader/babel'],
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
});

module.exports = config;
