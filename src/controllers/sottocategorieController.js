import Sottocategorie from '../models/Sottocategorie.js';
import getUUID from '../helpers/generaUUID.js';

export const getSottocategorieFilter = async (req, res) => {

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
        { sottocategoria: { [Op.like]: `%${query}%` } },
        { descrizione: { [Op.like]: `%${query}%` } }
      ];
    }

    const limit = parseInt(pageSize);
    const offset = (parseInt(pageIndex) - 1) * limit;

    let order = [];
    if (ordinamento.order != '' && ordinamento.key != '') {
      order.push([ordinamento.key, ordinamento.order]);
    }

    const result = await Sottocategorie.findAndCountAll({
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
    res.status(500).json({ error_msg: 'Error getSottocategorieFilter', error });
  }
}

export const insertSottocategoria = async (req, res) => {
  try {
    const { sottocategoria, descrizione, stato,id_categoria } = req.body;

    let uuid_sottocategoria = getUUID();


    let id_sottocategoria = await Sottocategorie.max('id_sottocategoria', { where: { id_categoria } });
    id_sottocategoria = await id_sottocategoria + 1;

    const prodottoSottocategoria = await Sottocategorie.create({
      sottocategoria,
      descrizione,
      uuid_sottocategoria,
      stato,
      id_categoria,
      id_sottocategoria
    });
    res.json({ ok: true, message: 'Sottocategoria inserita correttamente', sottocategoria: prodottoSottocategoria });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getSottocategorie = async (req, res) => {
  try {
    const sottocategorie = await Sottocategorie.findAll();
    res.status(200).json(sottocategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getSottocategorieByCategoria = async (req, res) => {
  try {
    const { id_categoria } = req.params;
    const sottocategorie = await Sottocategorie.findAll({
      where: { id_categoria }
    });
    if (!sottocategorie) {
      return res.status(404).json({ message: 'Sottocategoria non trovata' });
    }
    res.status(200).json(sottocategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getSottocategoria = async (req, res) => {
  try {
    const { id_categoria, id_sottocategoria } = req.params;
    const prodottoSottocategoria = await Sottocategorie.findOne({
      where: { id_categoria, id_sottocategoria }
    });
    if (!prodottoSottocategoria) {
      return res.status(404).json({ message: 'Sottocategoria non trovata' });
    }
    res.status(200).json(prodottoSottocategoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateSottocategoria = async (req, res) => {
  try {
    const { id_categoria, id_sottocategoria } = req.params;

    const { sottocategoria, descrizione, stato } = req.body;

    const [updated] = await Sottocategorie.update({
      sottocategoria,
      descrizione,
      stato
    }, {
      where: { id_categoria, id_sottocategoria }
    });
    if (!updated) {
      return res.status(404).json({ message: 'sottocategoria non trovata' });
    }
    res.status(200).json({ message: 'Sottocategoria aggiornatA con successo' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteSottocategoria = async (req, res) => {
  try {
    const { id_categoria, id_sottocategoria } = req.params;
    const deleted = await Sottocategorie.destroy({
      where: { id_categoria, id_sottocategoria }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Sottocategoria non trovata' });
    }
    res.status(200).json({ message: 'Sottocategoria eliminata con successo' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
