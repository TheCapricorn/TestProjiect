/**
 * Created by hp on 2017/1/20.
 */
/*let express = require('express');*/
/*let path=require("path");
let app=new express();*/
/*let webpackDevMiddleware = require('webpack-dev-middleware');
let webpackHotMiddleware = require('webpack-hot-middleware');*/
let webpack = require('webpack');
let config = require("./webpack.config.js");
let webpackDevServer = require('webpack-dev-server');
config.entry.index.unshift('webpack/hot/dev-server');
config.entry.index.unshift('webpack-dev-server/client?http://localhost:8080');
config.entry.about.unshift('webpack/hot/dev-server');
config.entry.about.unshift('webpack-dev-server/client?http://localhost:8080');
/*config.entry.index.unshift('webpack-hot-middleware/client?reload=true');*/
if (process.env.NODE_ENV == 'dev') {

}else{
}


let compiler = webpack(config);

/*app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, 'app/view'));*/

/*
app.use(webpackDevMiddleware(compiler,{
    publicPath: config.output.publicPath,
    noInfo: true,
    stats: {
        colors: true
    }
}));
app.use(webpackHotMiddleware(compiler));

*/

// 路由
/*app.get('/:viewname?', function(req, res, next) {

    var viewname = req.params.viewname
        ? req.params.viewname + '.html'
        : 'index.html';
console.log(compiler.options);
    var filepath = path.join(compiler.options.output.path);

    // 使用webpack提供的outputFileSystem
    compiler.outputFileSystem.readFile(filepath, function(err, result) {
        if (err) {
            // something error
            return next(err);
        }
        res.set('content-type', 'text/html');
        res.send(result);
        res.end();
    });
});*/


/*module.exports = app.listen(8080, function(err) {
    if (err) {
        // do something
        return;
    }

    console.log('Listening at http://localhost:' +8080 + '\n')
})*/
let  server=new webpackDevServer(compiler, {
    contentBase: "./app/",
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    port: "8080",
    publicPath:config.output.publicPath,
    noInfo: true,
})
server.listen(8080);
if (module.hot) {
    module.hot.accept();
};