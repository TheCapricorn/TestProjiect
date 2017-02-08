/**
 * Created by hp on 2017/1/28.
 */
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let config=require("../webpack.config");
let cf=require("../cfg/default");


let deleteStyleLoader=(data)=>{
    for( let i in data){
        if( data[i].loader.search(/style-loader/)=="0"){
            data[i].loader=data[i].loader.replace(/style-loader!/,'');
        }else if(data[i].loader.search(/style-loader/)==data[i].loader.length-1 || data[i].loader.search(/style-loader/) ){
            data[i].loader=data[i].loader.replace(/!style-loader/,'');
        }

        data[i].loader=data[i].loader.split("!");

    }
    return  data;
};
let setExtractTextPlugin = (loader,types)=> {
    let data={"loader":[],"plugin":[]};
    for(let i=0;i<loader.length;i++){
        let l=new ExtractTextPlugin('style/[name].'+types[i]);
        console.log(loader[i]['loader']);

        loader[i]['loader']= l.extract(loader[i]['loader'])
        data.loader.push( loader[i]);
        data.plugin.push(l);
        /* console.log(loader[i])*/
    }
    return data;

};



let getLoadersAndPlugin=(()=>{
    config.module.loaders=[];
    let styleLoader = deleteStyleLoader(cf.styleLoaders);
    let setExtract =setExtractTextPlugin(styleLoader,cf.styleTypes);
    if(!config.module.preLoaders){
        config.module.preLoaders=cf.preLoaders;
    }
    config.module.loaders=(setExtract.loader.concat(cf.otherLoader));

    config.plugins=config.plugins.concat(setExtract.plugin);
})();



module.exports=config;