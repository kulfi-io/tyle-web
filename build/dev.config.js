const path = require('path');
const merge = require('webpack-merge');
const baseConf = require('./base.config');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');


module.exports = merge(baseConf, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        filename: 'tyler.api.bundle.js',
        path: path.resolve(__dirname, 'dist-dev')
    },
    plugins: [
      new cleanWebpackPlugin('dist-dev', {}),
      new miniCssExtractPlugin({
        filename: 'style.[contenthash].css'
      }),
      new htmlWebpackPlugin({
        inject: true,
        hash: true,
        template: './src/index.html',
        filename: 'index.html'
      }),
      new copyWebpackPlugin([
        {
            
          from: path.resolve('./src/assets/img'),
          to: path.resolve(__dirname, 'dist-dev/assets/img'),
          ignore: ['.*']

        }
      ])
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist-dev'),
      compress: true,
      host: 'kulfi',
      port: 3003,
      open: true,
      historyApiFallback: {
        rewrites: [
          {from: /^\/$/, to:'index.html'},
        ]
      }
    }

});