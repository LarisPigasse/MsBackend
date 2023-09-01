import { Router } from "express";
import { infoApi } from "../controllers/indexController.js";

const router = Router();

router.get("/", ({req, res}) => {
    res.json({ message: "Info API" })
})

router.get("/info-api", infoApi);

export default router;
