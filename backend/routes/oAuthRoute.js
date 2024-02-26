import { Router } from "express"; 
import oAuthcontroller from "../controllers/oAuthController.js";

const router = Router();

router.get("/github", oAuthcontroller.signIn);
router.get("/me", oAuthcontroller.getMe);

export default router;