import { Schema, model } from "mongoose";
import Joi from "joi";

const patternEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

export const registerUserSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": `missed required password field`,
  }),
  email: Joi.string().pattern(patternEmail).required().messages({
    "any.required": `missed required email field`,
  }),
});

export const loginUserSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "any.required": `missed required password field`,
  }),
  email: Joi.string().pattern(patternEmail).required().messages({
    "any.required": `missed required email field`,
  }),
});

const User = model("user", userSchema);

export default User;
