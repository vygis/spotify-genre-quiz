import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  mode: 'development',
  devtool: 'source-map',
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] },
      { test: /(\.css)$/, loaders: ['style-loader', 'css-loader?sourceMap'] },
      { test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/, loader: 'file-loader?name=[name].[ext]' }
    ]
  }
};