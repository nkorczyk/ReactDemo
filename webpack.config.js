var path = require('path');

module.exports = {
    entry: [
        path.join(__dirname, '/src/main.js')
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/, 
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            }
        ]
    }
};
