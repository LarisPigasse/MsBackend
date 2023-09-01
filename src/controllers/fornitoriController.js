import Fornitori from '../models/Fornitori.js';
import getUUID from '../helpers/generaUUID.js'

export const getFornitore = async (req, res) => {
  const { uuid_fornitore } = req.params;

  try {
    const fornitore = await Fornitori.findOne({ where: { uuid_fornitore } });
    if (!fornitore) {
      return res.status(404).json({ message: 'Fornitore non trovato' });
    }

    res.json(fornitore);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: `Si è verificato un errore durante il recupero del fornitore` });
  }
}

export const getFornitori = async (req, res) => {
  try {
    const fornitori = await Fornitori.findAll();
    res.json(fornitori);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante il recupero dei fornitori' });
  }
};

export const insertFornitore = async (req, res) => {
  const { fornitore, indirizzo, citta, cap, provincia, iban, partita_iva, note } = req.body;
  const uuid_fornitore = getUUID();
  try {
    const nuovoFornitore = await Fornitori.create({ uuid_fornitore, fornitore, indirizzo, citta, cap, provincia, iban, partita_iva, note });
    res.json({
      ok: true,
      message: "Fornitore inserito correttamente",
      nuovoFornitore
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante la creazione del fornitore' });
  }
};

export const updateFornitore = async (req, res) => {
  const { uuid_fornitore } = req.params;
  const { fornitore: nomeFornitore, indirizzo, citta, cap, provincia, iban, partita_iva, note } = req.body;

  try {
    const fornitore = await Fornitori.findOne({ where: { uuid_fornitore } });
    if (!fornitore) {
      return res.status(404).json({ ok: false, message: 'Fornitore non trovato' });
    }

    fornitore.fornitore = nomeFornitore;
    fornitore.indirizzo = indirizzo;
    fornitore.citta = citta;
    fornitore.cap = cap;
    fornitore.provincia = provincia;
    fornitore.iban = iban;
    fornitore.partita_iva = partita_iva;
    fornitore.note = note;

    await fornitore.save();

    res.json({
      ok: true,
      message: "Fornitore modificato correttamente",
      fornitore
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: `Si è verificato un errore durante l'aggiornamento del fornitore` });
  }
}

export const deleteFornitore = async (req, res) => {
  const { uuid_fornitore } = req.params;

  try {
    const fornitore = await Fornitori.findOne({ where: { uuid_fornitore } });
    if (!fornitore) {
      return res.status(404).json({ ok: false, message: 'Fornitore non trovato' });
    }

    await fornitore.destroy();

    res.json({ ok: true, message: 'Fornitore eliminato correttamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, message: 'Si è verificato un errore durante l\'eliminazione del fornitore' });
  }
}
