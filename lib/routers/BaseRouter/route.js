import configSchema from '../../schemas/config.schema';
import { catchErrors } from '../../middleware';
import { validateRequest } from '../../middleware';

class ConfigValidationError extends Error {
    constructor(errors) {
        super(errors[0].message);
    }
}

export const route = (ajv, router) => (config) => {
    const isValidConfig = ajv.validate(configSchema, config);
    if (!isValidConfig) throw new ConfigValidationError(ajv.errors);

    const { path, validate, middleware, handler } = config;
    const method = config.method.toLowerCase();

    if (!!validate) {
        router[method](path, validateRequest(validate, ajv));
    }

    if (!!middleware) {
        middleware.forEach((fn) => {
            router[method](path, catchErrors(fn));
        });
    }

    router[method](
        path,
        catchErrors(async (request, response) => {
            const responseData = await handler(request);
            return response.json(responseData);
        })
    );
};
