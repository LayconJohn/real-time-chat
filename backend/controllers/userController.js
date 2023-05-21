import userService from "../services/userService.js";

async function signUp(req, res, next) {
    const { username, email, password } = req.body;
    try {
        const userCreated = await userService.signUp({ username, email, password });
        return res.status(201).send(userCreated);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

async function signIn(req, res, next) {
    const { username, password } = req.body;
    try {
        const userLogged = await userService.signIn(username, password);
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
    try {
        const avatarSettings = await userService.setAvatar(userId, avatarImage);
        return res.status(201).send(avatarSettings); 
    } catch (error) {
        return res.status(404).send(error.message);
    }
}

async function getAllUsers(req, res, next) {
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