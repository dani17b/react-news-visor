var path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: [
    './src/index'
  ],
  mode : "production",
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: './'
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "app.css",
      chunkFilename: "app.css"
    }),
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise',
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: [{
        loader: 'babel-loader'
      }],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(png|jpg|gif)$/,
      use: [{
        loader: 'file-loader'
      }]
    },
    {
      test: /(\.scss|\.css)$/,
      use: [
        {
          loader: MiniCssExtractPlugin.loader
        },
        "css-loader",
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: ['theme/_config.scss']
          },
        }
      ]
    },
    {
      test: /\.otf$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 50000,
        },
      },
    },]
  }
};
