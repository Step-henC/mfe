const { merge} = require('webpack-merge');
const ModuleFederationPlugin =require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const domain = process.env.PRODUCTION_DOMAIN; //this wil be an env variable we set
                                        // its a string that tells us our domain in cloud
                                        //we do not know yet unitl it is in AWS
                                        //need it for the 'remotes' property

const prodConfig = {
    mode: 'production', //minify js files, takes longer, but optimized
    output: {
        filename: '[name].[contenthash].js' //done for caching issues, fix output files to have filename then hash of content in file
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container', //do not need nake for this host module but good practice
            remotes: {
                marketing: `marketing@${domain}/marketing/remoteEntry.js` //assuming remote entry file is set in subfolder of doamin on cloud called "marketing"
            },
            shared: packageJson.dependencies,

        })
    ]
}

module.exports = merge(commonConfig, prodConfig);