import AJV from 'ajv';
import addKeywords from 'ajv-keywords';
import { Router } from 'express';
import { route } from './route';

export const BaseRouter = (wrappedFunction) => {
    const router = Router();
    const ajv = new AJV({
        allErrors: true,
        removeAdditional: 'all',
    });

    addKeywords(ajv);

    return () => {
        wrappedFunction(route(ajv, router));
        return router;
    };
};
