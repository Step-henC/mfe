const {merge} = require('webpack-merge'); //allow webpack to merge common file with dev file
const HtmlWebpackPlugin = require('html-webpack-plugin'); //inject script tags into html file

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    output: { //have to add public path for local dev because of nested url ".../auth/signup"
        publicPath: "http://localhost:8082/" //marketing does not have to do this beacuse no nested url
    }, //public path tells project to get files at domain where server is running to serve main.js files
    // we will add this to other webpacks too just to avoid
    devServer: {
        port: 8082,
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'auth',
            filename: 'remoteEntry.js', //no need to change this standard name: remoteEntry
            exposes: {
                './AuthApp': './src/bootstrap' //whenever someone asks for (./) 
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