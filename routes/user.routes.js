import express from "express"
import {registerUser,loginUser} from '../controllers/auth.controller.js'
import validateFields from "../middleware/validate.js";

const userRouter=express.Router();
const registerFields = ["name", "email", "password"];
const loginFields = ["email", "password"];
// @route   POST /api/users/register - Register a new user
userRouter.post("/register",validateFields(registerFields),registerUser)
// @route   POST /api/users/login - Login a user and return token
userRouter.post("/login", validateFields(loginFields),loginUser)


export default userRouter;