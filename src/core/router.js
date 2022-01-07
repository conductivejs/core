import { Router } from 'express';
import { options } from './application';
import validateRequest from '../middleware/validateRequest';

const requestStart = Symbol('Determine request execution time.');

const startRequestTimer = (response) => {
    if (!response.locals[requestStart])
        response.locals[requestStart] = new Date();
};

const setupMiddleware = (fn, logFn) => (request, response, next) => {
    startRequestTimer(response);
    const log = request.app[options].logging ? logFn : () => {};

    Promise.resolve(fn(request, response, next, log)).then(next).catch(next);
};

const setupHandler = (fn, logFn) => (request, response, next) => {
    startRequestTimer(response);
    const log = request.app[options].logging ? logFn : () => {};

    Promise.resolve(fn(request, response, next, log))
        .then((responseData = {}) => {
            const executionTime = new Date() - response.locals[requestStart];
            log(`Request Finished. (${executionTime}ms)`);

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

        middleware.forEach((fn) =>
            router[method.toLowerCase()](path, setupMiddleware(fn, log))
        );

        router[method.toLowerCase()](path, setupHandler(handler, log));
    };

    wrappedFunction(route);
    return router;
};
