const path = require('path');
const IS_PROD = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: !IS_PROD && 'cheap-module-source-map',
  externals: [{
    leaflet: {
      commonjs: 'leaflet',
      commonjs2: 'leaflet',
      root: 'L',
    }
  }],
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },
  resolve: {
    modules: [
      process.env.NODE_PATH,
      'node_modules',
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
