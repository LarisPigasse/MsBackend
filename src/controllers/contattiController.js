
import Contatto from '../models/Contatti.js';
import getUUID from '../helpers/generaUUID.js'

export const getContatto = async (req, res) => {
  const { uuid_contatto } = req.params;

  try {
    const contatto = await Contatto.findOne({ where: { uuid_contatto } });
    if (!contatto) {
      return res.status(404).json({ message: 'Contatto non trovato' });
    }

    res.json(contatto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok:false, message: `Si è verificato un errore durante l'eliminazione del contatto` });
  }
}

export const getContatti = async (req, res) => {
  try {
    const contatto = await Contatto.findAll();
    res.json(contatto);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error, ok:false, message: 'Si è verificato un errore durante il recupero dei contatti' });
  }
};

export const insertContatto = async (req, res) => {
  const { contatto, telefono, email, note, stato, ultimo_anno } = req.body;
  let uuid_contatto = getUUID('C');
  try {
    const nuovoContatto = await Contatto.create({ uuid_contatto, contatto, telefono, email, note, stato, ultimo_anno });
    res.json({
        ok:true,
        message:"Contatto inserito correttamente",
        nuovoContatto
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok:false, message: 'Si è verificato un errore durante la creazione del contatto' });
  }
};

export const updateContatto = async (req, res) => {
    const { uuid_contatto } = req.params;
    const { contatto: nomeContatto, telefono, email, note, stato, ultimo_anno } = req.body;
  
    try {
      const contatto = await Contatto.findOne({ where: { uuid_contatto } });
      if (!contatto) {
        return res.status(404).json({ ok:false, message: 'Contatto non trovato' });
      }
  
      contatto.contatto = nomeContatto;
      contatto.telefono = telefono;
      contatto.email = email;
      contatto.note = note;
      contatto.stato = stato;
      contatto.ultimo_anno = ultimo_anno;

      await contatto.save();
  
      res.json({
        ok:true,
        message:"Contatto modificato correttamente",
        contatto:contatto
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok:false, message: `Si è verificato un errore durante l'aggiornamento del contatto` });
    }
  };
  
  export const deleteContatto = async (req, res) => {
    const { uuid_contatto } = req.params;
  
    try {
      const contatto = await Contatto.findOne({ where: { uuid_contatto } });
      if (!contatto) {
        return res.status(404).json({ ok:false, message: 'Contatto non trovato' });
      }

      await contatto.destroy();
  
      res.json({ ok:true, message: 'Contatto eliminato correttamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok:false, message: 'Si è verificato un errore durante l\'eliminazione del contatto' });
    }
  }
  