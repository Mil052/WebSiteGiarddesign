const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 2048000,
    maxAssetSize: 2048000,
},
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'docs'),
    clean: true,
  },
  devtool: 'eval',
  devServer: {
    static: './docs',
    watchFiles: ['src/**/*']
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset/inline',
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new CopyPlugin({patterns: [{ from: "src/assets", to: "assets" }]})
  ],
};