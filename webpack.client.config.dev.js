const path              = require('path');
const UglifyJsPlugin    = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.client.config.base').config;
const cssLoaders = require('./webpack.client.config.base').cssLoaders;

module.exports = merge(baseConfig,{
    watch: true,
    // the devtool enable us to see the original file when we debug a line and not the bundle.js
    devtool: 'cheap-module-eval-source-map',

    module: {
        loaders: [ ...baseConfig.module.loaders,
            {
                test: /\.(css|less)$/,                
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [...cssLoaders, 'less-loader']
                })
            }
        ]
    },

    devServer: {
        contentBase: path.join(__dirname, "src")
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
    ]
})