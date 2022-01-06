import cors from 'cors';
import express from 'express';

export default () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    return app;
};
