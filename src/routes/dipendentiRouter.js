import { Router } from "express";
import {
    getDipendenti,
    getDipendente,
    updateDipendente,
    insertDipendente,
    deleteDipendente
} from "../controllers/dipendentiController.js";

const router = Router();

router.get("/", getDipendenti);
router.get("/:uuid_dipendente", getDipendente);
router.post("/", insertDipendente);
router.put("/:uuid_dipendente", updateDipendente);
router.delete("/:uuid_dipendente", deleteDipendente);

export default router;