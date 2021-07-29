import AJV from 'ajv';
import addKeywords from 'ajv-keywords';
import addErrorMessages from 'ajv-errors';

import { Router } from 'express';
import { route } from './route';

export const BaseRouter = (wrappedFunction) => {
    const router = Router();
    const ajv = new AJV({
        allErrors: true,
        removeAdditional: 'all',
    });

    addKeywords(ajv, 'instanceof');
    addErrorMessages(ajv, { singleError: true });

    return () => {
        wrappedFunction(route(ajv, router));
        return router;
    };
};
