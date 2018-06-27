import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import replace from 'rollup-plugin-replace';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/react-i17n.min.js',
    format: 'umd',
    name: 'ReactI17n',
    globals: 'ReactI17n',
    sourcemap: true,
  },
  plugins: [
    commonjs({
      include: 'node_modules/**',
    }),
    resolve({
      jsnext: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    babel({
      exclude: 'node_modules/**',
    }),
    uglify({
      warnings: false,
    }),
  ],
  external: ['react'],
};
