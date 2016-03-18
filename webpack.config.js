const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        './app/main.js'
    ],
    output: {
        path: path.join(__dirname, 'public', 'assets'),
        filename: "bundle.js"
    },
    devtool: '#cheap-module-eval-source-map',
    resolve: { extensions: ['', '.js'] },
    module: {
        loaders: [{ //css
            test: /\.css$/,
            loader: 'style!css'
        }, { //scss
            test: /\.scss$/,
            loader: ['style', 'css', 'postcss', 'sass']
        }, { //babel
            test: /\.js?$/,
            exclude: /(node_modules)/,
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['es2015'],
                cacheDirectory: true,
                plugins: ['transform-runtime']
            }
        }]
    },
    postcss: [ autoprefixer ],
};
