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
