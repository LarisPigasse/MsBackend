import { Router } from "express";
import {
  getProduttore,
  getProduttori,
  insertProduttore,
  updateProduttore,
  deleteProduttore,
} from '../controllers/produttoriController.js';

import checkAuth from "../middleware/checkAuth.js";

const router = Router();

router.use(checkAuth);

router.get('/:id_produttore', getProduttore);

router.get('/', getProduttori);

router.post('/', insertProduttore);

router.put('/:id_produttore', updateProduttore);

router.delete('/:id_produttore', deleteProduttore);

export default router;
