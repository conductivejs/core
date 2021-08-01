export const BaseMiddleware = (fn) => (request, response, next) => {
    if (next) {
        return Promise.resolve(fn(request, response, () => {}))
            .then(next)
            .catch(next);
    } else {
        return Promise.resolve(fn(request, response, () => {}));
    }
};
