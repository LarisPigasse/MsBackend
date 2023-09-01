import Dipendente from '../models/Dipendenti.js';
import getUUID from '../helpers/generaUUID.js'

export const getDipendente = async (req, res) => {
  const { uuid_dipendente } = req.params;

  try {
    const dipendente = await Dipendente.findOne({ where: { uuid_dipendente } });
    if (!dipendente) {
      return res.status(404).json({ ok:false,message: 'Dipendente non trovato' });
    }

    res.json(dipendente);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok:false,message: 'Si è verificato un errore durante l\'eliminazione del dipendente' });
  }
}

export const getDipendenti = async (req, res) => {
  try {
    const dipendenti = await Dipendente.findAll();
    res.json(dipendenti);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok:false,message: 'Si è verificato un errore durante il recupero dei dipendenti' });
  }
};

export const insertDipendente = async (req, res) => {
  const { nome, iban, email, telefono, data_nascita, codice_fiscale, provincia, citta, indirizzo, cap, note, stato } = req.body;
  let uuid_dipendente = getUUID('D');
  try {
    const nuovoDipendente = await Dipendente.create({ uuid_dipendente, nome, iban, email, telefono, data_nascita, codice_fiscale, provincia, citta, indirizzo, cap, note, stato });
    return res.status(200).json({ ok:true, message: 'Dipendente creato correttamente', dipendente: nuovoDipendente})
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok:false,message: 'Si è verificato un errore durante la creazione del dipendente' });
  }
};

export const updateDipendente = async (req, res) => {
    const { uuid_dipendente } = req.params;
    const { nome, iban, email, telefono, data_nascita, codice_fiscale, provincia, citta, indirizzo, cap, note, stato } = req.body;
  
    try {
      const dipendente = await Dipendente.findOne({ where: { uuid_dipendente } });
      if (!dipendente) {
        return res.status(404).json({ ok:false, message: 'Dipendente non trovato' });
      }
  
      dipendente.nome = nome;
      dipendente.iban = iban;
      dipendente.email = email;
      dipendente.telefono = telefono;
      dipendente.data_nascita = data_nascita;
      dipendente.codice_fiscale = codice_fiscale;
      dipendente.provincia = provincia;
      dipendente.citta = citta;
      dipendente.indirizzo = indirizzo;
      dipendente.cap = cap;
      dipendente.note = note;
      dipendente.stato = stato;
      
      await dipendente.save();
  
      return res.status(200).json({ ok:true, message: 'Dipendente aggiornamento correttamente', dipendente})
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok:false, message: `Si è verificato un errore durante l'aggiornamento del dipendente` });
    }
  };
  
  export const deleteDipendente = async (req, res) => {
    const { uuid_dipendente } = req.params;
  
    try {
      const dipendente = await Dipendente.findOne({ where: { uuid_dipendente } });
      if (!dipendente) {
        return res.status(404).json({ ok:false,message: 'Dipendente non trovato' });
      }
  
      await dipendente.destroy();
  
      res.json({ ok:true,message: 'Dipendente eliminato correttamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok:false,message: 'Si è verificato un errore durante l\'eliminazione del dipendente' });
    }
  }
  