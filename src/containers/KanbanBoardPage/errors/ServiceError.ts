class ServiceError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Service Error";
        this.cause = "Service";
    }
};

export default ServiceError;