module.exports = {
    semi: false,
    overrides: [
        {
            files: '*.js',
            options: {
                semi: true,
                tabWidth: 4,
                singleQuote: true,
                printWidth: 120,
            },
        },
        {
            files: '*.yml',
            tabWidth: 2,
            singleQuote: true,
        },
    ],
};
