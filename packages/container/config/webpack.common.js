module.exports = {
    module: {
        rules: [
            {
                test: /\.m?js$/, //tell babel process any file ending in .m or .js
                exclude: /node_modules/, //tell bable do not process node_modules files
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react','@babel/preset-env'], //tell babel process jsx tags, env means take ES16 and transform to ES5
                        plugins: ['@babel/plugin-transform-runtime'] //enable features like async await in browser
                    }
                }
            }
        ]
    }
}