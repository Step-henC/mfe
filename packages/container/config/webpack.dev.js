const {merge} = require('webpack-merge'); //allow webpack to merge common file with dev file

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const commonConfig = require('./webpack.common');

const devConfig = {
    mode: 'development',
    output: { 
        publicPath: "http://localhost:8080/" //adding this cuz we saw auth had a problem with serving main.js files with nested url 
    },  //no public path will access server domain by default, but future proofing now. Slash at the end is crucisal!!!
    devServer: {
        port: 8080,
        historyApiFallback: true,
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {         //marketing in url lines up with name marketing in marketing's webpack.dev modulefederationplugin
                marketing: 'marketing@http://localhost:8081/remoteEntry.js',
                auth: 'auth@http://localhost:8082/remoteEntry.js'
            }, //make use of marketing inside App.js
          // shared: ['react', 'react-dom'] instead of sharing individual packages, we can do dependencies from package.json
        //may not share devDependencies in package.json, but definitely wanna use regular dependencies
            shared: packageJson.dependencies, //depencies is already a string array
        }),
       
    ]
}

module.exports = merge(commonConfig, devConfig);