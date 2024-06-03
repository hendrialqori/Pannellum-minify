const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: [
        './src/js/pannellum.js',
        './src/js/libpannellum.js',
        './src/css/pannellum.css'
    ],
    output: {
        filename: 'js/pannellum.min.js',
        path: path.resolve(__dirname, 'build'),
        assetModuleFilename: 'css/img/[name][ext]',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: '/\.(png|svg|jpg)$/i',
                type: 'assets/resource',
            }
        ]
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin()
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/pannellum.min.css'
        })
    ],
    mode: 'production'
}