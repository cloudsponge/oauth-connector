import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import strip from '@rollup/plugin-strip'
import { uglify } from 'rollup-plugin-uglify'
import { sizeSnapshot } from 'rollup-plugin-size-snapshot'

const babelOptions = require('./babel.config.js')

const baseBuild = {
  input: './src/oauth-connector.js',
  output: {
    name: 'oauthConnector',
    file: './dist/oauth-connector-debug.js',
    format: 'iife',
    globals: { window: 'window' },
  },
  plugins: [
    babel({
      exclude: './node_modules/**',
      babelHelpers: 'bundled',
      extensions: ['.js'],
      ...babelOptions,
    }),
    resolve(),
    commonjs(),
    sizeSnapshot({}),
  ],
}

const prodBuild = {
  ...baseBuild,
}
prodBuild.output = {
  ...baseBuild.output,
  file: './dist/oauth-connector-min.js',
}
prodBuild.plugins = [...baseBuild.plugins, strip(), uglify()]

export default [baseBuild, prodBuild]
