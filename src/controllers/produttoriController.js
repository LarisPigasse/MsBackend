import Produttore from '../models/Produttori.js';

export const getProduttore = async (req, res) => {
  const { id_produttore } = req.params;

  try {
    const produttore = await Produttore.findOne({ where: { id_produttore } });

    if (!produttore) {
      return res.status(404).json({ message: 'Produttore non trovato' });
    }

    res.json(produttore);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: 'Si è verificato un errore durante la ricerca del produttore' });
  }
};

export const getProduttori = async (req, res) => {
  try {
    const produttori = await Produttore.findAll();
    res.json(produttori);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante il recupero dei produttori' });
  }
};

export const insertProduttore = async (req, res) => {
  const { produttore, stato } = req.body;

  try {
    const nuovoProduttore = await Produttore.create({ produttore, stato });

    res.json({
      ok: true,
      message: 'Produttore inserito correttamente',
      nuovoProduttore,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: 'Si è verificato un errore durante la creazione del produttore' });
  }
};

export const updateProduttore = async (req, res) => {
  const { id_produttore } = req.params;
  const { produttore: nuovoProduttore, stato } = req.body;

  try {
    const produttore = await Produttore.findOne({ where: { id_produttore } });

    if (!produttore) {
      return res.status(404).json({ ok: false, message: 'Produttore non trovato' });
    }

    produttore.produttore = nuovoProduttore;
    produttore.stato = stato;

    await produttore.save();

    res.json({
      ok: true,
      message: 'Produttore modificato correttamente',
      produttore: produttore,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante l\'aggiornamento del produttore' });
  }
}

export const deleteProduttore = async (req, res) => {
  const { id_produttore } = req.params;

  try {
    const produttore = await Produttore.findOne({ where: { id_produttore } });

    if (!produttore) {
      return res.status(404).json({ ok: false, message: 'Produttore non trovato' });
    }

    await produttore.destroy();

    res.json({ ok: true, message: 'Produttore eliminato correttamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante l\'eliminazione del produttore' });
  }
}