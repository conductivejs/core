import { GenericError } from '../errors';

export default (request) => {
    throw new GenericError(404, `Invalid path: ${request.path}`);
};
