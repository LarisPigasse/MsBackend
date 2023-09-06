import express from 'express';
import {
  getOperatori,
  getOperatoreById,
  insertOperatore,
  updateOperatore,
  deleteOperatore,
  getOperatoriFilter
} from '../controllers/operatoriController.js';

const router = express.Router();

// Route per ottenere tutti gli operatori
router.post('/operatori-filter', getOperatoriFilter);

router.get('/operatori', getOperatori);

// Route per ottenere un operatore per ID
router.get('/operatori/:id', getOperatoreById);

// Route per creare un nuovo operatore
router.post('/operatori', insertOperatore);

// Route per aggiornare un operatore per ID
router.put('/operatori/:id', updateOperatore);

// Route per eliminare un operatore per ID
router.delete('/operatori/:id', deleteOperatore);

export default router;
