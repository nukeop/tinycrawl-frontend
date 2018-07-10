const webpack = require('webpack');
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
        loader: 'style-loader!css-loader?modules=true&localIdentName=[local]',
        exclude: RESOURCES_DIR
      }, {
        test: /\.css/,
        loader: 'style-loader!css-loader',
        include: RESOURCES_DIR
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?importLoaders=2&modules=true&localIdentName=[local]!sass-loader'
      }, {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        loader: 'url-loader'
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        include: RESOURCES_DIR
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'resources', 'index.html'),
      inject: true
    })
  ]
};
