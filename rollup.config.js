import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/core.js',

    output: [
        {
            dir: 'bin/commonjs',
            format: 'cjs',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
        },
        {
            dir: 'bin/esm',
            format: 'esm',
            entryFileNames: '[name].js',
            chunkFileNames: '[name].js',
        },
    ],

    manualChunks: {
        errors: ['src/errors/index.js'],
        middleware: ['src/middleware/index.js'],
    },

    plugins: [nodeResolve(), terser()],

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
