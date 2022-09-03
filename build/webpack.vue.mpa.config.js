const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  mode: "development",
  entry: {
    home: path.resolve(__dirname, "../src/mpa/home.js"),
    login: path.resolve(__dirname, "../src/mpa/login.js"),
  },
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "../dist"),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
    splitChunks: {
      chunks: "all",
      minSize: 300 * 1024,
      name: "common",
      cacheGroups: {
        jquery: {
          name: "jquery",
          test: /jquery\.js/,
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
        generator: {
          filename: "images/[name].[hash:6][ext]",
        },
      },
      {
        test: /\.ejs/,
        loader: "ejs-loader",
        options: {
          esModule: false,
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "home.html",
      template: path.resolve(__dirname, "../public/index.html"),
      chunks: ["home"],
    }),
    new HtmlWebpackPlugin({
      filename: "login.html",
      template: path.resolve(__dirname, "../public/index.html"),
      chunks: ["login"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "../src/img"),
          to: path.resolve(__dirname, "../dist/img"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[name].chunk.[hash:6].css",
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
  ],
};
