/**
 * Created by hp on 2017/2/7.
 */
let path=require("path");
let rootPath=path.resolve();
let publicPath={
    rootPath:rootPath,
    viewPath:path.join(rootPath, 'app/view')
};


module.exports=publicPath;