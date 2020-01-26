const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        main: ["@babel/polyfill", "./src/chunks/main.js"],
    },

    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'web/build/'),
        publicPath: '/build/'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                include: [
                    path.resolve(__dirname, 'src/images'),
                ],
                exclude: /(\/fonts|samples)/,
                use: [

                    {
                        loader: 'file-loader', options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader'
                    },
                ],
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src/'),
                ],
                use: {
                    loader: "babel-loader",
                    options: {
                        'presets': ['@babel/preset-env', '@babel/preset-react'],
                        'plugins': [
                            'syntax-dynamic-import',
                            'transform-class-properties',
                            'react-hot-loader/babel'
                        ],
                        cacheDirectory: true
                    }
                }
            },

            {
                test: /\.(sa|sc|c)ss$/,
                include: [
                    path.resolve(__dirname, 'src/styles'),
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    {loader: "css-loader", options: {}},

                    {
                        loader: "postcss-loader",
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')({
                                    'overrideBrowserslist': ['last 2 versions']
                                }),

                            ]
                        }
                    },
                    // {loader: 'resolve-url-loader'},
                    {loader: "sass-loader", options: {}},

                ]
            },

        ]
    },


    optimization: {
        minimize: false,

    },

    plugins: [
        new CleanWebpackPlugin(),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            reload: true,
            server: { baseDir: ['web'] }

        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),

        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[name].css"
        }),


        new HtmlWebpackPlugin({
            chunksSortMode: "manual",
            chunks: ['main'],
            filename: path.resolve(__dirname, 'web/index.html'),
            template: path.resolve(__dirname, 'src/index.html'),
            inject: true,
        }),


    ],

    devtool: 'eval-source-map',

    performance: {
        hints: false,
    },

    resolve: {
        modules: ['node_modules', 'src', 'web',  './node_modules'],
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", "css", "scss", "less"],
        mainFields: ['browser', 'jsnext:main', 'main'],

    },
    target: 'web',
    watch: true
};
