import webpack from 'webpack';

const config = {
  entry: [
    'webpack-hot-middleware/client',
    './lib/components/app.js'
  ],
  mode: 'development',
  output: {
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/, exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  }
};

module.exports = config;
