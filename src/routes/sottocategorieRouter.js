import { Router } from "express";
import {
    createProdottiSottocategorie,
    getProdottiSottocategorie,
    getProdottiSottocategoria,
    updateProdottiSottocategoria,
    deleteProdottiSottocategoria
} from "../controllers/sottocategorieController.js";

const router = Router();

router.post('/', createProdottiSottocategorie);
router.get('/', getProdottiSottocategorie);
router.get('/:id_categoria/:id_sottocategoria', getProdottiSottocategoria);
router.put('/:id_categoria/:id_sottocategoria', updateProdottiSottocategoria);
router.delete('/:id_categoria/:id_sottocategoria', deleteProdottiSottocategoria);


export default router;