import Attributi from '../models/Attributi.js';

export const getAttributo = async (req, res) => {
  const { id_variante, id_attributo } = req.params;

  try {
    const attributo = await Attributi.findOne({
      where: { id_variante, id_attributo },
    });

    if (!attributo) {
      return res.status(404).json({ message: 'Attributo non trovato' });
    }

    res.json(attributo);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: `Si è verificato un errore durante la ricerca dell'attributo` });
  }
};

export const getAttributi = async (req, res) => {
  try {
    const attributi = await Attributi.findAll();
    res.json(attributi);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante il recupero degli attributi' });
  }
}

export const insertAttributo = async (req, res) => {
  const { id_variante, id_attributo, attributo, stato } = req.body;

  try {
    const nuovoAttributo = await Attributi.create({
      id_variante,
      id_attributo,
      attributo,
      stato,
    });

    res.json({
      ok: true,
      message: 'Attributo inserito correttamente',
      nuovoAttributo,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: 'Si è verificato un errore durante la creazione dell\'attributo' });
  }
}

export const updateAttributo = async (req, res) => {
  const { id_variante, id_attributo } = req.params;
  const { attributo: nuovoAttributo, stato } = req.body;

  try {
    const attributo = await Attributi.findOne({
      where: { id_variante, id_attributo },
    });

    if (!attributo) {
      return res.status(404).json({ ok: false, message: 'Attributo non trovato' });
    }

    attributo.attributo = nuovoAttributo;
    attributo.stato = stato;

    await attributo.save();

    res.json({
      ok: true,
      message: 'Attributo modificato correttamente',
      attributo: attributo,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: `Si è verificato un errore durante l'aggiornamento dell'attributo` });
  }
}

export const deleteAttributo = async (req, res) => {
  const { id_variante, id_attributo } = req.params;

  try {
    const attributo = await Attributi.findOne({
      where: { id_variante, id_attributo },
    });

    if (!attributo) {
      return res.status(404).json({ ok: false, message: 'Attributo non trovato' });
    }

    await attributo.destroy();

    res.json({ ok: true, message: 'Attributo eliminato correttamente' });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: 'Si è verificato un errore durante l\'eliminazione dell\'attributo' });
  }
}