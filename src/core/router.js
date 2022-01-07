import { Router } from 'express';
import { options } from './application';
import validateRequest from '../middleware/validateRequest';
import logFn from './logFn';

const requestStartTime = Symbol('Determine request execution time.');

const getLog = (app, logPrefix) =>
    app[options].logging ? logFn(logPrefix) : () => {};

const init = (request, log) => {
    if (!request[requestStartTime]) {
        log(`Handling: ${request.method} - ${request.baseUrl}${request.path}`);
        request[requestStartTime] = new Date();
    }
};

const logExecutionTime = (request, log) =>
    log(`Request finished. (${new Date() - request[requestStartTime]}ms)`);

export default (wrappedFunction) => {
    const router = Router();

    const route = (config) => {
        const { path, method, schema, handler, logPrefix } = config;
        const middleware = config.middleware ?? [];

        if (!path) throw new Error('Missing "path" from route config!');
        if (!method) throw new Error('Missing "method" from route config!');
        if (!handler) throw new Error('Missing "handler" from route config!');
        if (schema) middleware.unshift(validateRequest(schema));

        middleware.forEach((fn) => {
            router[method.toLowerCase()](path, (request, response, next) => {
                const log = getLog(request.app, logPrefix);
                init(request, log);

                Promise.resolve(fn(request, response, next, log))
                    .then(next)
                    .catch(next);
            });
        });

        router[method.toLowerCase()](path, (request, response, next) => {
            const log = getLog(request.app, logPrefix);
            init(request, log);

            Promise.resolve(handler(request, response, next, log))
                .then((responseData = {}) => {
                    logExecutionTime(request, log);

                    return !response.headersSent
                        ? response.json(responseData)
                        : next();
                })
                .catch((error) => {
                    logExecutionTime(request, log);
                    return next(error);
                });
        });
    };

    wrappedFunction(route);
    return router;
};
