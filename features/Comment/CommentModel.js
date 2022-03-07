import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    content: {type: String, required: true},
    created_at: {type: Date, default: Date.now()},
    updatet_ad: {type: Date},
    commented_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post_commented: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    replies: [{
        content: {type: String, required: true},
        created_at: {type: Date, default: Date.now},
        updatet_ad: {type: Date},
        replied_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    }]
})


export default mongoose.model('Comment', CommentSchema)