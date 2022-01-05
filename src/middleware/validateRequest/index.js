import AJV from 'ajv';

import { BaseMiddleware } from '../BaseMiddleware';
import { GenericError } from '../../errors/GenericError';

class RequestValidationError extends GenericError {
    constructor() {
        super(401, 'Request validation failed!');
    }
}

class InvalidSchemaPassedError extends Error {
    constructor() {
        super('Schema is invalid!');
    }
}

/**
 * Returns a function that will validate the Express.js {request} object against an AJV Schema.
 * @param {Object} schema
 * @returns {Function}
 */
export const validateRequest = (schema) => {
    if (!schema) throw new InvalidSchemaPassedError();

    return BaseMiddleware((request) => {
        const ajv = new AJV({ allErrors: true, removeAdditional: true });
        addErrorMessages(ajv);

        const requestProperties = Object.keys(schema);

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

/**
 * Returns the `validateRequest` function, but modifies the schema to include {additionalProperties: false}.
 * @param {Object} schema
 * @returns {Function}
 */
export const validateRequestStrict = (schema) => {
    if (!schema) throw new InvalidSchemaPassedError();

    const requestProperties = Object.keys(schema);
    requestProperties.forEach((prop) => {
        schema[prop].additionalProperties = false;
    });

    return validateRequest(schema);
};
