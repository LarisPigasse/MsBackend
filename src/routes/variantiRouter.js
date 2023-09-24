import express from 'express';
import {
  getVariante,
  getVarianti,
  insertVariante,
  updateVariante,
  deleteVariante,
} from '../controllers/variantiController.js';

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();
router.use(checkAuth);

router.get('/:id_variante', getVariante);

router.get('/', getVarianti);

router.post('/', insertVariante);

router.put('/:id_variante', updateVariante);

router.delete('/:id_variante', deleteVariante);

export default router;