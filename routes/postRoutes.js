import express from "express";
import errorHandler from "../handler/errorHandler.js";
import AuthMiddleware from '../features/Auth/AuthMiddleware.js'
import PostController from '../features/Post/PostController.js'
import LikeController from "../features/Like/LikeController.js";
import multer from '../features/Post/PostMiddleware.js'


const postRouter = express.Router()

postRouter.route('/').get(errorHandler.catchErrors(PostController.findAll))

postRouter.route('/articles').post(AuthMiddleware.isAuth, errorHandler.catchErrors(PostController.createArticle))
postRouter.route('/memes').post(AuthMiddleware.isAuth, multer,errorHandler.catchErrors(PostController.createMeme))

postRouter.route('/articles/:id').put(AuthMiddleware.isAuth, errorHandler.catchErrors(PostController.updateArticle))
postRouter.route('/meme/:id').put(AuthMiddleware.isAuth, errorHandler.catchErrors(PostController.updateMeme))

postRouter.route('/:id/like').put(AuthMiddleware.isAuth, errorHandler.catchErrors(LikeController.like))
postRouter.route('/:id/dislike').put(AuthMiddleware.isAuth, errorHandler.catchErrors(LikeController.dislike))

postRouter.route('/:id').delete(errorHandler.catchErrors(PostController.delete))
export default postRouter