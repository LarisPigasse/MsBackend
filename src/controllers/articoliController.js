import Articolo from '../models/Articoli.js';
import getUUID from '../helpers/generaUUID.js'


export const getArticoliFilter = async (req, res) => {

  try {
    const { pageIndex, pageSize, sort, query } = req.query;

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
        { uuid_articolo: { [Op.like]: `%${query}%` } },
        { note: { [Op.like]: `%${query}%` } },
        { stato: { [Op.like]: `%${query}%` } },
        { costo: { [Op.like]: `%${query}%` } }
      ];
    }

    const limit = parseInt(pageSize);
    const offset = (parseInt(pageIndex) - 1) * limit;

    let order = [];
    if (ordinamento.order != '' && ordinamento.key != '') {
      order.push([ordinamento.key, ordinamento.order]);
    }

    const result = await Articolo.findAndCountAll({
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
    res.status(500).json({ error_msg: 'Error getArticoliFilter', error });
  }
}

// Get all articles
export const getArticoli = async (req, res) => {
  try {
    const articoli = await Articolo.findAll();
    res.json(articoli);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero degli articoli' });
  }
}

// Get an article by ID
export const getArticoloById = async (req, res) => {
  try {
    const id_articolo = req.params.id;
    const articolo = await Articolo.findByPk(id_articolo);
    if (articolo) {
      res.json(articolo);
    } else {
      res.status(404).json({ error: 'Articolo non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero dell\'articolo' });
  }
}

// Create a new article
export const insertArticoli = async (req, res) => {
  try {

    let uuid_articolo = getUUID();

    const {
      id_prodotto,
      id_variante,
      id_attributo,
      prezzo_listino,
      prezzo_offerta,
      prezzo_minimo,
      costo,
      note,
      stato
    } = req.body;

    const nuovoArticolo = await Articolo.create({
      uuid_articolo,
      id_prodotto,
      id_variante,
      id_attributo,
      prezzo_listino,
      prezzo_offerta,
      prezzo_minimo,
      costo,
      note,
      stato
    });

    res.json({ ok: true, message: 'Articolo inserito correttamente', articolo: nuovoArticolo });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione dell\'articolo' });
  }
}

// Update an article
export const updateArticoli = async (req, res) => {
  try {
    const id_articolo = req.params.id;
    const {
      uuid_articolo,
      id_prodotto,
      id_variante,
      id_attributo,
      prezzo_listino,
      prezzo_offerta,
      prezzo_minimo,
      costo,
      note,
      stato
    } = req.body;

    const [updatedRows] = await Articolo.update(
      {
        uuid_articolo,
        id_prodotto,
        id_variante,
        id_attributo,
        prezzo_listino,
        prezzo_offerta,
        prezzo_minimo,
        costo,
        note,
        stato
      },
      { where: { id_articolo } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Articolo non trovato' });
    }

    const articoloAggiornato = await Articolo.findByPk(id_articolo);
    res.json(articoloAggiornato);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'articolo' });
  }
}

// Delete an article
export const deleteArticoli = async (req, res) => {
  try {
    const id_articolo = req.params.id;

    const deletedRows = await Articolo.destroy({ where: { id_articolo } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Articolo non trovato' });
    }

    res.json({ message: 'Articolo eliminato correttamente' });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'eliminazione dell\'articolo' });
  }
}
