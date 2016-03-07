module.exports = {

  entry : './index.js',
  output : {
    filename : 'bundle.js'
  },
  devtool : 'source-map',
  module : {
    preLoaders : [
      {test : /\.js$/, exclude: /node_module/, loader: 'jshint-loader'}
    ],
    loaders : [
      {test : /\.css$/, loader: 'style!css!'},
      {test : /\.html$/, loader: 'raw'},
      {test : /\.mp3$/, loader: 'file'}
    ]
  }

}
