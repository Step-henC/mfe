const {merge} = require('webpack-merge'); //allow webpack to merge common file with dev file
const HtmlWebpackPlugin = require('html-webpack-plugin'); //inject script tags into html file

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 8081,
        historyApiFallback: {
            index: '/index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js', //no need to change this standard name: remoteEntry
            exposes: {
                './MarketingApp': './src/bootstrap' //whenever someone asks for (./) we put placeholder Marketing and reference the bootstrap folder we want to expose
            },
            //shared: ['react', 'react-dom'] //share react with container to prevent double loading of react
            shared: packageJson.dependencies //sharing dependencis save almost a MB of js but prod env js will be minified
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(commonConfig, devConfig);