const CustomError = require("./custom-error");

class RequestValidationError extends CustomError {
  constructor(errors) {
    super("Invalid request");
    this.statusCode = 400;
    this.errors = errors;
  }

  serializeErrors() {
    return this.errors.map((error) => {
      return { message: error.msg, field: error.param };
    });
  }
}
module.exports = RequestValidationError;
