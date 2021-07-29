import { catchErrors } from './catchErrors';
import { RequestValidationError } from '../../errors';

export const validateRequest = (schema, ajv) => {
    // TODO: Validate parameters. Generate AJV if none provided.

    return catchErrors((request, response, next) => {
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
