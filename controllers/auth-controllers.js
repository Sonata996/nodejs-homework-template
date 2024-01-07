import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import HttpError from "../helpers/HttpError.js";

const { JWT_SECRET } = process.env;

const creatUser = async (req, res, next) => {
  const { email, password } = req.body;
  const userTransfer = await User.findOne({ email });

  if (userTransfer) {
    return next(HttpError(409, "Such an email is already registered"));
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({ ...req.body, password: hashPassword });

  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email });

  if (!findUser) {
    return next(HttpError(401, "Email or password is wrong"));
  }

  const subscription = findUser.subscription;
  const comparePassword = await bcrypt.compare(password, findUser.password);
  if (!comparePassword) {
    return next(HttpError(401, "Email or password is wrong"));
  }

  const { _id: id } = findUser;
  const payload = {
    id,
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  await User.findByIdAndUpdate(findUser.id, { token });

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const logoutUser = async (req, res, next) => {
  const { _id } = req.user;
  if (!_id) {
    return next(HttpError(401, "Not authorized"));
  }

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json();
};

const currentUser = async (req, res) => {
  const { email, subscription } = req.user;
  console.log(email, subscription);
  res.json({
    email,
    subscription,
  });
};

export default {
  creatUser,
  loginUser,
  logoutUser,
  currentUser,
};
