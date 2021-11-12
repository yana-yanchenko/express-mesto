module.exports = class ApiError extends Error {
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(404, 'not found');
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }
};
