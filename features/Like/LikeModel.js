import mongoose from 'mongoose';

const LikeSchema = new mongoose.Schema({
    userLikes: {type: Array},
    userDislikes: {type: Array},
    post_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
})

export default mongoose.model('Like', LikeSchema)