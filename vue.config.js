const { defineConfig } = require("@vue/cli-service");
const TerserPlugin = require("terser-webpack-plugin");
//测速工具
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const path = require('path');
// 路径处理方法
function resolve(dir){
  return path.join(__dirname, dir);
}
module.exports = defineConfig({
  //打包时不要map文件
  productionSourceMap: false,
  transpileDependencies: true,
  //配置代理服务器
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {"^/api" : ""}
      },
    },
  },
  configureWebpack: {
    module: { 
      noParse: /(^jquery$)|(^lodash$)|(^vue$)|(^pinia$)|(^vue-router$)/,
      rules: [
        {
          test: /\.js$/i,
          include: resolve('src'),
          exclude: /node_modules/,
          use: [
            'babel-loader',
          ]
        },
      ]
    },
    cache: {
      type: "filesystem",
    },
    plugins: [new SpeedMeasurePlugin()],
    //ESBuild编译器
    optimization: {
      minimize: true, // 开启最小化
      minimizer: [
        new TerserPlugin({
          //swc压缩
          minify:TerserPlugin.swcMinify,
          //esbuild压缩
          //minify:TerserPlugin.esbuildMinify
          terserOptions:{},
        })
      ]
    },
  },
});
