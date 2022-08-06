const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
import path from "path";
import webpack from "webpack";

const port = 8081;

/* const buildOutput = {
    filename: '[name]-[contenthash].js',
    hashDigestLength: 10,
    path: path.resolve(__dirname, './dist'),
    chunkFilename: 'chunks/[name].[contenthash:16].js',
    publicPath: `//${process.env.MODULE_NAME}/${process.env.SUB_MODULE_NAME}/self-prj/dist/`,
  }; */

const config: any = {
  mode: "development",
  context: path.resolve(__dirname),
  // 入口
  entry: {
    app: path.resolve(__dirname, "./src/index.tsx"),
  },
  // 出口
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash].bundle.js",
    publicPath: `http://localhost:${port}/public/`,
  },
  // Enable sourcemaps for debugging webpack's output.
  devtool: "inline-source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json", ".jsx", ".less", ".css"],
    modules: [
      path.resolve(__dirname, "node_modules"),
      path.resolve(__dirname, "src"),
    ],
  },
  // loader
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
            // MiniCssExtractPlugin.loader,
            // 将模块的导出作为样式添加到 DOM 中
          },
          {
            loader: "css-loader",
            options: { sourceMap: true },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              plugins: [
                require("autoprefixer")({
                  overrideBrowserslist: ["last 5 versions"],
                }),
              ],
            },
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: true,
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // 清理掉dist文件内容
    new CleanWebpackPlugin(),
    // new webpack.optimize.UglifyJsPlugin()  no use,
    new HtmlWebpackPlugin({
      // title: 'Output Management',
      template: path.resolve(__dirname, "./index.ejs"),
      templateParameters: {
        ENV: "development",
      },
      // favicon: path.resolve(__dirname, './src/images/favicon.ico'),
    }),
    // new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.DefinePlugin({
    //     'process.env.ENV': JSON.stringify(process.env.ENV),
    // }),
    // 提取css
    new MiniCssExtractPlugin({
      filename: "[name]-[hash].css",
    }),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    // [],
  },
  stats: "minimal",
  devServer: {
    // 将 dist 目录下的文件，作为可访问文件
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/",
    },
    devMiddleware: {
      index: true,
      mimeTypes: { phtml: "text/html" },
      publicPath: "/public",
      serverSideRender: true,
      writeToDisk: true,
    },
    open: true,
    https: false,
    host: "localhost",
    hot: "only",
    port: port,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "*",
    },
  },
};

module.exports = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(config);
    }, 5000);
  });
};
