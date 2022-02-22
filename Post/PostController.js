import {ArticlePost, MemePost, Post} from './PostModel.js'

const PostController = {
    createMeme: async (req, res) => {
        try {
            const {title, url, url_description, slug} = req.body
            if(!title || !url || !url_description, !slug) {
                return res.status(400).json({
                    success: false,
                    message: 'Not all fields have been entered.',
                    data: null
                })
            }

            const newMeme = new MemePost({
                title,
                slug,
                url,
                url_description
            })
            const savedMeme = await newMeme.save()

            return res.status(200).json({
                success: true,
                message: 'Successfully created Meme',
                data: null
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
            const {title, content, slug} = req.body
            if(!title || !content || !slug){
                return res.status(400).json({
                    success: false,
                    message: 'Not all fields have been entered.',
                    data: null
                })
            }

            const newArticle = new ArticlePost({
                title,
                content,
                slug
            })
            const savedArticle = await newArticle.save()

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
    delete: async (req, res) => {
        try {
            const result = await Post.findOneAndDelete({post_id: req.params.id}).exec()

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
            const posts = await Post.find()

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