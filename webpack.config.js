const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = {
    entry: [
        "./app/main.js",
        'webpack-hot-middleware/client',
        'tether',
        'font-awesome-loader',
        'bootstrap-loader',
        './app/scripts/app'
    ],
    output: {
        path: path.join(__dirname, 'public', 'assets'),
        ,
        filename: "bundle.js",
        publicPath: '/assets/',
    },
    devtool: '#cheap-module-eval-source-map',
    resolve: { extensions: ['', '.js'] },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            "window.Tether": "tether"
        }),
    ],
    module: {
        loaders: [{ //css
            test: /\.css$/,
            loader: ['style', 'css', 'postcss']
        }, { //scss
            test: /\.scss$/,
            loader: ['style', 'css', 'postcss', 'sass']
        }, { //icons
            test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url?limit=10000"
        }, { //fonts
            test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
            loader: 'file'
        }, { // bootstrap 3
            test: /bootstrap-sass\/assets\/javascripts\//,
            loader: 'imports?jQuery=jquery'
        }, { //babel
            test: /\.js?$/,
            exclude: /(node_modules|common)/,
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
