'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const baseConfig = require('./base')('dist');

const config = Object.assign({}, baseConfig, {
  mode: 'development',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
    contentBase: path.join(__dirname, '..'),
    historyApiFallback: true,
    hot: true,
    port: 9966,
    publicPath: '/',
    noInfo: false,
    index: 'index.html'
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    ...baseConfig.plugins,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html.template',
      filename: 'index.html',
      templateParameters: {
        'GA_TRACKING_ID': 'UA-XXXXX-Y',
        'INTERCOM_ID': 'gbsby1ik'
      }
    })
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
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  }
});

module.exports = config;
