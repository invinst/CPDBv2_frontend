'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
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
    hotOnly: true,
    port: 9966,
  },
  cache: true,
  devtool: 'cheap-module-source-map',
  plugins: [
    ...baseConfig.plugins,
    new CopyWebpackPlugin([
      { from: 'src/fonts', to: 'fonts' },
      { from: 'src/img', to: 'img' },
      { from: 'src/static', to: 'static' }
    ]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.(js)$/,
        include: [
          path.join(__dirname, '/../node_modules/swiper'),
          path.join(__dirname, '/../node_modules/dom7')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-transform-exponentiation-operator'],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false } }
        ]
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: false,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              camelCase: true,
            }
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, '/../src/css')]
            }
          }
        ]
      }
    ]
  }
});

module.exports = config;
