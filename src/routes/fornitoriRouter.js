import { Router } from "express";
import {
    getFornitori,
    getFornitore,
    updateFornitore,
    insertFornitore,
    deleteFornitore
} from "../controllers/fornitoriController.js";

const router = Router();

router.get("/", getFornitori);
router.get("/:uuid_fornitore", getFornitore);
router.post("/", insertFornitore);
router.put("/:uuid_fornitore", updateFornitore);
router.delete("/:uuid_fornitore", deleteFornitore);

export default router;