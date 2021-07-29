import { Router } from 'express';
import { route } from './route';
import { AJVFactory } from '../../factories/AJVFactory';

export const BaseRouter = (wrappedFunction) => {
    const router = Router();
    const ajv = AJVFactory({ removeAdditional: true });

    return () => {
        wrappedFunction(route(ajv, router));
        return router;
    };
};
