const path = require('path')
const HardSourcePlugin = require('hard-source-webpack-plugin')
const sugarss = require('sugarss')
const cssnext = require('postcss-cssnext')
const svg = require('postcss-inline-svg')
const postcssVar = require('postcss-css-variables')
const postcssImport = require('postcss-import')
const webpack = require('webpack')
const sugarml = require('sugarml')
const expressions = require('reshape-expressions')
const content = require('reshape-content')
const include = require('reshape-include')
const layouts = require('reshape-layouts')
const beautify = require('reshape-beautify')
const es2015 = require('babel-preset-es2015')
const stage2 = require('babel-preset-stage-2')
const process = require('process')
let locals = require('./locals.js')

module.exports = {
  devtool: 'source-map',
  matchers: {
    html: '*(**/)*.sgr',
    css: '*(**/)*.sss'
  },
  entry: {
    'js/main': ['./assets/js/index.js'],
    'js/analytics': ['./assets/js/analytics.js']
  },
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
        content(),
        beautify()
      ]
    }
  },
  postcss: () => {
    const atImport = postcssImport()
    return {
      plugins: [
        atImport,
        cssnext({ features: { customProperties: false } }),
        svg({ path: `${process.env.REPO_DIR || process.env.PWD}/assets/img/` }),
        postcssVar()
      ],
      parser: sugarss
    }
  },
  babel: { presets: [es2015, stage2] },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'views/templates/*.sgr'],
  plugins: [
    new HardSourcePlugin({
      environmentPaths: { root: __dirname },
      recordsPath: path.join(__dirname, '_cache/records.json'),
      cacheDirectory: path.join(__dirname, '_cache/hard_source_cache')
    })
  ]
}
