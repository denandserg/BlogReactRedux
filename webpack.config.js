const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
const HtmlWebpackPlugin = require("html-webpack-plugin");

let config = {
    entry: ['babel-polyfill', './src/index.jsx'],
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true,
        contentBase: path.resolve(__dirname, './dist'),
        historyApiFallback: true,

    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                resolve: {
                    extensions: ['.js', '.jsx'],
                },
                loader: 'babel-loader',
                exclude: '/node-modules/'
            },
            {
                test: /\.css$/,
                use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
            },
            {
                test: /\.less$/i,
                use: extractLESS.extract([ 'css-loader', 'less-loader' ])
            },
        ]
    },
    plugins: [
        extractCSS,
        extractLESS,
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]

};

module.exports = (env, options) => {
    let production = options.mode === 'production';
    config.devtool = production ? false : 'eval-sourcemap';
    return config;
};