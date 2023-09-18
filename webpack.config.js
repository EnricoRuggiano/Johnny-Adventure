'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: './src/index.js',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'www/build'),
        publicPath: '/www/build/',
        filename: 'project.bundle.js'
    },
   plugins: [
        new webpack.DefinePlugin({
            'CANVAS_RENDERER': JSON.stringify(true),
            'WEBGL_RENDERER': JSON.stringify(true)
        }),
    ]
};
