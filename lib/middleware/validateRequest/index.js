import AJV from 'ajv';
import addErrorMessages from 'ajv-errors';

import { BaseMiddleware } from '../BaseMiddleware';
import { GenericError } from '../../errors/GenericError';

class RequestValidationError extends GenericError {
    constructor() {
        super(401, 'Request validation failed!');
    }
}

export const validateRequest = (schema) => {
    if (!schema) throw new Error('Schema must be provided!');
    // TODO: Add more checks.

    return BaseMiddleware((request) => {
        const ajv = new AJV({ allErrors: true });
        addErrorMessages(ajv);

        const requestProperties = Object.keys(schema); // body, headers, etc. // TODO: Make clearer.

        requestProperties.forEach((property) => {
            const propertyData = request[property];
            const propertySchema = schema[property];

            // TODO: Add ajv errors here.
            if (!ajv.validate(propertySchema, propertyData)) {
                throw new RequestValidationError();
            }
        });
    });
};
