import { GenericError } from '../errors';

// eslint-disable-next-line no-unused-vars
export default ({ method, path }, response) => {
    throw new GenericError(404, `Invalid endpoint: ${method} - ${path}`);
};
