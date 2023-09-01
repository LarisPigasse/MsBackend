import { Router } from "express";
import {
  getUtenti,
  generaToken,
  getUtente,
  getUtentiFilter,
  insertUtente,
  updateUtente,
  deleteUtente,
  updateUtentePassword,
  profilo
} from "../controllers/utentiController.js";

import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.use(checkAuth);
// GET all Employees
router.get("/", getUtenti);
router.post("/getUtentiFilter", getUtentiFilter);
router.get("/genera-token", generaToken);

router.get("/auth/profilo", profilo);

router.get("/:id", getUtente);
router.post("/", insertUtente);
router.put("/:id", updateUtente);
router.delete("/:id", deleteUtente);
router.put("/modifica-password/:id", updateUtentePassword);
// GET An Employee
// router.get("/employees/:id", getEmployee);
// DELETE An Employee
// router.delete("/employees/:id", deleteEmployee);
// INSERT An Employee
// router.post("/employees", createEmployee);
// router.patch("/employees/:id", updateEmployee);

export default router;