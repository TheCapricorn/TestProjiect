/**
 * Created by hp on 2017/2/7.
 */
let config=require("../webpack.config");
let fs=require("fs");
let path=require("path");
let publicPath=require("../cfg/defaultPath");
/*let viewPath=path.join(publicPath.rootPath,'app/view');*/
let HtmlWebpackPlugin = require('html-webpack-plugin');


config.plugins.push(
    new HtmlWebpackPlugin({
        template: './app/index.html'
    })
);
/*循环遍历view下的html*/

let directorys=(()=>{
    let arrDir=[];
    let data=fs.readdirSync(publicPath.viewPath);
    let reg=/\.html$/;
    for(let i=0;i<data.length;i++){
        if(reg.test(data[i])){
            arrDir.push( new HtmlWebpackPlugin({
                filename:'view/'+data[i],
                template: './app/view/'+data[i]
            }))
        }
    };
    config.plugins=config.plugins.concat(arrDir);
})();



module.exports=config;





