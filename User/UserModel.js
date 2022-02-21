import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {type: String},
    lastname: {type: String},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true, lowercase: true},
    userType: {type: String, enum: ['user', 'admin'], default: 'user'}
})

export default mongoose.model('User', UserSchema)