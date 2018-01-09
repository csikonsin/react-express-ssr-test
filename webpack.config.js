module.exports = {
    entry: "./src/client-entry.js",
    output: {
        filename: "bundle.js",
        path: __dirname + "/dist"
    },

    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: "babel-loader",
            exclude: /node_modules/
        }]
    },
    
    resolve:{
        extensions: [".js", ".jsx"]
    }
}