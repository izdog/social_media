import User from '../User/UserModel.js'
import {ArticlePost, MemePost, Post} from './PostModel.js'
import Like from '../Like/LikeModel.js'

const PostController = {
    createMeme: async (req, res) => {
        try {
            const user = req.user ? req.user : null
            const newMeme = new MemePost({
                ...req.body,
                url: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`,
                posted_by: user
                
            })
            const savedMeme = await newMeme.save()
            const newLikes = new Like({
                post_id: savedMeme._id
            })

            const savedLikes = await newLikes.save()
            await User.findOneAndUpdate({_id: req.user._id}, {$push: {posts: savedMeme._id}})
            await Post.findOneAndUpdate({_id: savedMeme._id}, {post_likes: savedLikes._id})


            return res.status(200).json({
                success: true,
                message: 'Successfully created Meme',
                data: savedMeme
            })

        } catch(err) {
            console.error(err.message)
            return res.status(500).json({
                success: false,
                message: 'Oops somethings goes wrong.',
                data: null
            })
        }
    },
    createArticle: async (req, res) => {
        try {
            
            const user = req.user ? req.user : null
            const {title, content, slug } = req.body
            if(!title || !content || !slug || !user){
                return res.status(400).json({
                    success: false,
                    message: 'Not all fields have been entered.',
                    data: null
                })
            }

            const newArticle = new ArticlePost({
                title,
                content,
                slug,
                posted_by: user._id
            })
            
            const savedArticle = await newArticle.save()
            const newLike = new Like({
                post_id: savedArticle._id
            })

            const savedLike = await newLike.save()

            await User.findOneAndUpdate({_id: req.user._id}, {$push: {posts: savedArticle._id}})
            await Post.findOneAndUpdate({_id: savedArticle._id}, {post_likes: savedLike._id})

            return res.status(200).json({
                success: true,
                message: 'Article successfully created',
                data: savedArticle
            })

        } catch(err) {
            console.error(err.message)
            return res.status(500).json({
                success: false,
                message: 'Oops somethings goes wrong.',
                data: null
            })
        }
    },
    updateMeme: async (req, res) => {
        try {
            let filter
            if(req.user.userType === 'user'){
                filter = {
                    post_id: req.params.id,
                    posted_by: req.user._id
                }
            } else {
                filter = {post_id: req.params.id}
            }
            const memeObject = req.file ? {
                ...req.body,
                url: `${req.protocol}://${req.get('host')}/public/images/${req.file.filename}`,
                updated_at: Date.now()
            } : {
                ...req.body,
                updated_at: Date.now()
            }
            
            const result = await MemePost.findOneAndUpdate(
                filter,
                memeObject,
                {returnOriginal: false}
            )
            if(!result){
                return res.status(404).json({
                    success: false,
                    message: `No document found by this id ${req.params.id}`,
                    data: null
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Document has been modified',
                data: result
            })

        } catch(err) {
            console.error(err.message)
            return res.status(500).json({
                success: false,
                message: 'Oops something goes wrong.',
                data: null
            })
        }
    },
    updateArticle: async (req, res) => {
        try {
            let filter
            if(req.user === 'user'){
                filter = {
                    post_id: req.params.id,
                    posted_by: req.user._id
                }
            } else {
                filter = { post_id: req.params.id}
            }

            const result = await ArticlePost.findOneAndUpdate(
                filter, 
                {...req.body, updated_at: Date.now()},
                {returnOriginal: false}
            )
            if(!result){
                return res.status(404).json({
                    success: false,
                    message: `No document found by this id ${req.params.id}`,
                    data: null
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Document has been modified',
                data: result
            })
        } catch(err) {
            console.error(err.message)
            return res.status(500).json({
                success: false,
                message: 'Oops something goes wrong.',
                data: null
            })
        }
    },
    delete: async (req, res) => {
        try {
            let filter
            if(req.user.userType === 'user'){
                filter = {
                    post_id: req.params.id,
                    posted_by: req.user._id
                }
            } else {
                filter = {
                    post_id: req.params.id
                }
            }

            const result = await Post.findOneAndDelete(filter).exec()

            if(!result){
                return res.status(404).json({
                    success: false,
                    message: `No document found by this id ${req.params.id}`,
                    data: null
                })
            }

            return res.status(200).json({
                success: true,
                message: `Successfully deleted the document`,
                data: null
            })
        } catch(err) {
            console.error(err.message)
            return res.status(500).json({
                success: false,
                message: 'Oops something goes wrong.',
                data: null
            })
        }
    },
    findAll: async (req, res) => {
        try {
            const posts = await Post.find({})
                .populate('posted_by', 'firstname lastname user_id _id email')
                .populate('post_likes')
                .populate('comments')
                .sort({created_at: -1})
            
            if(posts.length === 0){
                return res.status(404).json({
                    success: false,
                    message: 'No documents found',
                    data: null
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Here a list of the documents found',
                data: posts
            })
        } catch(err) {
            console.error(err.message)
            return res.status(500).json({
                success: false,
                message: 'Oops something goes wrong.',
                data: null
            })
        }
    }
}

export default PostController