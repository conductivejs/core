import { GenericError } from './errors/GenericError';

export const errorHandler = (error, request, response, next) => {
    let status = 500;
    let message = 'An internal error has occurred!';

    if (error instanceof GenericError) {
        status = error['status'];
        message = error['message'];
    } else {
        console.error(error);
    }

    response.status(status).json({ error: message });
};
