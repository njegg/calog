const webpack = require("@nativescript/webpack");

module.exports = (env) => {
	webpack.init(env);

	// Learn how to customize:
	// https://docs.nativescript.org/webpack

  webpack.mergeWebpack({ resolve: {conditionNames:['svelte','require','node'] }})

	return webpack.resolveConfig();
};
