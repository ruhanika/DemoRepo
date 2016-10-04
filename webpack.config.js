var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './index.js'
    
  ],
  debug: true,
  output: {
    path: path.join(__dirname, 'assets'),
    //publicPath: path.join(__dirname, 'assets'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      inject: 'body'
    }),
    
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query:
        {
          presets:['es2015']
        }
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  node: {
    "fs": "empty",
    "net": "empty",
    "tls": "empty",
    "console": true
  }
};
