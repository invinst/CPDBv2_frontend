'use strict';
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const srcPath = path.join(__dirname, '/../src');
const context = path.join(__dirname, '../');

module.exports = distFolder => ({
  context: context,
  output: {
    path: path.join(__dirname, '..', distFolder),
    filename: 'bundle-[contenthash].js',
    publicPath: '/'
  },
  mode: 'production',
  entry: `${srcPath}/js/index`,
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, '../src/css'), path.resolve(__dirname, '../src/js'), 'node_modules']
  },
  plugins: [
    new CleanWebpackPlugin([distFolder], { root: context }),
    new webpack.EnvironmentPlugin([
      'CPDB_APP_ENV'
    ]),
    new MiniCssExtractPlugin({
      filename: 'bundle-[contenthash].css',
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        include: [path.join(__dirname, '../src')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
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
