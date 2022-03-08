import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    plugins: [nodeResolve()],

    output: {
        dir: 'bin',
        format: 'es',
        entryFileNames: 'core.js',
        chunkFileNames: '[name].js',
        minifyInternalExports: false,
        sourcemap: false,
    },

    manualChunks: {
        errors: ['./src/errors/index.js'],
        middleware: ['./src/middleware/index.js'],
    },

    external: [/node_modules/],
};
