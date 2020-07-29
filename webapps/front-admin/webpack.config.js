const webpack = require('webpack');
const path = require('path');
const { createVariants } = require('parallel-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const env = require('dotenv').config();
const pkg = require('./package.json');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production';
const version = process.env.VERSION || 'app-dev';

const basePath = pkg.name;

const variants = {
  isServer: [true, false],
};

function createConfig(options) {
  const CDN = process.env.CDN ? `${process.env.CDN}/` : '/public/';

  let plugins = [
    new webpack.LoaderOptionsPlugin({
      minimize: isProduction,
      debug: false,
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: options.isServer ? 1 : 15 }),
    new webpack.DefinePlugin({
      'process.env.VERSION': JSON.stringify(version),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'process.env.APP_NAME': JSON.stringify(pkg.name),
      'process.env.ASSETS_PATH': JSON.stringify(`${CDN}${basePath}/${version}`),
      ...Object.entries(env.parsed || {}).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [`process.env.${key}`]: JSON.stringify(value),
        };
      }, {}),
    }),
  ];

  if (options.isServer) {
    plugins = plugins.concat([]);
  } else {
    plugins = plugins.concat([
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: `${basePath}/${version}/stylesheets/[name].css`,
      }),
    ]);
  }

  return Object.assign(
    options.isServer
      ? {
          context: __dirname,
          node: {
            __filename: false,
            __dirname: false,
          },
          target: 'node',
        }
      : {},
    {
      devtool: isProduction ? 'source-maps' : 'inline-source-map',
      stats: {
        all: false,
        entrypoints: true,
        timings: true,
        warnings: false,
      },
      entry: {
        index: options.isServer ? ['./src/server/index.js'] : ['./src/client/index.js'],
      },
      mode: isProduction ? 'production' : 'development',
      watchOptions: {
        poll: 250,
        ignored: [/node_modules/],
      },
      output: options.isServer
        ? {
            path: path.join(__dirname, 'dist/server'),
            filename: '[name].js',
          }
        : {
            path: path.join(__dirname, 'dist/public/'),
            publicPath: CDN,
            filename: `${basePath}/${version}/javascripts/[name].bundle.js`,
            // chunkFilename: `${basePath}/${version}/javascripts/[name].bundle.js`,
            sourceMapFilename: '[file].map',
          },
      plugins,
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.s?[ca]ss$/,
            use: options.isServer
              ? 'null-loader'
              : [
                  {
                    loader: MiniCssExtractPlugin.loader,
                  },
                  'css-loader',
                  {
                    loader: 'sass-loader',
                    options: {
                      sourceMap: true,
                      implementation: require('sass'),
                    },
                  },
                ],
          },
          {
            test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader',
            options: {
              emitFile: !options.isServer,
              name: `${basePath}/fonts/[hash].[ext]`,
            },
          },
          {
            test: /\.svg$/,
            loader: 'svg-url-loader',
          },
          {
            test: /\.(jpg|png|gif|webp)$/,
            loader: 'file-loader',
            options: {
              emitFile: !options.isServer,
              name: `${basePath}/images/[hash].[ext]`,
            },
          },
        ],
      },
      optimization: {
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // vendors: false,
            commons: false,
            styles: {
              name: 'styles',
              test: /\.s?[c|a]ss$/,
              chunks: 'all',
              enforce: true,
              priority: 100,
            },
          },
        },
        minimize: isProduction,
        minimizer: [
          // This is only used in production mode
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                comparisons: false,
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            parallel: true,
            cache: true,
            sourceMap: isProduction,
          }),
          // This is only used in production mode
          new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
              // parser: safePostCssParser,
              map: {
                inline: false,
                annotation: true,
              },
            },
          }),
        ],
      },
      resolve: {
        modules: ['node_modules', options.isServer ? 'src/server' : 'src/client', 'src/shared'],
        extensions: ['.js'],
        alias: {
          '_variables.sass': path.resolve(__dirname, 'src/shared/variables.scss'),
        },
      },
      externals: {},
    },
  );
}

module.exports = createVariants({}, variants, createConfig);
