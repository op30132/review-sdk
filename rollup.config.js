import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";

const defineGlobal = {
  ENV: process.env?.NODE_ENV,
};

export default [
  // browser-friendly UMD build
  {
    input: "src/index.js",
    output: {
      name: "jkos",
      file: pkg.browser,
      format: "umd",
    },
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
      }),
      // replace(defineGlobal.format()),
      replace({
        preventAssignment: true,
        JK: JSON.stringify(defineGlobal),
      }),
      commonjs(),
      json(),
      terser(),
    ],
  },

  // CommonJS (for Node) and ES module (for bundlers) build.
  // (We could have three entries in the configuration array
  // instead of two, but it's quicker to generate multiple
  // builds from a single configuration where possible, using
  // an array for the `output` option, where we can specify
  // `file` and `format` for each target)
  {
    input: "src/index.js",
    // external: ["ms"],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
    plugins: [
      resolve(),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
      }),
      replace({
        preventAssignment: true,
        JK: JSON.stringify(defineGlobal),
      }),
      commonjs(),
      json(),
      terser(),
    ],
  },
];
