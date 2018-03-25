const path = require('path');

module.exports = {
  devtool: 'cheap-module-source-map',
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
    path: path.resolve(__dirname, 'dist'),
    filename: 'leaflet-nectarivore.js',
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
