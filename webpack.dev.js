const webpack = require('webpack');
const path = require('path');
const {merge} = require('webpack-merge');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  output: {
    filename: '[name].js',
    chunkFilename: '[id].css'
  },
  devServer: {
    port: process.env.PORT || 3000,
    // TODO: this one is for webpack server v4 when its out of beta
    // static: path.join(__dirname, './public'),
    contentBase: path.join(process.cwd(), './public'),
    watchContentBase: true,
    quiet: false,
    open: true,
    historyApiFallback: {
      rewrites: [{from: /./, to: '404.html'}]
    }
  },
  plugins: [
    new webpack.AutomaticPrefetchPlugin(),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        'public/**/*.js',
        'public/**/*.css',
        'data/webpack.json'
      ]
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
});
