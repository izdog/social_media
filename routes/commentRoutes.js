import express from "express";
import AuthMiddleware from "../features/Auth/AuthMiddleware.js";
import errorHandler from "../handler/errorHandler.js";
import CommentController from "../features/Comment/CommentController.js";


const commentRouter = express.Router()

commentRouter.route('/').post(AuthMiddleware.isAuth, errorHandler.catchErrors(CommentController.create))
commentRouter.route('/:id').delete(AuthMiddleware.isAuth)


export default commentRouter