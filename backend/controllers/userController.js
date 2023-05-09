import userService from "../services/userService.js";

async function signUp(req, res, next) {
    const { username, email, password } = req.body;
    try {
        const userCreated = await userService.signUp({ username, email, password })
        return res.status(201).send(userCreated);
    } catch (error) {
        return res.status(400).send(error.message);
    }
}

const userController = {
    signUp,
};

export default userController;