const path = require("path");
const webpack = require("webpack");

module.exports = {
  name: "gugudan-settings",
  mode: "development",
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
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { 
                targets: {
                  browsers: [' > 5% in KR' ] 
                },
                debug: true,
              }],
              "@babel/preset-react"
            ],
            plugins: ["@babel/plugin-proposal-class-properties"],
          },
        },
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
  },
};
