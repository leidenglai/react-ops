var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
        'webpack-hot-middleware/client',
  './src/index.js'
    ],
  output: {
    path: path.join(__dirname, 'webpack-output'),
    filename: 'bundle.js',
    publicPath: '/webpack-output/'
  },
  plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
  module: {
    loaders: [
      { test: /.js$/, loader: 'babel', exclude: /node_modules/, include: __dirname },
      { test: /\.css$/, loaders: ["style", "css"] },
      // LESS
      { test: /\.less$/, loader: 'style!css!less' },
      {
        test: /\.(png|jpg)$/,
        loaders: ['file?name=[name]-[hash].[ext]', 'image-webpack?{progressive:true, optimizationLevel: 1, interlaced: false, pngquant:{quality: "65-90", speed: 4}}']
      }
    ]
  },
  resolve: {
    alias: {
      actions: path.join(__dirname, "src/actions"),
      components: path.join(__dirname, "src/components"),
      constants: path.join(__dirname, "src/constants"),
      containers: path.join(__dirname, "src/containers"),
      middleware: path.join(__dirname, "src/middleware"),
      actions: path.join(__dirname, "src/actions"),
      reducers: path.join(__dirname, "src/reducers"),
      static: path.join(__dirname, "src/static")
    }
  }
};