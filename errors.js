export class ValidationError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.code = statusCode;
  }
}
