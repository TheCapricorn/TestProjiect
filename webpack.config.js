/**
 * Created by hp on 2017/1/15.
 */
'use strict';
var path=require('path');
var webpack=require('webpack');
let precss=require('precss');
let autoprefixer=require('autoprefixer');
let cf=require("./cfg/default");



let config={
    entry: {
        "index":[path.resolve(__dirname, 'app/js/index.js')],
        "about":[path.resolve(__dirname, 'app/js/about.js')]
    },
    output:{
        path:path.resolve(__dirname,'./src'),
        publicPath: "/assets/",
        filename:'js/[name]bundle.js'
    },
    devtool: 'eval-source-map',
    postcss: function () {
        return [precss, autoprefixer];
    },
    module: {
        preLoaders:cf.preLoaders,
        loaders:cf.styleLoaders.concat(cf.otherLoader)
    },
    resolve: {
        extensions: ['', '.js','.css','.html']
    },
    externals:{
        'jquery':'window.jQuery'
    },
    plugins:[
        /*new webpack.optimize.OccurenceOrderPlugin(),*/
/*        new webpack.HotModuleReplacementPlugin(),*/
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
/*        new webpack.optimize.CommonsChunkPlugin('vendor','vendor.js'),*/
/*        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'window.$': 'jquery',
        }),*/
/*        new webpack.NoErrorsPlugin()*/

    ]
};
/*config.module.loaders.unshift( {
        test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
        loader: 'expose?$!expose?jQuery'// 先把jQuery对象声明成为全局变量`jQuery`，再通过管道进一步又声明成为全局变量`$`
 }
);*/
module.exports=config;


