const path = require('path');

module.exports = {
    entry: './src/index.js',
    mode: 'production',
    target: 'node',
    devtool: 'eval-source-map',
    resolve: { extensions: ['.js'] },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'bin'),
        library: '$',
        libraryTarget: 'umd',
    },
    externals: {
        express: 'express',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
