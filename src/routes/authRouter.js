import { Router } from "express";

import {
    login,
    generaToken,
} from "../controllers/utentiController.js";

const router = Router();

router.get("/genera-token", generaToken);
router.post("/login", login);

export default router