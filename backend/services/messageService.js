import Messages from "../models/messageModel.js";
import { badRequestError, notFoundError } from "../errors/index.js";

async function sendMessage( {from, to, message} ) {
    const data = await Messages.create({
        message: { text: message },
        users: [from, to],
        sender: from
    });
    if (data) return {message: "Message addedd successfully"};
    throw badRequestError("Failed to send message to database");
}

async function getAllMessage({ from, to }) {
    const messages = await Messages.find({
        users: {
            $all: [from, to],
        },
    }).sort({updatedAt: 1});

    const chatMessages = messages.map(msg => {
        return {
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text.toString() === to
        };
    });
    return chatMessages;
}

const messageService = {
    sendMessage,
    getAllMessage,
}
export default messageService;