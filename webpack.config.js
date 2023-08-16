const path = require('path');

module.exports = {
  mode: 'production',
  performance: {
    hints: 'warning',
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
},
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'build'),
    clean: true,
  },
  devtool: 'eval-source-map',
  devServer: {
    static: './build',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        type: 'asset/inline'
      }
    ],
  },
};