const CustomError = require("./custom-error");

class NotFoundError extends CustomError {
  constructor() {
    super("Not found");

    this.statusCode = 404;
  }

  serializeErrors() {
    return [{ message: "Not found" }];
  }
}
module.exports = NotFoundError;
