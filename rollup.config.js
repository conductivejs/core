import babel from '@rollup/plugin-babel';
import del from 'rollup-plugin-delete';
import commonjs from '@rollup/plugin-commonjs';
import externals from 'rollup-plugin-node-externals';
import { terser } from 'rollup-plugin-terser';

export default [
    {
        input: 'src/main.js',

        output: [
            {
                dir: 'bin',
                format: 'cjs',
                entryFileNames: '[name].cjs.js',
                chunkFileNames: '[name].cjs.js',
            },
            {
                dir: 'bin',
                format: 'es',
                entryFileNames: '[name].esm.js',
                chunkFileNames: '[name].esm.js',
            },
        ],

        manualChunks: {
            errors: ['src/errors/index.js'],
            middleware: ['src/middleware/index.js'],
        },

        plugins: [
            del({ targets: 'bin/**' }),
            externals({ deps: true }),
            commonjs(),
            babel({
                babelHelpers: 'runtime',
                exclude: '**/node_modules/**',
                extensions: ['.js'],
            }),
            terser(),
        ],

        external: [
            'ajv',
            'ajv-formats',
            'ajv-errors',
            'cors',
            'helmet',
            'express',
            '@babel/runtime',
        ],
    },
];
