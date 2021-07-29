import cors from 'cors';
import express from 'express';

export const application = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    return app;
};
