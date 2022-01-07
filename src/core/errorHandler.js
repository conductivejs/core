import { options } from './application';
import { GenericError } from '../errors';

export default (error, request, response, next) => {
    if (response.headersSent) return next(error);

    let status = 500;
    let messages = ['An internal error has occurred!'];

    const friendly = Array.isArray(error)
        ? error.every((err) => err instanceof GenericError)
        : error instanceof GenericError;

    if (friendly) {
        const statusCodes = Array.isArray(error)
            ? error.map(({ statusCode }) => statusCode)
            : [error.statusCode];

        status = statusCodes.every((code) => code === statusCodes[0])
            ? statusCodes[0]
            : 418;

        messages = Array.isArray(error)
            ? error.map(({ message }) => message)
            : [error.message];
    }

    if (!friendly && request.app[options].logging) {
        // eslint-disable-next-line no-console
        console.error(error);
    }

    return response.status(status).json({ errors: messages });
};
