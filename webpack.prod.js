const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: '/',
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
        }),
        new CleanPlugin.CleanWebpackPlugin(),
    ],
    module: {
        // exclude node_modules
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            exclude: /node_modules/,
            use: [
                // Creates `style` nodes from JS strings
                MiniCssExtractPlugin.loader,

                // Translates CSS into CommonJS
                "css-loader",

                // Compiles Sass to CSS
                "sass-loader",
            ],
        },
        {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            loader: 'file-loader',
            options: {
                name: '/src/assets/[name].[ext]'
            }

        },
        {
            test: /\.tsx$/,
            exclude: /node_modules/,
            use: ["ts-loader"],
        }
        ],
      },
      // pass all js files through Babel
      resolve: {
        extensions: ["*", ".js", ".jsx", ".tsx", ".ts", ".scss"],
      }
};
