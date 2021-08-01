import AJV from 'ajv';
import addKeywords from 'ajv-keywords';
import addErrorMessages from 'ajv-errors';

import { Router } from 'express';
import { route } from './route';

export const BaseRouter = (wrappedFunction) => {
    const router = Router();

    const ajvForConfig = new AJV({ allErrors: true });

    addKeywords(ajvForConfig);
    addErrorMessages(ajvForConfig);

    return () => {
        wrappedFunction(route(ajvForConfig, router));
        return router;
    };
};
