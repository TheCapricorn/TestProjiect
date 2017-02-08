let ExtractTextPlugin = require('extract-text-webpack-plugin');
let styleTypes=[];
let path=require("path");
/*console.log(path.dirname(require('jquery')))*/
let loader = {
  'preLoaders': [
    {
      test: /\.js$/,
      include: "",
      loader: 'eslint-loader'
    }
  ],
  'js': {
    'babel': {
      test: /\.js$/,
      exclude: "/node_modules/",
/*      include:path.join(__dirname,"/../js"),*/
      loader: "babel-loader",
      query: {
/*        cacheDirectory: true,*/
        presets: ["es2015", "stage-0"],
      /*  plugins: ["transform-runtime"]*/
      }
    },
  },
  'style': {

    'css': {
      test: /\.css$/,
      loader: 'style-loader!css-loader!postcss-loader'
    },
    'sass': {
      test: /\.sass/,
      loader: 'css-loader?modules!sass-loader!postcss-loader'
    },
    'scss': {
      test: /\.scss/,
      loader: 'css-loader?modules!sass-loader!postcss-loader'
    },
    'less': {
      test: /\.less/,
      loader: 'css-loader?modules!less-loader!postcss-loader'
    },
/*    'stylus': {
      test: /\.styl/,
      loader: 'css-loader?modules!style-loader!stylus-loader'
    }*/
  },
  'other': {
    'json': {
      test: /\.json$/,
      loader: 'json-loader'
    },
    'image': {
      test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)/,
      loader: 'url-loader?limit=8192&name=../image/[hash:8].[name].[ext]'
    },
    'iconfont':{
      test: /\.(woff|woff2|eot|ttf|svg)\??.*$/,
      loader: 'url-loader?limit=8192&name=iconfont/[hash:16]'
    },
    'file': {
      test: /\.(mp4|ogg|svg)$/,
      loader: 'file-loader'
    },
/*    'file-iconfont': {
      test: /\.(woff|woff2|eot|ttf|svg)\??.*$/,
      loader: 'file-loader?name=iconfont/[hash:16]'
    },*/
    'raw': {
      test: /\.html$/,
      loader: 'raw-loader'
    }
  }
};

let def = {};

let config = ((loader)=> {
  let styleLoaders = [];
  let otherLoader=[];
  for (let k in loader) {
    let type = loader[k];
    if (k == "preLoaders") {
      def.preLoaders = type;
    } else {
      for (let i in type) {
        if (k == "style") {
         /* type[i]["loader"] = type[i]["loader"].split("!");*/
          styleTypes.push(i);
          styleLoaders.push(type[i]);

        }else{
          otherLoader.push(type[i]);
        }


      }

    };

  };
  def.styleLoaders = styleLoaders;
  def.otherLoader=otherLoader;
  def.styleTypes=styleTypes;
})(loader);

module.exports = def;
