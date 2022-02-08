import AJV from 'ajv';
import ajvErrors from 'ajv-errors';
import ajvFormats from 'ajv-formats';
import GenericError from '../errors/GenericError';

export default (schema) => {
    const requestProperties = Object.keys(schema);
    const ajv = new AJV({ allErrors: true });
    ajvErrors(ajv);
    ajvFormats(ajv);

    return (request) => {
        requestProperties.forEach((property) => {
            const propertyData = request[property];
            const propertySchema = schema[property];
            if (!ajv.validate(propertySchema, propertyData)) {
                throw ajv.errors.map(
                    ({ message }) => new GenericError(400, message)
                );
            }
        });
    };
};
