import express from "express";
import { AuthController } from "../features/Auth/AuthController.js";
import errorHandler from "../handler/errorHandler.js";

const authRouter = express.Router()

authRouter.route('/login').post(errorHandler.catchErrors(AuthController.login))
authRouter.route('/logout')


export default authRouter

