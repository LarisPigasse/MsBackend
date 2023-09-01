import Categoria from '../models/Categorie.js';
import getUUID from '../helpers/generaUUID.js'

// Get all categories
export const getCategorie = async (req, res) => {
  try {
    const categorie = await Categoria.findAll();
    res.json(categorie);
  } catch 
  (error) {
    res.status(500).json({ error: 'Errore durante il recupero delle categorie' });
  }
};

// Get a category by ID
export const getCategoria = async (req, res) => {
  try {
    const uuid_categoria = req.params.uuid_categoria;
    const categoria = await Categoria.findOne({ where: { uuid_categoria } });
    if (categoria) {
      res.json(categoria);
    } else {
      res.status(404).json({ error: 'Categoria non trovata' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero della categoria' });
  }
};

// Create a new category
export const createCategoria = async (req, res) => {
  try {
    const {  categoria, descrizione, stato } = req.body;
    let uuid_categoria = getUUID();

    const nuovaCategoria = await Categoria.create({
      categoria,
      descrizione,
      uuid_categoria,
      stato
    });

    res.status(201).json(nuovaCategoria);
  } catch (error) {
    console.log(error);
    
    res.status(500).json({ error: 'Errore durante la creazione della categoria' });
  }
};

// Update a category
export const updateCategoria = async (req, res) => {
  try {
    const uuid_categoria = req.params.uuid_categoria;
    const { categoria, descrizione, stato } = req.body;

    const [updatedRows] = await Categoria.update(
      {
        categoria,
        descrizione,
        stato
      },
      { where: { uuid_categoria } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Categoria non trovata' });
    }

    const categoriaAggiornata = await Categoria.findOne({ where: { uuid_categoria } });
    res.json(categoriaAggiornata);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento della categoria' });
  }
};

// Delete a category
export const deleteCategoria = async (req, res) => {
  try {
    const uuid_categoria = req.params.uuid_categoria;

    const deletedRows = await Categoria.destroy({ where: { uuid_categoria } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Categoria non trovata' });
    }

    res.json({ message: 'Categoria eliminata correttamente' });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'eliminazione della categoria' });
  }
};
