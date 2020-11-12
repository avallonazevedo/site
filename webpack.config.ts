import * as path from 'path';
import * as webpack from 'webpack';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = 'clean-webpack-plugin';
const HtmlWebpackPartialsPlugin = 'html-webpack-partials-plugin';
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const config: webpack.Configuration = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.bundle.js',
    publicPath: '',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'babel-loader',
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
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    // new FaviconsWebpackPlugin('./src/static/images/favicon.png'),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public/index.html'),
      title: 'Avallon Azevedo | Developer',
      minify: false,
    }),
    new MiniCssExtractPlugin(),
    // new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin({}),
  ],
};

module.exports = config;
