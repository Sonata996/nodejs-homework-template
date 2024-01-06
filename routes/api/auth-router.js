import express from "express";
import authController from "../../controllers/auth-controllers.js";
import { registerUserSchema, loginUserSchema } from "../../models/User.js";
import isEmplyBody from "../../middlewares/isEmplyBody.js";
import validateBody from "../../decorators/validateBody.js";
import isToken from "../../middlewares/isToken.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  isEmplyBody,
  validateBody(registerUserSchema),
  authController.creatUser
);

authRouter.post(
  "/login",
  isEmplyBody,
  validateBody(loginUserSchema),
  authController.loginUser
);

authRouter.post("/logout", isToken, authController.logoutUser);

authRouter.get("/current", isToken, authController.currentUser);

export default authRouter;
