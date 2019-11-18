import commonjs from "rollup-plugin-commonjs";
import nodeResolve from "rollup-plugin-node-resolve";
import typescript from "rollup-plugin-typescript";

export default {
	input: "Scripts/Index.ts",
	output: {
		file: "wwwroot/Scripts/Index.js",
		format: "iife",
		sourcemap: "inline"
	},
	plugins: [
		nodeResolve(),
		commonjs(),
		typescript()
	]
};