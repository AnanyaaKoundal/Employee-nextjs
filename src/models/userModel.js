import mongoose from 'mongoose'

const userSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a username"],
    },
    email: {
        type: String,
        required: [true, "Please provide a password"]
    },
    DOB:{
        type: Date,
        required: true,
    },
    mobile:{
        type: Number,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    coverImage:{
        type: String
    },
    isVerified: {
        type:Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
