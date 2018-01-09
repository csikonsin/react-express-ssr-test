const express = require("express")
const path = require("path")
const fs = require("fs")
const renderToString = require("react-dom/server").renderToString
const React = require("react")
import App from "./App"
const dev = process.env.NODE_ENV === 'dev';
const server = express()

if(dev){
    const webpack = require("webpack")
    const config = require("../webpack.client.config.dev.js")    
    const webpackDevMiddleware = require("webpack-dev-middleware")
    const webpackHotMiddleware = require("webpack-hot-middleware")

    const compiler = webpack(config)

    console.log("USING MIDDLEWARE")
    server.use(webpackDevMiddleware(compiler,{
        publicPath: config.output.publicPath,
        noInfo: true
    }))
    
    server.use("/public", express.static(__dirname + "/../public"))
}
else{
    server.use("/dist",express.static(__dirname))
    server.use("/public", express.static(__dirname + "/public"))

}



/*server.use(webpackHotMiddleware(compiler, {
    path: '/__webpack__hmr'
}))*/

let template = fs.readFileSync("./src/index.html", "utf-8")

server.get("*", (req,res) => {


    const html = renderToString(<App/>)

    template = template.replace("<!-- ::CONTENT:: -->", html)

    res.end(template)
})
 

server.listen("3000", () => console.log("Listening..."))