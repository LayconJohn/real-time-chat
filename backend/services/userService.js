import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import { badRequestError, notFoundError } from "../errors/index.js";
import "../models/types/userTypes.js";

/**
 * @param {SignUpUser} user 
 * @returns {Promise<UserCreated>}
 * */
async function signUp({ username, email, password }) {
    const usernameCheck = await Users.findOne({ username });
    if (usernameCheck) {
        throw badRequestError("User already exists");
    }
    const emailCheck = await Users.findOne({ email });
    if (emailCheck) { 
        throw badRequestError("Email already exists");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const userCreated = await Users.create({ username, email, password: hashPassword });
    delete userCreated.password;
    return userCreated;
}

/**
 * @param {SignInUser} user
 * @returns {Promise<UserCreated>}
 * */
async function signIn({username, password}) {
    const user = await Users.findOne({ username: username });
    if (!user) {
        throw notFoundError("User or password incorrect");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw notFoundError("User or password incorrect");
    }
    return user;
}

/**
 * @param {SetAvatar} avatar
 * @returns {Promise<AvatarSettings>}
 * */
async function setAvatar({userId, avatarImage}) {
    const userData = await Users.findByIdAndUpdate(userId, {
        isAvatarImageSet: true,
        avatarImage: avatarImage,   
    });
    return {
        isSet: userData.isAvatarImageSet,
        image: userData.avatarImage
    }
} 

async function getAllUsers(userId) {
    const users = await Users.find({ _id: {$ne: userId} }).select([
        "email",
        "username",
        "avatarImage",
        "_id"
    ]);
    return users;
}

const userService = {
    signUp,
    signIn,
    setAvatar,
    getAllUsers
};

export default userService;