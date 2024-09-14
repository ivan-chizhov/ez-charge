const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const registerAPIs = require('./api')

module.exports = {
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './tpl/index.html',
    }),
  ],
  devServer: {
    port: 3000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    allowedHosts: 'all',
    compress: true,
    historyApiFallback: true,
    client: {
      webSocketTransport: 'ws',
    },
    webSocketServer: require.resolve('./WebSocketServer'),
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }

      registerAPIs(devServer.app)

      devServer.app.get('/api/login', (_, response) => {
        response.send('setup-middlewares option GET')
      })

      return middlewares
    },
  },
}
