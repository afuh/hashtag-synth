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
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/preset-env' ]
          }
        }
      }
    ]
  },
  devServer: {
    port: 3000,
    clientLogLevel: "error",
    stats: "errors-only"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Hashtag synth',
      minify: {
        collapseWhitespace: true
      },
      template: './index.html',
      filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}
