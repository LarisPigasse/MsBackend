import Aliquote from '../models/Aliquote.js';

export const getAliquota = async (req, res) => {
  const { id_aliquota } = req.params;

  try {
    const aliquota = await Aliquote.findOne({ where: { id_aliquota } });

    if (!aliquota) {
      return res.status(404).json({ message: 'Aliquota non trovata' });
    }

    res.json(aliquota);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante la ricerca dell\'aliquota' });
  }
}

export const getAliquote = async (req, res) => {
  try {
    const aliquote = await Aliquote.findAll();
    res.json(aliquote);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ ok: false, message: 'Si è verificato un errore durante il recupero delle aliquote' });
  }
}

export const insertAliquota = async (req, res) => {
  const { aliquota, stato, descrizione } = req.body;

  try {
    const nuovaAliquota = await Aliquote.create({ aliquota, stato, descrizione });

    res.json({
      ok: true,
      message: 'Aliquota inserita correttamente',
      nuovaAliquota,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante la creazione dell\'aliquota' });
  }
}

export const updateAliquota = async (req, res) => {
  const { id_aliquota } = req.params;
  const { aliquota: nuovaAliquota, stato, descrizione } = req.body;

  try {
    const aliquota = await Aliquote.findOne({ where: { id_aliquota } });

    if (!aliquota) {
      return res.status(404).json({ ok: false, message: 'Aliquota non trovata' });
    }

    aliquota.aliquota = nuovaAliquota;
    aliquota.stato = stato;
    aliquota.descrizione = descrizione;

    await aliquota.save();

    res.json({
      ok: true,
      message: 'Aliquota modificata correttamente',
      aliquota: aliquota,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante l\'aggiornamento dell\'aliquota' });
  }
}

export const deleteAliquota = async (req, res) => {
  const { id_aliquota } = req.params;

  try {
    const aliquota = await Aliquote.findOne({ where: { id_aliquota } });

    if (!aliquota) {
      return res.status(404).json({ ok: false, message: 'Aliquota non trovata' });
    }

    await aliquota.destroy();

    res.json({ ok: true, message: 'Aliquota eliminata correttamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante l\'eliminazione dell\'aliquota' });
  }
}