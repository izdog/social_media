import express from "express";
import errorHandler from "../handler/errorHandler.js";
import AuthMiddleware from '../features/Auth/AuthMiddleware.js'
import PostController from '../features/Post/PostController.js'
import LikeController from "../features/Like/LikeController.js";

const postRouter = express.Router()

postRouter.route('/').get(errorHandler.catchErrors(PostController.findAll))

postRouter.route('/articles').post(AuthMiddleware.isAuth,errorHandler.catchErrors(PostController.createArticle))

postRouter.route('/:id').delete(errorHandler.catchErrors(PostController.delete))
postRouter.route('/:id/like').put(AuthMiddleware.isAuth, errorHandler.catchErrors(LikeController.like))
postRouter.route('/:id/dislike').put(AuthMiddleware.isAuth, errorHandler.catchErrors(LikeController.dislike))

export default postRouter