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

const messageService = {
    sendMessage,
}
export default messageService;