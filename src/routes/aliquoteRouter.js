import express from 'express';
import {
  getAliquota,
  getAliquote,
  insertAliquota,
  updateAliquota,
  deleteAliquota,
} from '../controllers/aliquoteController.js';

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.use(checkAuth);

router.get('/:id_aliquota', getAliquota);

router.get('/', getAliquote);

router.post('/', insertAliquota);

router.put('/:id_aliquota', updateAliquota);

router.delete('/:id_aliquota', deleteAliquota);

export default router;
