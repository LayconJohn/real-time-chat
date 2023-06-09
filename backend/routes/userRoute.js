import { Router } from "express"
import userController from "../controllers/userController.js"

const router = Router();

router.post("/sign-up", userController.signUp);
router.post("/sign-in", userController.signIn);
router.post("/set-avatar/:id", userController.setAvatar);
router.get("/all-users/:id", userController.getAllUsers);

export default router;