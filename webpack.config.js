module.exports = {

  entry : './index.js',
  output : {
    filename : 'bundle.js'
  },
  devtool : 'source-map',
  module : {
    loaders : [
      {
        test : /\.js$/,
        exclude : /(node_module|bower_components)/,
        loader : 'babel-loader',
        query : {
          presets: ['react', 'es2015'],
          plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy']
        }
      },
      {test : /\.css$/, loader: 'style!css!'},
      {test : /\.html$/, loader: 'raw'},
      {test : /\.mp3$/, loader: 'file'}
    ]
  }

}
