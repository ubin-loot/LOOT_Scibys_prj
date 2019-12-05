const webpack = require('webpack');
import path from 'path';

module.exports = {
  entry: [
    'react-hot-loader/patch',
    './src/index.js',
    './src/style.css',
    './src/homeStyle.css'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
    modules: [path.resolve(__dirname, "src"), "node_modules"]
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true

  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]

};