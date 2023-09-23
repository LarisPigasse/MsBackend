import express from 'express';
import {
  getAliquota,
  getAliquote,
  insertAliquota,
  updateAliquota,
  deleteAliquota,
} from '../controllers/aliquoteController.js';

import checkAuth from "../middleware/checkAuth.js";

router.use(checkAuth);

const router = express.Router();

router.get('/:id_aliquota', getAliquota);

router.get('/', getAliquote);

router.post('/', insertAliquota);

router.put('/:id_aliquota', updateAliquota);

router.delete('/:id_aliquota', deleteAliquota);

export default router;
