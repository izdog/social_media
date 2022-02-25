import Comment from './CommentModel.js'
import { Post }  from '../Post/PostModel.js'

const CommentController = {
    create: async (req, res) => {
        try {
            const {content, user_id, post_id} = req.body
            if(!content || !user_id || !post_id){
                return res.status(400).json({
                    success: false,
                    message: 'Not all fields have been entered.',
                    data: null
                })
            }
            const newComment = new Comment({
                content,
                commented_by: user_id,
                post_commented: post_id
            })
            const savedComment = await newComment.save()

            await Post.findOneAndUpdate({_id: post_id}, {$push: {comments: savedComment._id} })

            return res.status(200).json({
                success: true,
                message: 'Document have been created',
                data: savedComment
            })

        } catch(err){
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Oops somethings went wrong.',
                data: null
            })
        }
    },
    findAllByPostId: async (req, res) => {
        try {
            const { post_id } = req.params
            const comments = await Comment.find({post_commented: post_id}).populate('commented_by')
            if(comments.length === 0){
                return res.status(404).json({
                    success: false,
                    message: 'No documents found',
                    data: null
                })
            }

            return res.status(200).json({
                success: true,
                message: 'Here is a list of document found',
                data: comments
            })
        } catch(err) {
            console.log(err)
            return res.status(500).json({
                success: false,
                message: 'Oops somethings went wrong.',
                data: null
            })
        }
    }
}

export default CommentController