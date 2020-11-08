const HtmlWebpackPlugin = require("html-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const webpack = require("webpack");

const dist = __dirname + "/build";

module.exports = {
  entry: "./src/index",
  devtool: "inline-source-map",
  output: {
    path: dist,
    publicPath: "./",
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        use: [
          {
            options: {
              eslintPath: require.resolve("eslint"),
            },
            loader: require.resolve("eslint-loader"),
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.worker\.ts$/,
        use: [
          {
            loader: "worker-loader",
          },
          "ts-loader",
        ],
      },
      {
        test: /\.comlink\.ts$/,
        use: [
          {
            loader: "comlink-loader",
          },
          "ts-loader",
        ],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|ico|svg)$/i,
        use: [{ loader: "file-loader" }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:
        process.env.NODE_ENV === "production"
          ? "./public/index.prod.html"
          : "./public/index.html",
      favicon: "./public/favicon.ico",
    }),
    new GenerateSW({
      swDest: dist + "/sw.js",
      clientsClaim: true,
      skipWaiting: true,
    }),
    new webpack.DefinePlugin({
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    }),
  ],
  devServer: {
    contentBase: "public",
    disableHostCheck: true,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
};
