import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

export default {
    input: 'src/core.js',
    plugins: [nodeResolve(), terser()],

    output: {
        dir: 'bin',
        format: 'cjs',
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
    },

    manualChunks: {
        errors: ['./src/errors/index.js'],
        middleware: ['./src/middleware/index.js'],
    },

    external: ['ajv', 'ajv-formats', 'ajv-errors', 'cors', 'helmet', 'express'],
};
