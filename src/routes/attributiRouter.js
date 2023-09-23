import express from 'express';
import {
  getAttributo,
  getAttributi,
  insertAttributo,
  updateAttributo,
  deleteAttributo,
} from '../controllers/attributiController.js';

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.use(checkAuth);

router.get('/:id_variante/:id_attributo', getAttributo);

router.get('/', getAttributi);

router.post('/', insertAttributo);

router.put('/:id_variante/:id_attributo', updateAttributo);

router.delete('/:id_variante/:id_attributo', deleteAttributo);

export default router;
