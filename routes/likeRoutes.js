import express from "express";
import AuthMiddleware from "../features/Auth/AuthMiddleware.js";
import errorHandler from "../handler/errorHandler.js";
import LikeController from "../features/Like/LikeController.js";

const likeRouter = express.Router()

likeRouter.route('/like').put(AuthMiddleware.isAuth, errorHandler.catchErrors(LikeController.like))
likeRouter.route('/dislike').put(AuthMiddleware.isAuth, errorHandler.catchErrors(LikeController.dislike))

export default likeRouter