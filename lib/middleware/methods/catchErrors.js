export const catchErrors = (fn) => (request, response, next) => {
    return Promise.resolve(fn(request, response, next)).catch(next);
};
