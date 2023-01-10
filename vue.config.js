const { defineConfig } = require("@vue/cli-service");
//treeshake
const TerserPlugin = require("terser-webpack-plugin");
//测速工具
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
//Gzip压缩
const CompressionPlugin = require("compression-webpack-plugin");
//webpack-bundle-analyzer
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const path = require("path");
// 路径处理方法
function resolve(dir) {
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
  chainWebpack: (config) => {
      config.plugin("compression-webpack-plugin").use(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
        })
      );
      // const imgRule = config.module.rule('images');
      // imgRule
      //     .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      //     .use('image-webpack-loader')
      //     .loader('image-webpack-loader')
      //     .options({ bypassOnDebug: true })
      //     .end();
  },
  configureWebpack: {
    module: {
      noParse: /(^jquery$)|(^lodash$)|(^vue$)|(^pinia$)|(^vue-router$)/,
      rules: [
        {
          test: /\.js$/i,
          include: resolve("src"),
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    cache: {
      type: "filesystem",
    },
    plugins: [new SpeedMeasurePlugin(), new BundleAnalyzerPlugin()],
    //开启生产模式
    mode: "production",
    //ESBuild编译器
    optimization: {
      usedExports: true,
      minimize: true, // 开启最小化
      minimizer: [
        new TerserPlugin({
          //swc压缩
          minify: TerserPlugin.swcMinify,
          //esbuild压缩
          //minify:TerserPlugin.esbuildMinify
          terserOptions: {},
        }),
      ],
    },
  },
});
