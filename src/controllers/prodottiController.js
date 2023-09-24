import Prodotto from '../models/Prodotti.js';
import Articolo from '../models/Articoli.js';
import getUUID from '../helpers/generaUUID.js'

export const getProdottiFilter = async (req, res) => {
  try {
    const { pageIndex, pageSize, sort, query } = req.body;

    let ordinamento = {
      order: '',
      key: ''
    }

    if (sort) {
      ordinamento = sort;
    }

    let where = {};

    if (query) {
      where[Op.or] = [
        { prodotto: { [Op.like]: `%${query}%` } },
        { descrizione: { [Op.like]: `%${query}%` } }
      ];
    }

    const limit = parseInt(pageSize);
    const offset = (parseInt(pageIndex) - 1) * limit;

    let order = [];
    if (ordinamento.order != '' && ordinamento.key != '') {
      order.push([ordinamento.key, ordinamento.order]);
    }

    const result = await Prodotto.findAndCountAll({
      where,
      order,
      limit,
      offset
    });

    res.json({
      total: result.count,
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({ error_msg: 'Error getProdottiFilter', error });
  }
}

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
    const uuid_prodotto = req.params.uuid_prodotto;
    const prodotto = await Prodotto.findOne({ where: { uuid_prodotto } });
    if (prodotto) {
      let id_prodotto =prodotto.id_prodotto

      const articolo = await Articolo.findOne({ where: { id_prodotto } });

      const valueArticolo = articolo.dataValues;

      let response = {
        ...prodotto.dataValues,
        prezzo_listino:valueArticolo.prezzo_listino,
        prezzo_offerta:valueArticolo.prezzo_offerta,
        prezzo_minimo:valueArticolo.prezzo_minimo,
        note:valueArticolo.note
      }

      res.json(response);

    } else {
      res.status(404).json({ error: 'Prodotto non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero del prodotto', 'e': error });
  }
}

// Create a new product
export const insertProdotti = async (req, res) => {
  try {
    const {
      prodotto,
      descrizione,
      scheda,
      tags,
      codice,
      sku,
      id_categoria,
      id_sottocategoria,
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
      tags,
      codice,
      sku,
      id_categoria,
      id_sottocategoria,
      id_produttore,
      id_aliquota,
      stato
    });

    if(nuovoProdotto){
      let uuid_articolo = getUUID();
      let id_prodotto = nuovoProdotto.id_prodotto;
      let articolo = prodotto;
      const {
        prezzo_listino,
        prezzo_offerta,
        prezzo_minimo,
        note
      } = req.body;
  
      await Articolo.create({
        uuid_articolo,
        id_prodotto,
        id_variante: 0,
        id_attributo: 0,
        articolo,
        prezzo_listino,
        prezzo_offerta,
        prezzo_minimo,
        note
      });
    }

    //res.status(201).json(nuovoProdotto);
    res.json({ ok:true, message:"Prodotto inserito correttamente", prodotto:nuovoProdotto});
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione del prodotto', error });
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
      tags,
      codice,
      sku,
      id_categoria,
      id_sottocategoria,
      id_produttore,
      id_aliquota,
      stato,
      id_prodotto
    } = req.body;

    const prodottoUpdate = await Prodotto.update(
      {
        prodotto,
        descrizione,
        scheda,
        tags,
        codice,
        sku,
        id_categoria,
        id_sottocategoria,
        id_produttore,
        id_aliquota,
        stato
      },
      { where: { uuid_prodotto } }
    );
    
    const {
      prezzo_listino,
      prezzo_offerta,
      prezzo_minimo,
      note
    } = req.body;

    const articoloUpdate = await Articolo.update(
      {
        articolo : prodotto,
        prezzo_listino,
        prezzo_offerta,
        prezzo_minimo,
        note
      },
      { where: { id_prodotto } }
    );

    if (prodottoUpdate.updatedRows === 0 && articoloUpdate.updatedRows === 0) {
      return res.status(404).json({ error: 'Prodotto non trovato' });
    }

    const prodottoAggiornato = Prodotto.findOne({ where: { uuid_prodotto } })

    const articolo = await Articolo.findOne({ where: { id_prodotto } });

    const valueArticolo = articolo.dataValues;

    let response = {
      ...prodottoAggiornato.dataValues,
      prezzo_listino:valueArticolo.prezzo_listino,
      prezzo_offerta:valueArticolo.prezzo_offerta,
      prezzo_minimo:valueArticolo.prezzo_minimo,
      note:valueArticolo.note
    }

    res.json(response);
  } catch (err) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento del prodotto', err });
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