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

const userService = {
    signUp,
};

export default userService;