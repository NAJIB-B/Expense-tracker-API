class AppError extends Error {
  constructor(error, statusCode) {
    super()

    this.message = error,
      this.statusCode = statusCode
  }
}

module.exports = AppError
