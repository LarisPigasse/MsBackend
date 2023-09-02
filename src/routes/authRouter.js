import { Router } from "express";

import { generaToken, login, profilo } from '../controllers/authController.js';
import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.get("/genera-token", generaToken);
router.post("/login", login);
router.post("/profilo", checkAuth, profilo);

export default router