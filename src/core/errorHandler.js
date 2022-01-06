import GenericError from '../errors/GenericError';

export default (error, request, response, next) => {
    if (response.headersSent) return next(error);

    const status = error.status ?? 500;
    const message = error.message ?? 'An internal error has occurred.';

    if (!(error instanceof GenericError)) {
        // eslint-disable-next-line no-console
        console.error(error.message);
    }

    return response.status(status).json({ error: message });
};
