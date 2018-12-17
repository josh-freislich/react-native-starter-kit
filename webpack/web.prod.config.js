const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtReactWebpackPlugin = require('@sencha/ext-react-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        path.join(__dirname, '../src/web/index'),
    ],
    output: {
        path: path.join(__dirname, '../build/'),
        filename: 'bundle.js',
        publicPath: '/',
    },
    module: {
        rules: [
            // Take all sass files, compile them, and bundle them in with our js bundle
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'sass-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader',
                ],
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'build/index.html',
            hash: true,
        }),
        new ExtReactWebpackPlugin({
            port: 3001,
            framework: 'react',
        }),
        new webpack.DefinePlugin({
            'process.env': {
                // Useful to reduce the size of client-side libraries, e.g. react
                NODE_ENV: JSON.stringify('production'),
                PLATFORM_ENV: JSON.stringify('web'),
            },
        }),
        // optimizations
        new webpack.optimize.OccurrenceOrderPlugin(),
    ],
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: true,
                    ecma: 6,
                    output: {
                        comments: false,
                    },
                    compress: {
                        warnings: false,
                        dead_code: true,
                        drop_console: true,
                    },
                },
                sourceMap: false,
            }),
        ],
    },
};