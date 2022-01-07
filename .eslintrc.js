module.exports = {
    env: { es2021: true, node: true },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['prettier'],
    ignorePatterns: ['bin/**'],
    parser: '@babel/eslint-parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
};
