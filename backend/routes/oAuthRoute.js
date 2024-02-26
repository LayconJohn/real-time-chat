import { Router } from "express"; 
import oAuthcontroller from "../controllers/oAuthController.js";

const router = Router();

router.get("/github", oAuthcontroller.signIn)

export default router;