import HttpError from "../helpers/HttpError.js";

const isEmplyBody = (req, res, next) => {
  const { length } = Object.keys(req.body);
  const [methods] = Object.keys(req.route.methods);

  if (length === 0) {
    if (methods === "patch") {
      return next(HttpError(400, "missing field favorite"));
    }

    return next(HttpError(400, "missing field body"));
  }

  next();
};

export default isEmplyBody;
