const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { ExtractSourceMapPlugin } = require('./extract-source-map-plugin')

module.exports = {
  mode: 'production',
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'output'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env']
          ]
        }
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  },
  devtool: 'source-map',
  plugins: [
    new ExtractSourceMapPlugin()
  ]
}
