let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {

    entry: {
        path: path.join(__dirname, 'App/App.jsx'),
        vendor: ['react', 'react-dom', 'react-router', 'superagent', 'moment']
    },


    output: {
        path: path.join(__dirname, 'dist/'),
        filename: 'bundle.js'
    },

    resolve: {
        extensions: ['.js', '.jsx', '.css', '.png', '.jpg'],
    },

    resolveLoader: {
        modules: [path.join(__dirname, 'node_modules')]
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'react'],
                        compact: false
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                use: {loader: 'url-loader?limit=10000'},
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: './App/index.html'
            },
            {
                from: './App/Static/HTML/*.html',
                flatten: true
            },
            {
                from: './App/Manifest/config.json'
            }
        ], {
            copyUnmodified: true
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: "vendor.bundle.js"
        }),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),

        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};