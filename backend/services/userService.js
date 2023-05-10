import Users from "../models/userModel.js";
import bcrypt from "bcrypt";
import { badRequestError } from "../errors/index.js";

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

async function signIn({ username, password }) {
    const user = await Users.findOne({ username });
    if (!user) {
        throw badRequestError("User or password incorrect");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw badRequestError("User or password incorrect");
    }
    delete user.password;
    return user;
}

const userService = {
    signUp,
    signIn
};

export default userService;