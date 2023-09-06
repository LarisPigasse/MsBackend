import express from 'express';
import {
  getAccount,
  getAccountById,
  insertAccount,
  updateAccount,
  deleteAccount,
  getAccountFilter
} from '../controllers/accountController.js';

const router = express.Router();

// Route per ottenere tutti gli account
router.post('/account-filter', getAccountFilter);

router.get('/', getAccount);

// Route per ottenere un account per ID
router.get('/:id', getAccountById);

// Route per creare un nuovo account
router.post('/', insertAccount);

// Route per aggiornare un account per ID
router.put('/:id', updateAccount);

// Route per eliminare un account per ID
router.delete('/:id', deleteAccount);

export default router;
