const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const terser = require('@rollup/plugin-terser');
const json = require('@rollup/plugin-json');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const packageJson = require('./package.json');
const sizes = require('rollup-plugin-sizes');
const filesize = require('rollup-plugin-filesize');
const dts = require('rollup-plugin-dts');

module.exports = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      postcss(),
      json(),
      terser(),
      sizes(),
      filesize(),
    ],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];
