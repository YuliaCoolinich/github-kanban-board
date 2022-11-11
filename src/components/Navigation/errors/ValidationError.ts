class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "Validation Error";
        this.cause = "Validation";
    }
};

export default ValidationError;