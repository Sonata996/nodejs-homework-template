import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";
import User from "../models/User.js";
dotenv.config();

const { JWT_SECRET } = process.env;

const isToken = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  if (!authorization) {
    return next(HttpError(401, "Not authorized"));
  }

  const [bearer] = authorization.split(" ");
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const result = await User.findById(id);
    if (!result || result.token || result.token !== token) {
      return next(HttpError(401), "Not authorized");
    }
    console.log(result.token);

    req.user = result;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

export default isToken;
