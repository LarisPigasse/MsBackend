import { Router } from "express";
import {
    getContatti,
    getContatto,
    updateContatto,
    insertContatto,
    deleteContatto
} from "../controllers/contattiController.js";

const router = Router();

router.get("/", getContatti);
router.get("/:uuid_contatto", getContatto);
router.post("/", insertContatto);
router.put("/:uuid_contatto", updateContatto);
router.delete("/:uuid_contatto", deleteContatto);

export default router;