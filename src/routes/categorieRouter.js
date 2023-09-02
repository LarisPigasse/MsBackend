import { Router } from "express";
import {
    getCategorie,
    getCategoria,
    createCategoria,
    updateCategoria,
    deleteCategoria,
    getCategorieFilter
} from "../controllers/categorieController.js";

const router = Router();

// Get all categories
router.get('/categorie-filter', getCategorieFilter);

router.get('/', getCategorie);

// Get a category by ID
router.get('/:uuid_categoria', getCategoria);

// Create a new category
router.post('/', createCategoria);

// Update a category
router.put('/:uuid_categoria', updateCategoria);

// Delete a category
router.delete('/:uuid_categoria', deleteCategoria);

export default router;