
import express from 'express';
import {
  getProdotti,
  getProdottoById,
  insertProdotti,
  updateProdotti,
  deleteProdotti,
  getProdottiFilter
} from '../controllers/prodottiController.js';

import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("-----------------------------");
   
    
    cb(null, `${global.__rootdir}/uploads`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.post('/', insertProdotti);

router.post('/prodotti-filter', getProdottiFilter);
// Get all products
router.get('/', getProdotti);

// Get a product by ID
router.get('/:uuid_prodotto', getProdottoById);

// Create a new product

// Update a product
router.put('/:uuid_prodotto', updateProdotti);

// Delete a product
router.delete('/:uuid_prodotto', deleteProdotti);

export default router;
