import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 30,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        max: 50,
        min: 1
    },
    password: {
        type: String,
        required: true,
        min: 8
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false,

    },
    avatarImage: {
        type: String,
        default: ""
    }
});

const Users = mongoose.model("Users", userSchema);
export default Users;