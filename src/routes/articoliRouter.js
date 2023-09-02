import express from 'express';
import {
  getArticoli,
  getArticoloById,
  insertArticoli,
  updateArticoli,
  deleteArticoli
} from '../controllers/articoliController.js';

const router = express.Router();

// Route per ottenere tutti gli articoli
router.get('/', getArticoli);

// Route per ottenere un articolo per ID
router.get('/:id', getArticoloById);

// Route per creare un nuovo articolo
router.post('/', insertArticoli);

// Route per aggiornare un articolo per ID
router.put('/:id', updateArticoli);

// Route per eliminare un articolo per ID
router.delete('/:id', deleteArticoli);

export default router;
