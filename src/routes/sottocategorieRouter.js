import { Router } from "express";
import {
    insertSottocategoria,
    getSottocategorie,
    getSottocategoria,
    updateSottocategoria,
    deleteSottocategoria,
    getSottocategorieFilter
} from "../controllers/sottocategorieController.js";

const router = Router();

router.post('/sottocategorie-filter', getSottocategorieFilter);

router.get('/', getSottocategorie);
router.get('/:id_categoria/:id_sottocategoria', getSottocategoria);

router.post('/', insertSottocategoria);

router.put('/:id_categoria/:id_sottocategoria', updateSottocategoria);

router.delete('/:id_categoria/:id_sottocategoria', deleteSottocategoria);


export default router;