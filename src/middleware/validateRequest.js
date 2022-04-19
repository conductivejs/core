import AJV from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';
import ajvKeywords from 'ajv-keywords';
import GenericError from '../errors/GenericError';

const ajv = new AJV({
    allErrors: true,
    discriminator: true,
});

ajvErrors(ajv);
ajvFormats(ajv);
ajvKeywords(ajv);

export default (schema) => {
    const compiledValidationFunctions = {};
    const requestProperties = Object.keys(schema);

    requestProperties.forEach((property) => {
        const requestPropertySchema = schema[property];
        const validationFunction = ajv.compile(requestPropertySchema);

        compiledValidationFunctions[property] = validationFunction;
    });

    return (request) => {
        requestProperties.forEach((property) => {
            const validationFunction = compiledValidationFunctions[property];
            if (!validationFunction) return;

            const requestPropertyData = request[property];
            const isValid = validationFunction(requestPropertyData);

            if (!isValid) {
                throw validationFunction.errors.map(
                    ({ message }) => new GenericError(400, message)
                );
            }
        });
    };
};
