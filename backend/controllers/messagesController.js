import messageService from "../services/messageService.js";


async function sendMessage(req, res) {
        const { from, to, message } = req.body;
    try {
        const data = await messageService.sendMessage({ from, to, message });
        return res.status(201).send(data);
    } catch (error) {
        return res.status(400).send("Error to send message: " + error.message)
   } 
}

const messagesController = {
    sendMessage,
}

export default messagesController;