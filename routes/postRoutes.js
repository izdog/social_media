import express from "express";
import errorHandler from "../handler/errorHandler.js";
import AuthMiddleware from '../Auth/AuthMiddleware.js'
import PostController from '../Post/PostController.js'

const postRouter = express.Router()

postRouter.route('/').get(PostController.findAll)

postRouter.route('/articles').post(PostController.createArticle)

postRouter.route('/:id').delete(PostController.delete)

export default postRouter