const webpack = require('webpack');
const path = require('path');
const env = require('dotenv').config();

const isProduction = !!process.env.NODE_ENV === 'production';

const plugins = [];

module.exports = {
  bail: true,
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'source-maps' : 'inline-source-map',
  cache: true,
  stats: {
    colors: true,
    errorDetails: true,
    errors: true,
  },
  watchOptions: {
    poll: 1000,
    ignored: /node_modules/,
  },
  entry: ['./src'],
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VERSION': JSON.stringify(process.env.VERSION || 'development'),
      ...Object.entries(env.parsed || {}).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [`process.env.${key}`]: JSON.stringify(value),
        };
      }, {}),
    }),
  ].concat(plugins),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.js'],
    alias: {},
  },
  externals: {},
};
