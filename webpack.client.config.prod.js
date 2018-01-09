const path = require("path")
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const ExtractTextPlugin = require("extract-text-webpack-plugin")


const merge = require("webpack-merge")

const baseConfig = require("./webpack.client.config.base").config
let cssLoaders = require("./webpack.client.config.base").cssLoaders




const config = merge(baseConfig, {
    module: {        
        loaders: [ ...baseConfig.module.loaders,
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                   // fallback: "style-loader",
                    use: [...cssLoaders, 'less-loader', "postcss-loader"]
                })
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            sourceMap: false
        })
    ]
});

module.exports = config;