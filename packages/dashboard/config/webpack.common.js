const {VueLoaderPlugin} = require('vue-loader')
module.exports = {
    entry: './src/index.js',
    output: {
        filename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.vue'] //tell webpack to load up .vue files
    },
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|woff|svg|eot|ttf)$/i,
                use: [{
                    loader: 'file-loader' //webpack can understand whenever we load up an image or font did not need imports for react but can use
                }]
            },
            {   
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.scss|\.css$/,
                use: ['vue-style-loader', 'style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.m?js$/, //tell babel process any file ending in .m or .js
                exclude: /node_modules/, //tell bable do not process node_modules files
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'], 
                        plugins: ['@babel/plugin-transform-runtime'] //enable features like async await in browser
                    }
                }
            }
        ]
    },
    plugins: [new VueLoaderPlugin]
}