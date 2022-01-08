import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/core.js',

    output: [
        {
            dir: 'bin',
            format: 'cjs',
            entryFileNames: '[name].cjs',
            chunkFileNames: '[name].cjs',
        },
        {
            dir: 'bin',
            format: 'esm',
            entryFileNames: '[name].mjs',
            chunkFileNames: '[name].mjs',
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
