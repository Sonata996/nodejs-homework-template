import jwt from "jsonwebtoken";

import HttpError from "../helpers/HttpError.js";

import User from "../models/User.js";

const { JWT_SECRET } = process.env;

const isToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer, token] = authorization.split(" ");
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const result = await User.findById(id);

    if (!result || !result.token) {
      return next(HttpError(401), "Not authorized1");
    }

    req.user = result;
    next();
  } catch (error) {
    console.log(error);
    next(HttpError(401, "Not authorized"));
  }
};

export default isToken;
