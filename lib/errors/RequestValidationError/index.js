import { GenericError } from '../GenericError';

// TODO: Accept AJV errors.
export class RequestValidationError extends GenericError {
    constructor() {
        super(401, 'Request validation failed!');
    }
}
