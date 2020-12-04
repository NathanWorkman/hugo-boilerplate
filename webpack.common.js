const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: {
    main: path.join(__dirname, 'src', 'index.js')
  },
  output: {
    path: path.join(__dirname, 'public')
  },
  module: {
    rules: [
      {
        test: /\.((png)|(eot)|(woff)|(woff2)|(ttf)|(svg)|(gif))(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=/[chunkhash].[ext]'
      },
      {test: /\.json$/, use: 'json-loader'},
      {
        use: 'babel-loader',
        test: /\.js?$/,
        exclude: /node_modules/
      },
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new AssetsPlugin({
      filename: 'webpack.json',
      path: path.join(process.cwd(), 'data'),
      publicPath: '/data/',
      prettyPrint: true,
      removeFullPathAutoPrefix: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './src/fonts/',
          to: 'fonts/',
          flatten: true
        },
        {
          from: './src/videos/',
          to: 'videos/',
          flatten: true
        }
      ]
    })
  ]
};
