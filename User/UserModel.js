import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence'

const { Schema } = mongoose
const AutoIncrement = mongooseSequence(mongoose.connection)

const UserSchema = new mongoose.Schema({
    user_id: {type: Number},
    firstname: {type: String},
    lastname: {type: String},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    userType: {type: String, enum: ['user', 'admin'], default: 'user'},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
})

UserSchema.plugin(AutoIncrement, {inc_field: 'user_id'})

export default mongoose.model('User', UserSchema)