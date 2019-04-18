const path = require('path');
const merge = require('webpack-merge');
const baseConf = require('./base.config');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');


module.exports = merge(baseConf, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: 'tyler.api.bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new cleanWebpackPlugin('dist', {}),
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
            
          from: path.resolve('./src/assets'),
          to: path.resolve(__dirname, 'dist/assets'),
          ignore: ['.*']

        }
      ])
    ]
});
