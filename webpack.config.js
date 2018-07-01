const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const path = require("path")

module.exports = {
  entry: './src/start.js',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: "errors-only",
    open: false,
    overlay: true,
    port: 3000,
    quiet: true,
    clientLogLevel: "error"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Twitter audio',
      minify: {
        collapseWhitespace: true
      },
      template: './index.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin()
  ]
}
