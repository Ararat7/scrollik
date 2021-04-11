import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';

import pkg from './package.json';

export default {
  input: 'src/Scrollik/Scrollik.tsx',
  output: [
    {
      format: 'cjs',
      name: 'components',
      entryFileNames: '[name]/index-[format].js',
      dir: 'dist',
      exports: 'named',
      sourcemap: true,
      hoistTransitiveImports: false,
      globals: {
        'react-dom': 'reactDOM',
      },
    },
    {
      dir: 'dist',
      format: 'esm',
      sourcemap: true,
      exports: 'named',
      hoistTransitiveImports: false,
      entryFileNames: '[name]/index.js',
    },
  ],
  external: Object.keys(Object.assign(pkg.peerDependencies, pkg.dependencies)),
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({ useTsconfigDeclarationDir: true }),
  ],
};
