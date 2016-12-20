const sugarss = require('sugarss')
const cssnext = require('postcss-cssnext')
const svg = require('postcss-inline-svg')
const postcssVar = require('postcss-css-variables')
const postcssImport = require('postcss-import')
const sugarml = require('sugarml')
const expressions = require('reshape-expressions')
const content = require('reshape-content')
const include = require('reshape-include')
const layouts = require('reshape-layouts')
const minify = require('reshape-minify')
const es2015 = require('babel-preset-es2015')
const stage2 = require('babel-preset-stage-2')
const webpack = require('webpack')
const process = require('process')
const cssnano = require('cssnano')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const DedupePlugin = webpack.optimize.DedupePlugin
const OccurrenceOrderPlugin = webpack.optimize.OccurrenceOrderPlugin
const OptimizeJsPlugin = require('optimize-js-plugin')
const locals = require('./locals.js')
locals.pretty = false

module.exports = {
  // webpack optimization and minfication plugins
  plugins: [
    new UglifyJsPlugin(),
    new DedupePlugin(),
    new OccurrenceOrderPlugin(),
    new OptimizeJsPlugin({ sourceMap: false })
  ],
  // disable source maps
  devtool: false,
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  entry: {
    'js/main': ['./assets/js/index.js'],
    'js/analytics': ['./assets/js/analytics.js']
  },
  // image optimization
  module: {
    loaders: [{ test: /\.(jpe?g|png|gif|svg)$/i, loader: 'image-webpack' }]
  },
  // adds html minification plugin
  reshape: (ctx) => {
    return {
      filename: webpack.resourcePath,
      addDependencyTo: ctx,
      parser: sugarml,
      webpack: ctx,
      locals: locals,
      plugins: [
        layouts({ root: `${process.env.REPO_DIR || process.env.PWD}/views` }),
        include({
          root: `${process.env.REPO_DIR || process.env.PWD}/views`,
          alias: {
            header: '../node_modules/carrot-admin-header/header.sgr'
          }
        }),
        expressions(),
        content()
      ]
    }
  },
  // adds css minification plugin
  postcss: () => {
    const atImport = postcssImport()
    return {
      plugins: [
        atImport,
        cssnext({ features: { customProperties: false } }),
        postcssVar(),
        svg({ path: `${process.env.REPO_DIR || process.env.PWD}/assets/img/` }),
        cssnano(),
        minify()
      ],
      parser: sugarss
    }
  },
  babel: { presets: [es2015, stage2] },
  ignore: ['**/layout.sgr', '**/_!(headers)', '**/.*', 'views/templates/*.sgr']
}

