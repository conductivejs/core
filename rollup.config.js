import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { terser } from 'rollup-plugin-terser';
import { babel } from '@rollup/plugin-babel';

export default {
    input: 'src/core.js',
    plugins: [
        babel({ babelHelpers: 'runtime', exclude: 'node_modules/**' }),
        nodeResolve(),
        // terser(),
    ],

    output: {
        dir: 'bin',
        format: 'cjs',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        sourcemap: true,
    },

    manualChunks: {
        errors: ['./src/errors/index.js'],
        middleware: ['./src/middleware/index.js'],
    },

    external: [
        'ajv',
        'ajv-formats',
        'ajv-errors',
        'cors',
        'helmet',
        'express',
        /@babel\/runtime/,
    ],
};
