import { Router } from 'express';
import validateRequest from '../middleware/validateRequest';

const requestStart = Symbol('Determine request execution time.');

const startRequestTimer = (response) => {
    if (!response.locals[requestStart])
        response.locals[requestStart] = new Date();
};

const setupMiddleware = (fn, logFn) => (request, response, next) => {
    startRequestTimer(response);
    Promise.resolve(fn(request, response, next, logFn)).then(next).catch(next);
};

const setupHandler = (fn, logFn) => (request, response, next) => {
    startRequestTimer(response);

    Promise.resolve(fn(request, response, next, logFn))
        .then((responseData = {}) => {
            const executionTime = new Date() - response.locals[requestStart];
            logFn(`Request Finished. (${executionTime}ms)`);

            if (response.headersSent) return next();
            return response.json(responseData);
        })
        .catch(next);
};

export default (wrappedFunction) => {
    const router = Router();

    const route = (config) => {
        const { path, method, schema, handler, logPrefix } = config;
        const middleware = config.middleware ?? [];

        if (!path) throw new Error('Missing "path" from route config!');
        if (!method) throw new Error('Missing "method" from route config!');
        if (!handler) throw new Error('Missing "handler" from route config!');
        if (schema) middleware.unshift(validateRequest(schema));

        const log = (message) =>
            // eslint-disable-next-line no-console
            console.log(`${logPrefix || 'Conductive'}: ${message}`);

        middleware.map((fn) => router[method](path, setupMiddleware(fn, log)));
        router[method](path, setupHandler(handler, log));
    };

    wrappedFunction(route);
    return router;
};
