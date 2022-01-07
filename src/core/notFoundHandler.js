import { GenericError } from '../errors';

export default ({ method, path }) => {
    throw new GenericError(404, `Invalid endpoint: ${method} - ${path}`);
};
