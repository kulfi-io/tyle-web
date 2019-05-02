'use strict'
const path = require('path');

module.exports = {
    dev: {
        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {},

        // Dev Server Settings
        host: '127.0.0.1',
        port: 3003,
        autoOpenBrowser: true,
        errorOverlay: true,
        notifyOnErrors: false,
        poll: false,

        /**
         * Source Maps
         */
        devtool: 'cheap-module-eval-source-map',
        cacheBusting: true,
        cssSourceMap: true
    },
    build: {
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',

        /**
        * Source Maps
        */

        productionSourceMap: true,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtentions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report


    }
}