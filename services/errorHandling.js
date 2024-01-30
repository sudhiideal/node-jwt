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
