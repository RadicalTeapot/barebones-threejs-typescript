const path = require('path');
const webpack = require('webpack');
/** Webpack plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

/** Name of the folder in which the final page will be built */
const outputFolderName = "public";

module.exports = {
    entry: './src/app.ts',
    /** Add `.ts` and `.tsx` as a resolvable extension.
     * This will make import Name from "./Name"; work in typescript files
     */
    resolve: {
        extensions: [".ts", ".js"]
    },
    /** Source maps mode */
    devtool: "cheap-module-eval-source-map",
    module: {
        rules: [
            /** Rules for ts files */
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, outputFolderName),
        index: 'index.html',    // Serve <outputFolderName>/index.html
        open: false,            // Open a web browser on server start
        host: 'localhost',      // Set host to localhost
        port: 8080,             // Run on port 8080
    },
    output: {
        path: path.resolve(__dirname, outputFolderName),
        filename: '[name].[contenthash].js'
    },
    plugins: [
        /** Empty the dist folder */
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        }),
        /** General index.html with script tags automatically from template */
        new HtmlWebpackPlugin({
            title: 'Test matrices',
            template: path.resolve(__dirname, 'src', 'index.html')
        })
    ],

    optimization: {
        /** Make sure contenthash stays identical when chunk content doesn't change */
        moduleIds: 'hashed',
        /** Extract webpack boilerplate code from app entry */
        runtimeChunk: 'single',
        /** Extract node_modules from app entry and bundle all them together */
        splitChunks: {
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
}
