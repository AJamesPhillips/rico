module.exports = {
  entry: './src/app.jsx',
  output: {
    filename: 'dist/bundle.js'
  },
  resolve: {
    extensions: ['.ts', 'tsx', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.js(x)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ["es2015", "react"],
          plugins: ["transform-object-rest-spread", "transform-flow-strip-types"]
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      }
    ]
  }
}
