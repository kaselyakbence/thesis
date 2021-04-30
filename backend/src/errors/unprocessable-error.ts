import { CustomError } from "./custom-error";

interface Error {
  field: string;
  message: string;
}

export class UnprocessableError extends CustomError {
  statusCode = 422;

  constructor(public errors: Error[] | Error) {
    super("Unprocessable error");

    Object.setPrototypeOf(this, UnprocessableError.prototype);
  }

  serializeErrors() {
    return Array.isArray(this.errors) ? this.errors : [this.errors];
  }
}
