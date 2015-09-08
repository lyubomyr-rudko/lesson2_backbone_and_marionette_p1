module.exports = {
    entry: './app.js',
    output: {
        path: './build',
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    watch: true,
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
        ]
    },
    node: {
        fs: "empty"
    }
};
