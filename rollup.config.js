import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/core.js',

    output: [
        {
            dir: 'bin/cjs',
            format: 'cjs',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
        },
        {
            dir: 'bin/mjs',
            format: 'esm',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
        },
    ],

    manualChunks: {
        errors: ['src/errors/index.js'],
        middleware: ['src/middleware/index.js'],
    },

    plugins: [babel({ babelHelpers: 'runtime' }), nodeResolve(), terser()],

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
