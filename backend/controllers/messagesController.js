import messageService from "../services/messageService.js";


async function sendMessage(req, res, next) {
        const { from, to, message } = req.body;
    try {
        const data = await messageService.sendMessage({ from, to, message });
        return res.status(201).send(data);
    } catch (error) {
        return res.status(400).send("Error to send message: " + error.message)
   } 
}

async function getAllMessage(req, res, next) {
    const { from, to } = req.body;
    try {
        const messages = await messageService.getAllMessage({ from, to });
        return res.status(200).send(messages);
    } catch (error) {
        return res.status(400).send("Error to get messages: " + error.message)
    }
}

const messagesController = {
    sendMessage,
    getAllMessage,
}

export default messagesController;