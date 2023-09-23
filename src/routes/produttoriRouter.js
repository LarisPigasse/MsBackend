import { Router } from "express";
import {
  getProduttore,
  getProduttori,
  insertProduttore,
  updateProduttore,
  deleteProduttore,
} from '../controllers/ProduttoreController.js';

import checkAuth from "../middleware/checkAuth.js";

router.use(checkAuth);

const router = Router();

router.get('/:id_produttore', getProduttore);

router.get('/', getProduttori);

router.post('/', insertProduttore);

router.put('/:id_produttore', updateProduttore);

router.delete('/:id_produttore', deleteProduttore);

export default router;
