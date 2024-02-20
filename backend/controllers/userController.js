import userService from "../services/userService.js";
import "../models/types/userTypes.js";
import { Request, Response } from "express";

async function signUp(req, res, next) {
    const { username, email, password } = req.body;
    /**@type {SignUpUser} */
    const user = { username, email, password };
    
    try {
        const userCreated = await userService.signUp(user);
        return res.status(201).send(userCreated);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

async function signIn(req, res, next) {
    const { username, password } = req.body;
        /**@type {SignInUser} */
        const user = { username, password };
    try {
        const userLogged = await userService.signIn(user);
        return res.status(200).send(userLogged);
    } catch (error) {
        if (error.name === "NotFoundError") {
            return res.status(404).send(error.message);
        }
        return res.status(400).send(error);
    }
}

async function setAvatar(req, res, next) {  
    const userId = req.params.id;
    const avatarImage = req.body.image;

    /**@type {SetAvatar} */
    const avatar = {userId, avatarImage};
    try {
        const avatarSettings = await userService.setAvatar(avatar);
        return res.status(201).send(avatarSettings); 
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

async function getAllUsers(req, res, next) {
    /**@type {UserId} */
    const userId = req.params.id;
    try {
        const users = await userService.getAllUsers(userId);
        return res.status(200).send(users);
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

const userController = {
    signUp,
    signIn,
    setAvatar,
    getAllUsers,
};

export default userController;