'use strict';
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const _ = require('lodash');

const PuppeteerMochaPlugin = require('./puppeteer-mocha-plugin');
const baseConfig = require('./base')('dist');

const config = Object.assign(
  _.pick(baseConfig, ['context', 'resolve']),
  {
    entry: './test/loadtests.js',
    output: {
      path: path.join(__dirname, '../dist'),
      filename: 'test-bundle.js',
    },
    devtool: 'cheap-module-source-map',
    devServer: {
      contentBase: path.join(__dirname, '..'),
      historyApiFallback: true,
      port: 9977,
      publicPath: '/',
      noInfo: false,
      index: 'test.html',
      stats: 'errors-only'
    },
    mode: 'development',
    module: {
      exprContextCritical: false,
      rules: [
        {
          test: /\.js$/,
          include: [
            path.join(__dirname, '../src'),
            path.join(__dirname, '../test')
          ],
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0'],
              plugins: ['istanbul']
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
          test: /\.sass$/,
          use: [
            MiniCssExtractPlugin.loader,
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
    },
    node: {
      fs: 'empty'
    },
    watch: false,
    plugins: [
      new webpack.EnvironmentPlugin([
        'CPDB_APP_ENV'
      ]),
      new MiniCssExtractPlugin({
        filename: 'test-bundle-[contenthash].css',
      }),
      new HtmlWebpackPlugin({
        template: 'test.html.template',
        filename: 'test.html',
      }),
      new webpack.IgnorePlugin(/vertx/),
      new PuppeteerMochaPlugin()
    ],
    externals: {
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react',
      'react/addons': 'react'
    }
  }
);

module.exports = config;
