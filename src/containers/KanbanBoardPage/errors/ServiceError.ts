import { ERROR_API_SERVICE_TYPES } from './errorTypes';

class ServiceError extends Error {
    constructor(message: string = ERROR_API_SERVICE_TYPES.INCORRECT_REQUEST) {
        super(message);
        this.name = "Service Error";
        this.cause = "Service";
    }
};

export default ServiceError;