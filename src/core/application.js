import cors from 'cors';
import helmet from 'helmet';
import express from 'express';

export const options = Symbol('Configure Conductive options.');

export default (config = {}) => {
    const {
        cors: corsConfig,
        helmet: helmetConfig,
        json: jsonConfig,
        logging,
    } = config;

    const app = express();

    app.use(cors(corsConfig));
    app.use(helmet(helmetConfig));
    app.use(express.json(jsonConfig));

    app[options] = { logging: logging ?? true };

    return app;
};
