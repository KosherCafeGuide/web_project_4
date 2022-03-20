// webpack.config.js
const path = require('path'); // connect path to webpack config
const HtmlWebpackPlugin = require("html-webpack-plugin"); // connect plugin 
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // connect plugin 
// connect mini-css-extract-plugin to the project
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: 'inline-source-map',
    entry: {
        main: './src/pages/index.js'
    },
    stats: { children: true },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: ''
    },
    target: ['web', 'es5'], // ensure the Webpack glue code is ES5 compatible too
    mode: 'development',
    devServer: {
        static: path.resolve(__dirname, './dist'), // specifies a folder from where to serve the application and its contents
        compress: true, // this will speed up file loading in development mode
        port: 8080, // will open your site at localhost:8080 (you can use another port)
        open: true // site will open automatically in the browser after executing npm run dev
    }, // add development mode here like this
    module: {
        rules: [ // this is an array of rules
            // add an object containing rules for Babel to it
            {
                // a regular expression that searches for all js files
                test: /\.js$/,
                // all files must be processed by babel-loader
                loader: "babel-loader",
                // exclude the node_modules folder, we don't need to process files in it
                exclude: "/node_modules/"
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        // add an options object
                        options: { importLoaders: 1 }

                    },
                    // add postcss-loader
                    "postcss-loader"
                ],
            },
            {
                // add the rule for processing files
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: "asset/resource"
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html" // path to our index.html file
        }),
        new CleanWebpackPlugin(), // use plugin
        new MiniCssExtractPlugin() // connect the plugin for merging CSS files
    ], // add the array here
}