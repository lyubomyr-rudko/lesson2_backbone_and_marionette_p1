module.exports = {
	entry: './app.js',
	output: {
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
