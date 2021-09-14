const path = require('path')
const PhpManifestPlugin = require('./webpack-php-manifest')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[contenthash].js'
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
            // options...
          }
        }
      ]
    },
    {
      test: /\.(png|jpg|gif|svg|ico)$/,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'img/',
          name: '[name].[contenthash].[ext]',
          publicPath: '../img',
          useRelativePaths: true
        }
      }]
    }
    ]
  },
  plugins: [
    new PhpManifestPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ]
}