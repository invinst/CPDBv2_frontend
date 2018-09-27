'use strict';
let path = require('path');
let webpack = require('webpack');

const srcPath = path.join(__dirname, '/../src');

module.exports = {
  context: path.join(__dirname, '../'),
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'bundle.js',
    publicPath: './dist/'
  },
  mode: 'production',
  entry: [
    './src/js/index'
  ],
  resolve: {
    extensions: ['.js'],
    alias: {
      actions: `${srcPath}/js/actions/`,
      components: `${srcPath}/js/components/`,
      config: `${srcPath}/js/config`,
      containers: `${srcPath}/js/containers/`,
      middleware: `${srcPath}/js/middleware/`,
      'mock-api': `${srcPath}/js/mock-api/`,
      polyfill: `${srcPath}/js/polyfill/`,
      reducers: `${srcPath}/js/reducers/`,
      selectors: `${srcPath}/js/selectors/`,
      store: `${srcPath}/js/store/`,
      utils: `${srcPath}/js/utils/`,
      decorators: `${srcPath}/js/decorators.js`
    }
  },
  plugins: [
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
            presets: ['es2015', 'react']
          }
        }
      }
    ]
  }
};
