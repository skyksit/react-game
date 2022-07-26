const path = require("path");
const webpack = require("webpack");
const RefresherWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  name: "wordrelay-settings",
  mode: isDevelopment ? "development" : "production",
  devtool: "eval",
  resolve: {
    extensions: [".js", ".jsx"],
  },

  entry: {
    app: ["./src/client"],
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  targets: {
                    browsers: [" > 5% in KR"],
                  },
                  debug: true,
                },
              ],
              "@babel/preset-react",
            ],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              isDevelopment && require.resolve('react-refresh/babel'),
            ].filter(Boolean),
          },
        },
      },
    ],
  },

  plugins: [
    isDevelopment && new RefresherWebpackPlugin(),
  ].filter(Boolean),

  output: {
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: '/dist',
  },

  devServer: {
    devMiddleware: {
      publicPath: '/dist',
    },
    static: { directory: path.resolve(__dirname)},
    hot: true,
  },
};