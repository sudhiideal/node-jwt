class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

export const errorHandling = (error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json({ error: error.message || "An unknown error occured" });
};

export const routeErrorHandler = (req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  return next(error);
};

export const commonErrorHandler = (message, code) => {
  return new HttpError(message, code);
};

export const getErrorMessage = ({ errors }) => {
  const errorFields = errors.map((error) => error.param).join();
  return `Invalid input for fields ${errorFields}`;
};
