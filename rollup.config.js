const { babel } = require("@rollup/plugin-babel");
const commonjs = require("@rollup/plugin-commonjs");
const terser = require("@rollup/plugin-terser");
const resolver = require("@rollup/plugin-node-resolve");
const del = require('rollup-plugin-delete')

const config = {
  input: "./lib/index.js",
  output: [
    {
      file: './dist/index.cjs.js',
      format: 'cjs'
    },
    {
      file: './dist/index.es.js',
      format: 'es'
    }
  ],
  plugins: [
    del({targets: 'dist/*'}),
    resolver(),
    commonjs(),
    babel({ babelHelpers: "bundled" }),
    terser()
  ],
};

module.exports = config;
