import userService from "../services/userService.js";

async function signUp(req, res, next) {
    const { username, email, password } = req.body;
    try {
        await userService.signUp({ username, email, password })
        return res.sendStatus(201);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const userController = {
    signUp,
};

export default userController;