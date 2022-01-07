import helmet from 'helmet';
import express from 'express';

export const options = Symbol('Configure Conductive options.');

export default (config = {}) => {
    const app = express();
    app.use(helmet(config.helmet));
    app.use(express.json(config.json));

    app[options] = { logging: config.logging ?? true };

    return app;
};
