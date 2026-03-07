import { signUp, signIn, verifyAccount, getMe, getAllUsers,deleteUser,updateUser } from "../controllers/user.controllers.js";
import { userValidate } from "../middleware/user.validator.js";
import { hashPass } from "../middleware/hashpass.js";
import { checkSignin } from "../middleware/checkEmail.js";
import { checkToken } from "../middleware/checkToken.js";
import { Router } from "express";
import upload from "../middleware/multer.js";
import { checkAdmin } from "../middleware/checkAdmin.js";
import { addAdmin } from "../controllers/user.controllers.js";

export const userRouter = Router();

userRouter.post("/signup", upload.single("image"), userValidate, hashPass, signUp)
userRouter.post("/signin",checkSignin,signIn)
userRouter.get("/verify/:token", verifyAccount);
userRouter.get("/me", checkToken, getMe);
userRouter.get("/all", checkToken, checkAdmin, getAllUsers);
userRouter.post("/add-admin", checkToken, checkAdmin, hashPass, addAdmin);
userRouter.delete('/:id', checkToken, checkAdmin, deleteUser);
userRouter.put("/update", checkToken, upload.single("image"), updateUser);