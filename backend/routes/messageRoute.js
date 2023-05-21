import { Router } from "express";
import messagesController from "../controllers/messagesController.js";

const router = Router();

router.post("/send-message", messagesController.sendMessage);
router.post("/get-message", messagesController.getAllMessage);

export default router;