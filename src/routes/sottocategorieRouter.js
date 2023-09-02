import { Router } from "express";
import {
    createProdottiSottocategorie,
    getProdottiSottocategorie,
    getProdottiSottocategoria,
    updateProdottiSottocategoria,
    deleteProdottiSottocategoria,
    getSottocategorieFilter
} from "../controllers/sottocategorieController.js";

const router = Router();

router.get('/sottocategorie-filter', getSottocategorieFilter);

router.get('/', getProdottiSottocategorie);
router.get('/:id_categoria/:id_sottocategoria', getProdottiSottocategoria);

router.post('/', createProdottiSottocategorie);

router.put('/:id_categoria/:id_sottocategoria', updateProdottiSottocategoria);

router.delete('/:id_categoria/:id_sottocategoria', deleteProdottiSottocategoria);


export default router;