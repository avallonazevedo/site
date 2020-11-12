// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPartialsPlugin = require('html-webpack-partials-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '',
            },
          },
          'css-loader',
          'resolve-url-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(woff(2)?|ttf|eot|jpg|png|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 9000,
    hot: true,
    compress: true,
  },
  plugins: [
    // new FaviconsWebpackPlugin('./src/static/images/favicon.png'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      title: 'Avallon Azevedo | Developer',
      minify: false,
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin({}),
  ],
};

module.exports = config;
