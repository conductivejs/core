import { catchErrors } from './catchErrors';
import { RequestValidationError } from '../../errors';
import { AJVFactory } from '../../factories/AJVFactory';

export const validateRequest = (schema) => {
    if (!schema) throw new Error('Schema must be passed!');

    return catchErrors((request, response, next) => {
        const ajv = AJVFactory();
        const requestProperties = Object.keys(schema); // body, header, etc.

        requestProperties.forEach((property) => {
            const dataForProperty = request[property];
            const schemaForProperty = schema[property];

            if (!ajv.validate(schemaForProperty, dataForProperty)) {
                throw new RequestValidationError();
            }
        });

        next();
    });
};
