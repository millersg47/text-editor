const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const { InjectManifest } = require("workbox-webpack-plugin");
const GenerateSW = require("workbox-webpack-plugin").GenerateSW;
const path = require("path");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "Text Editor",
      }),
      new GenerateSW(),
      new WebpackPwaManifest({
        name: "TextEditor",
        short_name: "Text",
        description: "Enter, update and store text.",
        background_color: "#2EC4B6",
        theme_color: "#011627",
        start_url: "/",
        publicPath: "/",
        icons: [
          {
            src: path.resolve("/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("images", "icons"),
          },
        ],
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
