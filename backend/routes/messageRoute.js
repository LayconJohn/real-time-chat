import { Router } from "express";
import messagesController from "../controllers/messagesController.js";

const router = Router();

router.post("/send-message", messagesController.sendMessage);

export default router;