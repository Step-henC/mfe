const { merge} = require('webpack-merge');
const ModuleFederationPlugin =require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const prodConfig = {
    mode: 'production', //minify js files, takes longer, but optimized
    output: {
        filename: '[name].[contenthash].js', //done for caching issues, fix output files to have filename then hash of content in file
        publicPath: '/marketing/latest/' //tell modulefederation to prepend dir so remoteEntry pointing to correct location in s3
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'marketing',
            filename: 'remoteEntry.js', 
            exposes: {
                './MarketingApp': './src/bootstrap'
            },
            shared: packageJson.dependencies, //all dependencies are output into separate js files seen in browser
                                                //for http/2 its actually advantageous to have multiple small files instead of 
                                                        //loading up bigger js files. You can remove to reduce js files in browser
                                                        //but would have to load it multiple times

        })
    ]
}

module.exports = merge(commonConfig, prodConfig);