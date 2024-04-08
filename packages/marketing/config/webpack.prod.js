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
            shared: packageJson.dependencies,

        })
    ]
}

module.exports = merge(commonConfig, prodConfig);