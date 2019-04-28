const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const RESOURCES_DIR = path.resolve(__dirname, 'resources');

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    path.resolve(SRC_DIR, 'index.jsx')
  ],
  output: {
    path: DIST_DIR,
    filename: 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  devServer: {
    hot: true,
    contentBase: SRC_DIR,
    publicPath: 'http://localhost:8080/',
    historyApiFallback: true
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: 'babel-loader'
      }, {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            },
          },
          'css-loader?importLoaders=1&modules=true&localIdentName=[local]&sourceMap=true'
        ],
        exclude: /node_modules/
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            },
          },
          'css-loader?importLoaders=2&modules=true&localIdentName=[local]&sourceMap=true',
          'sass-loader'
        ],
      }, {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true
            },
          },
          'css-loader?importLoaders=1'
        ],
        include: /node_modules/
      }, {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]'
        },
        exclude: /resources/
      }, {
        test: /\.svg$/,
        loader: 'svg-inline-loader',
        include: /resources/
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'resources', 'index.html'),
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ]
};
