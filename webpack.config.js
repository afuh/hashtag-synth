require('dotenv').config()
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require("path")
const webpack = require('webpack');

module.exports = {
  entry: './src/start.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  devServer: {
    port: 3000
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        WSS_URL: JSON.stringify(process.env.WSS_URL)
      }
    }),
    new HtmlWebpackPlugin({
      title: 'Hashtag synth',
      minify: {
        collapseWhitespace: true
      },
      template: './index.html',
      filename: 'index.html'
    }),
  ]
}
