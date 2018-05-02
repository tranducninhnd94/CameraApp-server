class SuccessResponse {
    constructor(result, message, value) {
        this.result = result;
        this.message = message;
        this.value = value;
    }
}

class ErrorResponse {
    constructor(result, message, error) {
        this.result = result;
        this.message = message;
        this.error = error;
    }
}

const StandardResponse = { SuccessResponse, ErrorResponse };

module.exports = StandardResponse;
