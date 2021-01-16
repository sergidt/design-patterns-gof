const path = require('path');

module.exports = {
    entry: path.join(__dirname, 'src', 'app.ts'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist'),
        sourceMapFilename: 'bundle.js.map',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader',
                exclude: /node_modules/,
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, ''),
        compress: true,
        port: 3000,
        publicPath: '/dist/'
    }
};
