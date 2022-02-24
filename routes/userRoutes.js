import express from "express";
import errorHandler from "../handler/errorHandler.js";
import { UserController } from '../User/UserController.js'
import AuthMiddleware from '../Auth/AuthMiddleware.js'

const userRouter = express.Router()

userRouter.route('/').get(AuthMiddleware.isAuth, AuthMiddleware.isAdmin, errorHandler.catchErrors(UserController.findAll))
// userRouter.route('/:id').get(AuthMiddleware.isAuth, AuthMiddleware.isAdmin, errorHandler.catchErrors(UserController.find))
userRouter.route('/:id').get(errorHandler.catchErrors(UserController.find))

userRouter.route('/').post(errorHandler.catchErrors(UserController.register))
userRouter.route('/create').post(AuthMiddleware.isAuth, AuthMiddleware.isAdmin, errorHandler.catchErrors(UserController.create))

userRouter.route('/:id').delete(AuthMiddleware.isAuth, AuthMiddleware.isAdmin, errorHandler.catchErrors(UserController.delete))

export default userRouter