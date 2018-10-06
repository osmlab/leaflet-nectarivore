const path = require('path');
const nodeExternals = require('webpack-node-externals');
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
  externals: [nodeExternals()],
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
