const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  experiments: {
    asyncWebAssembly: true
  },
  output: {
    path: path.resolve(__dirname, './docs'),
    filename: 'bundle.js',
  },
  devServer: {
    static: path.resolve(__dirname, './docs'),
  },
};
