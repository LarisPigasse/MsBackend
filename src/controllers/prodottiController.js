import Prodotto from '../models/Prodotti.js';
import getUUID from '../helpers/generaUUID.js'

// Get all products
export const getProdotti = async (req, res) => {
  try {
    const prodotti = await Prodotto.findAll();
    res.json(prodotti);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero dei prodotti' });
  }
}

// Get a product by ID
export const getProdottoById = async (req, res) => {
  try {
    const id_prodotto = req.params.id;
    const prodotto = await Prodotto.findByPk(id_prodotto);
    if (prodotto) {
      res.json(prodotto);
    } else {
      res.status(404).json({ error: 'Prodotto non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero del prodotto' });
  }
}

// Create a new product
export const insertProdotti = async (req, res) => {
  try {
    const {
      prodotto,
      descrizione,
      scheda,
      prezzo_listino,
      prezzo_offerta,
      prezzo_minimo,
      costo,
      tags,
      codice,
      sku,
      id_categoria,
      id_subcategoria,
      id_produttore,
      id_aliquota,
      stato
    } = req.body;

    let uuid_prodotto = getUUID();

    const nuovoProdotto = await Prodotto.create({
      uuid_prodotto,
      prodotto,
      descrizione,
      scheda,
      prezzo_listino,
      prezzo_offerta,
      prezzo_minimo,
      costo,
      tags,
      codice,
      sku,
      id_categoria,
      id_subcategoria,
      id_produttore,
      id_aliquota,
      stato
    });

    //res.status(201).json(nuovoProdotto);
    res.json({ ok:true, message:"Prodotto inserito correttamente", prodotto:nuovoProdotto});
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione del prodotto' });
  }
}

// Update a product
export const updateProdotti = async (req, res) => {
  try {
    const uuid_prodotto = req.params.uuid_prodotto;
    const {
      prodotto,
      descrizione,
      scheda,
      prezzo_listino,
      prezzo_offerta,
      prezzo_minimo,
      costo,
      tags,
      codice,
      sku,
      id_categoria,
      id_subcategoria,
      id_produttore,
      id_aliquota,
      stato
    } = req.body;

    const [updatedRows] = await Prodotto.update(
      {
        prodotto,
        descrizione,
        scheda,
        prezzo_listino,
        prezzo_offerta,
        prezzo_minimo,
        costo,
        tags,
        codice,
        sku,
        id_categoria,
        id_subcategoria,
        id_produttore,
        id_aliquota,
        stato
      },
      { where: { uuid_prodotto } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }

    const prodottoAggiornato = Prodotto.findOne({ where: { uuid_prodotto } })
    res.json(prodottoAggiornato);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento del prodotto' });
  }
}

// Delete a product
export const deleteProdotti = async (req, res) => {
  try {
    const uuid_prodotto = req.params.uuid_prodotto;

    const deletedRows = await Prodotto.destroy({ where: { uuid_prodotto } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }

    res.json({ message: 'Prodotto eliminato correttamente' });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'eliminazione del prodotto' });
  }
}