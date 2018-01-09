const path  = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const dev = process.env.NODE_ENV === 'dev';

let cssLoaders = [
    { loader: 'css-loader', options: { importLoaders: 1, minimize: !dev } }
];

let config = {
    entry: [
        //"webpack-hot-middleware/client?path=http://localhost:3000/__webpack__hmr&reload=true",
        "./public/js/client-entry.js"],
     
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist",
        publicPath: "/dist/"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    plugins: [
        // it's better to have the css in the middle of the html during development so we can use the hot loading
        new ExtractTextPlugin({
            filename: '/public/bundle.css',
            disable: dev
        })
    ]
};

module.exports = {
    config,
    cssLoaders
}