import configSchema from '../../schemas/config.schema';
import { validateRequest } from '../../middleware';
import { BaseMiddleware } from '../../middleware/BaseMiddleware';

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
        router[method](path, validateRequest(validate));
    }

    if (!!middleware) {
        middleware.forEach((fn) => {
            router[method](path, fn);
        });
    }

    router[method](path, async (request, response, next) => {
        const responseData = await Promise.resolve(handler(request, response, () => {})).catch(next);

        if (!response.headersSent) {
            // TODO: probably more checks here.
            return response.json(responseData); // TODO: Check data type and set status.
        }
    });
};
