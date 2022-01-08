import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/core.js',
    plugins: [nodeResolve(), terser()],

    output: [
        {
            dir: 'bin',
            format: 'cjs',
            entryFileNames: 'core.cjs',
        },
        {
            dir: 'bin',
            format: 'esm',
            entryFileNames: 'core.mjs',
        },
    ],

    external: ['ajv', 'ajv-formats', 'ajv-errors', 'cors', 'helmet', 'express'],
};
