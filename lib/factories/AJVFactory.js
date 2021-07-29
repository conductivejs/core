import AJV from 'ajv';
import addKeywords from 'ajv-keywords';
import addErrorMessages from 'ajv-errors';

export const AJVFactory = (config = {}) => {
    config.allErrors = true;

    const ajv = new AJV(config);

    addKeywords(ajv, 'instanceof');
    addErrorMessages(ajv);

    return ajv;
};
