const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// const isDevelopment = process.env.NODE_ENV === "development";
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    devtool: 'none',
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "public", "index.html"),
        }),
        new MiniCssExtractPlugin({
            filename: 'css/main.css',
            // filename: isDevelopment ? '[name].css' : '[name].[hash].css',
            // chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
        })
    ],
    devServer: {
        static: {
            directory: path.join(__dirname),
        },
        port: 3000,
    },
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
            test: /\.ts$/,
            exclude: /node_modules/,
            use: ["ts-loader"],
        }
        ],
      },
      // pass all js files through Babel
      resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".scss"],
      }
};


