import configSchema from '../../schemas/core/configSchema';
import { catchErrors } from '../../middleware';
import { validateRequest } from '../../middleware';

export const route = (ajv, router) => (config) => {
    const isValidConfig = ajv.validate(configSchema, config);
    if (!isValidConfig) throw new Error('Invalid route config!');

    const { path, validate, middleware, handler } = config;
    const method = config.method.toLowerCase();

    !!validate && router[method](path, validateRequest(validate, ajv));

    !!middleware &&
        middleware.forEach((fn) => {
            router[method](path, catchErrors(fn));
        });

    router[method](path, catchErrors(handler));
};
