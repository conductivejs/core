import AJV from 'ajv';
import addFormats from 'ajv-formats';
import GenericError from '../errors/GenericError';

export default (schema) => (request) => {
    const ajv = new AJV();
    addFormats(ajv);

    const requestProperties = Object.keys(schema);

    requestProperties.forEach((property) => {
        const propertyData = request[property];
        const propertySchema = schema[property];

        if (!ajv.validate(propertySchema, propertyData)) {
            throw new GenericError(400, 'Invalid request!');
        }
    });
};
