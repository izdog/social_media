import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence'


const AutoIncrement = mongooseSequence(mongoose.connection)
const options = {discriminatorKey: 'postType'}


const PostSchema = new mongoose.Schema({
    post_id: {type: Number},
    title: {type: String, required: true},
    slug: {type: String, required: true},
    tags: {type: Array},
    category: {type: String},
    created_at: {type: Date, default: Date.now()},
    updated_at: {type: Date},
    posted_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    post_likes: {type: mongoose.Schema.Types.ObjectId, ref: 'Like'}
}, options)

PostSchema.plugin(AutoIncrement, {inc_field: 'post_id'})

const Post = mongoose.model('Post', PostSchema)

const MemePostSchema = new mongoose.Schema({
    url: {type: String, required: true},
    url_description: {type: String, required: true}
}, options)

const MemePost = Post.discriminator('Meme', MemePostSchema)

const ArticlePostSchema = new mongoose.Schema({
    content: {type: String, required: true}
}, options)

const ArticlePost = Post.discriminator('Article', ArticlePostSchema)


export { ArticlePost, MemePost, Post }