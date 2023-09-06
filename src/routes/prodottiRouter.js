// import { Router } from "express";
// import {
//     getProdottiFilter,
//     getProdotti,
//     getProdotto,
//     insertProdotto,
//     updateProdotto,
//     deleteProdotto,
// } from "../controllers/prodottiController.js";

// const router = Router();

// router.get("/", getProdotti);
// router.post("/getProdottiFilter", getProdottiFilter);
// router.get("/:id", getProdotto);
// router.post("/", insertProdotto);
// router.put("/:id", updateProdotto);
// router.delete("/:id", deleteProdotto);

// export default router;


import express from 'express';
import {
  getProdotti,
  getProdottoById,
  insertProdotti,
  updateProdotti,
  deleteProdotti,
  getProdottiFilter
} from '../controllers/prodottiController.js';

const router = express.Router();

router.post('/prodotti-filter', getProdottiFilter);
// Get all products
router.get('/', getProdotti);

// Get a product by ID
router.get('/:uuid_prodotto', getProdottoById);

// Create a new product
router.post('/', insertProdotti);

// Update a product
router.put('/:uuid_prodotto', updateProdotti);

// Delete a product
router.delete('/:uuid_prodotto', deleteProdotti);

export default router;
