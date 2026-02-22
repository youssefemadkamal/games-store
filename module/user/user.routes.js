import { signUp } from "./user.controllers.js";
import { signIn } from "./user.controllers.js";
import { userValidate } from "../../middleware/user.validator.js";
import { hashPass } from "../../middleware/hashpass.js";
import { checkSignin } from "../../middleware/checkEmail.js";
import { Router } from "express";

export const userRouter = Router();

userRouter.post("/signup",userValidate,hashPass,signUp)
userRouter.post("/signin",checkSignin,signIn)