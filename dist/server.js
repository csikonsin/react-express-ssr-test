"use strict";

var _App = require("./App");

var _App2 = _interopRequireDefault(_App);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var express = require("express");
var path = require("path");
var fs = require("fs");
var renderToString = require("react-dom/server").renderToString;
var React = require("react");

var dev = process.env.NODE_ENV === 'dev';
var server = express();

if (dev) {
    var webpack = require("webpack");
    var config = require("../webpack.client.config.dev.js");
    var webpackDevMiddleware = require("webpack-dev-middleware");
    var webpackHotMiddleware = require("webpack-hot-middleware");

    var compiler = webpack(config);

    console.log("USING MIDDLEWARE");
    server.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
        noInfo: true
    }));

    server.use("/public", express.static(__dirname + "/../public"));
} else {
    server.use("/dist", express.static(__dirname));
    server.use("/public", express.static(__dirname + "/public"));
}

/*server.use(webpackHotMiddleware(compiler, {
    path: '/__webpack__hmr'
}))*/

var template = fs.readFileSync("./src/index.html", "utf-8");

server.get("*", function (req, res) {

    var html = renderToString(React.createElement(_App2.default, null));

    template = template.replace("<!-- ::CONTENT:: -->", html);

    res.end(template);
});

server.listen("3000", function () {
    return console.log("Listening...");
});