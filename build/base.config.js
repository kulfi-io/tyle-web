const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const nodeExternals = require('webpack-node-externals');


module.exports = {
    entry: [
      './src/index.ts'
    ],
    node: {
      fs: 'empty',
      net: 'empty'
    },
    // target: 'node',
    // externals: [nodeExternals()],
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                'vue-style-loader',
                'css-loader'
              ],
            },
            {
              test: /\.js$/,
              use: 'babel-loader',
              exclude: /node_modules/

            },
            {
              test: /\.scss$/,
              use: [
                'style-loader',
                'css-loader',
                'sass-loader'
              ],
            },
            {
              test: /\.sass$/,
              use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader?indentedSyntax'
              ],
            },
            {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                loaders: {
                  // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                  // the "scss" and "sass" values for the lang attribute to the right configs here.
                  // other preprocessors should work out of the box, no loader config like this necessary.
                  'scss': [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                  ],
                  'sass': [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                  ]
                },
                esModule: true,
                // other vue-loader options go here
              }
            },
            {
              test: /\.tsx?$/,
              loader: 'ts-loader',
              exclude: /node_modules/,
              options: {
                appendTsSuffixTo: [/\.vue$/],
              }
            },
            {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              exclude: /node_modules/,
              options: {
                name: '[path][name].[ext]?[hash]'
              }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?/,
                loader: 'file-loader',
                options: {
                    limit: 10000,
                    name:'[path][name].[ext]?[hash]'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    plugins: [
      new VueLoaderPlugin()
    ]
}