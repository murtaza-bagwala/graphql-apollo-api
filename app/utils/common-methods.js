class CommonMethods {
  static successResponse(status, code, message, data) {
    return {
      status,
      code,
      message,
      data,
    };
  }
}

module.exports = CommonMethods;
