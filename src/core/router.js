import { Router } from 'express';
import validateRequest from '../middleware/validateRequest';

export default (wrappedFunction) => {
    const expressRouter = Router();

    const route = (config) => {
        const { path, method, schema, handler } = config;
        const middleware = config.middleware ?? [];
        const httpMethod = method.toLowerCase();

        if (!path) throw new Error('Missing "path" from route config!');
        if (!method) throw new Error('Missing "method" from route config!');
        if (!handler) throw new Error('Missing "handler" from route config!');
        if (schema) middleware.unshift(validateRequest(schema));

        middleware.forEach((fn) => {
            expressRouter[httpMethod](path, (request, response, next) => {
                Promise.resolve(fn(request, response, next))
                    .then(next)
                    .catch(next);
            });
        });

        expressRouter[httpMethod](path, (request, response, next) => {
            Promise.resolve(handler(request, response, next))
                .then((responseJSON = {}) => {
                    if (response.headersSent) return next();
                    return response.json(responseJSON);
                })
                .catch(next);
        });
    };

    wrappedFunction(route);
    return expressRouter;
};
