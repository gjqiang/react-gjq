/**
 * Created by gjqiang on 2017/7/11.
 */
const webpack = require('webpack');
const path = require('path');

const vendor = [
    'react',
    'react-dom',
    'react-redux',
    'react-router-dom',
    'redux-thunk',
];

module.exports = {
    output: {
        path: __dirname,
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        vendor
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};