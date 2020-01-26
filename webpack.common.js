const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
    mode: 'production',
    devtool: 'false',
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                extractComments: true,
                uglifyOptions: {
                    output: {
                        comments: false,
                        ascii_only: true,
                        beautify: false,
                    },
                    nameCache: null, // or specify a name cache object
                    toplevel: false,
                    ie8: false,
                }
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        sideEffects: true,
        concatenateModules: true,
        splitChunks: {
            chunks: 'async',
        }
    },

    plugins: [
        new ProgressBarPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                include: [
                    path.resolve(__dirname, 'src/images'),
                ],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/'
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                enabled: false,
                                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                                // Try enabling it in your environment by switching the config to:
                                // enabled: true,
                                // progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 7,
                            },
                            pngquant: {
                                quality: [0.65, 0.90],
                                speed: 4,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src'),
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
                                require('cssnano')({
                                    preset: 'default',
                                })
                            ]
                        }
                    },
                    // {loader: 'resolve-url-loader'},
                    {loader: "sass-loader", options: {}},
                ]
            },
        ]
    },
    resolve: {
        modules: ['node_modules', 'src', 'web',  './node_modules'],
        extensions: [".js", ".json", "css", "scss"],
        mainFields: ['browser', 'jsnext:main', 'main'],
        symlinks: false,
    },
    target: 'web',
};

