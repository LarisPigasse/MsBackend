import Varianti from '../models/Varianti.js';

export const getVariante = async (req, res) => {
  const { id_variante } = req.params;

  try {
    const variante = await Varianti.findOne({ where: { id_variante } });

    if (!variante) {
      return res.status(404).json({ message: 'Variante non trovata' });
    }

    res.json(variante);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: 'Si è verificato un errore durante la ricerca della variante' });
  }
}

export const getVarianti = async (req, res) => {
  try {
    const varianti = await Varianti.findAll();
    res.json(varianti);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: 'Si è verificato un errore durante il recupero delle varianti' });
  }
}

export const insertVariante = async (req, res) => {
  const { variante, stato } = req.body;

  try {
    const nuovaVariante = await Varianti.create({ variante, stato });

    res.json({
      ok: true,
      message: 'Variante inserita correttamente',
      nuovaVariante,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante la creazione della variante' });
  }
}

export const updateVariante = async (req, res) => {
  const { id_variante } = req.params;
  const { variante: nuovaVariante, stato } = req.body;

  try {
    const variante = await Varianti.findOne({ where: { id_variante } });

    if (!variante) {
      return res.status(404).json({ ok: false, message: 'Variante non trovata' });
    }

    variante.variante = nuovaVariante;
    variante.stato = stato;

    await variante.save();

    res.json({
      ok: true,
      message: 'Variante modificata correttamente',
      variante: variante,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante l\'aggiornamento della variante' });
  }
}

export const deleteVariante = async (req, res) => {
  const { id_variante } = req.params;

  try {
    const variante = await Varianti.findOne({ where: { id_variante } });

    if (!variante) {
      return res.status(404).json({ ok: false, message: 'Variante non trovata' });
    }

    await variante.destroy();

    res.json({ ok: true, message: 'Variante eliminata correttamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante l\'eliminazione della variante' });
  }
}
