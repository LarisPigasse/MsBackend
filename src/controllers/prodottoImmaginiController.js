import ProdottoImmagine from '../models/ProdottoImmagine.js';

// Get all product images
export const getProdottiImmagini = async (req, res) => {
  try {
    const prodottiImmagini = await ProdottoImmagine.findAll();
    res.json(prodottiImmagini);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero delle immagini dei prodotti' });
  }
};

// Get product image by product and image ID
export const getProdottoImmagineById = async (req, res) => {
  try {
    const id_prodotto = req.params.id_prodotto;
    const id_immagine = req.params.id_immagine;
    const prodottoImmagine = await ProdottoImmagine.findOne({
      where: { id_prodotto, id_immagine },
    });
    if (prodottoImmagine) {
      res.json(prodottoImmagine);
    } else {
      res.status(404).json({ error: 'Immagine del prodotto non trovata' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero dell\'immagine del prodotto' });
  }
};

// Create a new product image
export const createProdottoImmagine = async (req, res) => {
  try {
    const {
      id_prodotto,
      id_immagine,
      immagine,
      descrizione,
      tags,
      stato,
      uuid_immagine_prodotto,
      ordinamento,
    } = req.body;

    const nuovaImmagineProdotto = await ProdottoImmagine.create({
      id_prodotto,
      id_immagine,
      immagine,
      descrizione,
      tags,
      stato,
      uuid_immagine_prodotto,
      ordinamento,
    });

    res.json({ ok: true, message: 'Immagine del prodotto inserita correttamente', immagine: nuovaImmagineProdotto });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione dell\'immagine del prodotto' });
  }
}

// Update a product image
export const updateProdottoImmagine = async (req, res) => {
  try {
    const id_prodotto = req.params.id_prodotto;
    const id_immagine = req.params.id_immagine;
    const {
      immagine,
      descrizione,
      tags,
      stato,
      uuid_immagine_prodotto,
      ordinamento,
    } = req.body;

    const [updatedRows] = await ProdottoImmagine.update(
      {
        immagine,
        descrizione,
        tags,
        stato,
        uuid_immagine_prodotto,
        ordinamento,
      },
      { where: { id_prodotto, id_immagine } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Immagine del prodotto non trovata' });
    }

    const immagineProdottoAggiornata = await ProdottoImmagine.findOne({
      where: { id_prodotto, id_immagine },
    });
    res.json(immagineProdottoAggiornata);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'immagine del prodotto' });
  }
}

// Delete a product image
export const deleteProdottoImmagine = async (req, res) => {
  try {
    const id_prodotto = req.params.id_prodotto;
    const id_immagine = req.params.id_immagine;

    const deletedRows = await ProdottoImmagine.destroy({ where: { id_prodotto, id_immagine } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Immagine del prodotto non trovata' });
    }

    res.json({ message: 'Immagine del prodotto eliminata correttamente' });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'eliminazione dell\'immagine del prodotto' });
  }
}