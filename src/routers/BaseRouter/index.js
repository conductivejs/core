import { Router } from 'express';
import { route } from './route';

export const BaseRouter = (wrappedFunction) => {
    const router = Router();

    return () => {
        wrappedFunction(route(ajvForConfig, router));
        return router;
    };
};
