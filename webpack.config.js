const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: !process.env.CI,
  })
];

module.exports = {
  devtool: 'cheap-module-source-map',
  plugins,
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
    libraryTarget: 'umd',
    libraryExport: 'default'
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
