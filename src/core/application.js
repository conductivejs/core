import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import logFn from './logFn';

export const options = Symbol('Configure Conductive options.');

export default (config = {}) => {
    const app = express();

    app[options] = {
        logging: config.logging ?? true,
    };

    if (app[options].logging) {
        const log = logFn('Conductive');

        const logCORS = (request, response, next) => {
            const method =
                request.method &&
                request.method.toUpperCase &&
                request.method.toUpperCase();

            if (method === 'OPTIONS') {
                log('Handling CORS request...');
            }

            next();
        };

        app.use(logCORS);
    }

    app.use(cors(config.cors));
    app.use(helmet(config.helmet));
    app.use(express.json(config.json));

    return app;
};
