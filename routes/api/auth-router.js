import express from "express";
import authController from "../../controllers/auth-controllers.js";
import { registerUserSchema, loginUserSchema } from "../../models/User.js";
import isEmplyBody from "../../middlewares/isEmplyBody.js";
import validateBody from "../../decorators/validateBody.js";
import isToken from "../../middlewares/isToken.js";

const authRouter = express.Router();

authRouter.post(
  "/users/register",
  isEmplyBody,
  validateBody(registerUserSchema),
  authController.creatUser
);

authRouter.post(
  "/users/login",
  isEmplyBody,
  validateBody(loginUserSchema),
  authController.loginUser
);

authRouter.post("/users/logout", isToken, authController.logoutUser);

authRouter.get("/users/current", isToken, authController.creatUser);

export default authRouter;
