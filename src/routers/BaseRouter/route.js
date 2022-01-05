import configSchema from '../../schemas/config.schema';
import { validateRequest, validateRequestStrict } from '../../middleware';

class ConfigValidationError extends Error {
    constructor(errors) {
        super(errors[0].message);
    }
}

export const route = (ajv, router) => (config) => {
    const isValidConfig = ajv.validate(configSchema, config);
    if (!isValidConfig) throw new ConfigValidationError(ajv.errors);

    const { path, validation, strictValidation, middleware, handler } = config;

    const method = config.method.toLowerCase();

    if (!!validation) {
        router[method](path, validateRequest(validation));
    }

    if (!!strictValidation) {
        router[method](path, validateRequestStrict(strictValidation));
    }

    if (!!middleware) {
        middleware.forEach((fn) => {
            router[method](path, fn);
        });
    }

    router[method](path, async (request, response, next) => {
        const responseData = await Promise.resolve(handler(request, response, () => {})).catch(next);

        if (!response.headersSent) {
            return response.json(responseData);
        }
    });
};
