const path = require('path')
module.exports = {
   // eslint-disable-next-line no-undef
   mode: process.env.NODE_ENV,
   entry: "./client/index.js",
   output: {
       // eslint-disable-next-line no-undef
       path: path.resolve(__dirname,"build"),
       filename: "bundle.js",
   },   
   devServer: {
     
    // eslint-disable-next-line no-undef
    publicPath: path.resolve(__dirname,"/build"),
    proxy: {
        '/api': 'http://localhost:3000'
    }
   },
   module: {
       rules: [
         {
           test: /\.jsx?/,
           exclude: /(node_modules|bower_components)/,
           use: {
             loader: 'babel-loader',
             options: {
               presets: [require('@babel/preset-env'), require('@babel/preset-react')]
             }
           }
         },
         {
             test: /\.scss$/,
             use:  ['style-loader', 'css-loader', 'sass-loader']
         }
       ]
     }
}