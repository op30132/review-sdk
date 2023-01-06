import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import sizes from 'rollup-plugin-sizes';
import filesize from 'rollup-plugin-filesize';
import dts from 'rollup-plugin-dts';
import dev from 'rollup-plugin-dev';
import livereload from 'rollup-plugin-livereload';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';

const packageJson = require('./package.json');

const EXPORT_NAME = 'review-sdk';
const isProduction = process.env.NODE_ENV === 'production';
const defaultDevPort = 3000;
const serverPort = process.env.DEV_PORT || defaultDevPort;

const getPlugins = (shouldMinify) => {
  return [
    resolve({
      browser: true,
    }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.json',
    }),
    postcss(),
    replace({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
      preventAssignment: false,
    }),
    shouldMinify
      ? terser()
      : terser({
          compress: false,
          mangle: false,
          format: { beautify: true },
        }),
    shouldMinify && sizes(),
    shouldMinify && filesize(),
  ];
};

let bundles = [
  {
    input: 'src/index.ts',
    output: {
      name: EXPORT_NAME,
      file: 'dist/review-sdk.development.js',
      format: 'umd',
      sourcemap: true,
    },
    plugins: [
      ...getPlugins(false),
      !isProduction &&
        dev({
          dirs: ['dist', 'static'],
          port: serverPort,
        }),
      !isProduction && livereload(),
      !isProduction &&
        copy({
          targets: [
            { src: 'dist/review-sdk.development.js', dest: 'src/static' },
          ],
        }),
    ],
    watch: {
      clearScreen: false,
    },
  },
];

if (isProduction) {
  bundles = bundles.concat(
    {
      input: 'src/index.ts',
      output: [
        {
          name: EXPORT_NAME,
          file: 'dist/review-sdk.production.js',
          format: 'umd',
        },
      ],
      plugins: [...getPlugins(isProduction)],
    },
    {
      input: 'src/index.ts',
      output: [
        {
          file: packageJson.module,
          format: 'esm',
        },
      ],
      plugins: getPlugins(isProduction),
    },
    {
      input: 'src/index.ts',
      output: [
        {
          name: EXPORT_NAME,
          file: packageJson.main,
          format: 'cjs',
        },
      ],
      plugins: getPlugins(false),
    },
    {
      input: 'dist/esm/types/index.d.ts',
      output: [{ file: 'dist/index.d.ts', format: 'es' }],
      plugins: [dts.default()],
      external: [/\.css$/],
    },
  );
}

export default bundles;
