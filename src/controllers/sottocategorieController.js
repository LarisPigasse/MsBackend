import Sottocategorie from '../models/Sottocategorie.js';


export const getSottocategorieFilter = async (req, res) => {

  try {
    const { pageIndex, pageSize, sort, query } = req.query;

    let ordinamento = {
      order: '',
      key: ''
    }

    if (sort) {
      ordinamento = JSON.parse(sort);
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

export const createProdottiSottocategorie = async (req, res) => {
  try {
    const prodottoSottocategoria = await Sottocategorie.create(req.body);
    res.status(201).json(prodottoSottocategoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getProdottiSottocategorie = async (req, res) => {
  try {
    const prodottiSottocategorie = await Sottocategorie.findAll();
    res.status(200).json(prodottiSottocategorie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const getProdottiSottocategoria = async (req, res) => {
  try {
    const { id_categoria, id_sottocategoria } = req.params;
    const prodottoSottocategoria = await Sottocategorie.findOne({
      where: { id_categoria, id_sottocategoria }
    });
    if (!prodottoSottocategoria) {
      return res.status(404).json({ message: 'Prodotto sottocategoria non trovato' });
    }
    res.status(200).json(prodottoSottocategoria);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const updateProdottiSottocategoria = async (req, res) => {
  try {
    const { id_categoria, id_sottocategoria } = req.params;
    const [updated] = await Sottocategorie.update(req.body, {
      where: { id_categoria, id_sottocategoria }
    });
    if (!updated) {
      return res.status(404).json({ message: 'Prodotto sottocategoria non trovato' });
    }
    res.status(200).json({ message: 'Prodotto sottocategoria aggiornato con successo' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export const deleteProdottiSottocategoria = async (req, res) => {
  try {
    const { id_categoria, id_sottocategoria } = req.params;
    const deleted = await Sottocategorie.destroy({
      where: { id_categoria, id_sottocategoria }
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Prodotto sottocategoria non trovato' });
    }
    res.status(200).json({ message: 'Prodotto sottocategoria eliminato con successo' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
