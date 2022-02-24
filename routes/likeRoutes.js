import express from "express";
import AuthMiddleware from "../Auth/AuthMiddleware.js";
import errorHandler from "../handler/errorHandler.js";
import LikeController from "../Like/LikeController.js";

const likeRouter = express.Router()

likeRouter.route('/like').put(AuthMiddleware.isAuth, LikeController.like)

export default likeRouter