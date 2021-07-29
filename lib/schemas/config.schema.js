const generateValidMethods = () => {
    const validMethods = ['get', 'put', 'patch', 'post', 'delete', 'options', 'connect', 'trace'];
    const validMethodsUpper = validMethods.map((method) => method.toUpperCase());

    return validMethods.concat(validMethodsUpper);
};

const configSchema = {
    type: 'object',
    required: ['path', 'method', 'handler'],
    properties: {
        path: {
            type: 'string',
        },
        method: {
            type: 'string',
            enum: generateValidMethods(),
        },
        validate: {
            type: 'object',
            properties: {
                body: true,
                params: true,
                query: true,
                headers: true,
            },
        },
        middleware: {
            type: 'array',
            items: { instanceof: 'Function' },
        },
        handler: {
            instanceof: 'Function',
        },
    },
    errorMessage: {
        required: {
            handler: '"handler" does not exist or is not a function',
        },
    },
};

export default configSchema;
