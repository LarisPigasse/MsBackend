import Operatore from '../models/Operatore.js';
import getUUID from '../helpers/generaUUID.js'

export const getOperatoriFilter = async (req, res) => {
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
          { operatore: { [Op.like]: `%${query}%` } },
          { email: { [Op.like]: `%${query}%` } },
          { telefono: { [Op.like]: `%${query}%` } }
        ];
      }
  
      const limit = parseInt(pageSize);
      const offset = (parseInt(pageIndex) - 1) * limit;
  
      let order = [];
      if (ordinamento.order != '' && ordinamento.key != '') {
        order.push([ordinamento.key, ordinamento.order]);
      }
  
      const result = await Operatore.findAndCountAll({
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
      res.status(500).json({ error_msg: 'Error getOperatoreFilter', error });
    }
}

// Get all operators
export const getOperatori = async (req, res) => {
  try {
    const operatori = await Operatore.findAll();
    res.json(operatori);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante il recupero degli operatori' });
  }
}

// Get an operator by ID
export const getOperatoreById = async (req, res) => {
  try {
    const id_operatore = req.params.id;
    const operatore = await Operatore.findByPk(id_operatore);
    if (operatore) {
      res.json(operatore);
    } else {
      res.status(404).json({ error: 'Operatore non trovato' });
    }
  } catch (error) {
    res.status(500).json({ error: "Errore durante il recupero dell'operatore" });
  }
}

// Create a new operator
export const insertOperatore = async (req, res) => {
  try {

    let uuid_operatore = getUUID();
    const {
      operatore,
      email,
      telefono,
      stato,
      data_creazione,
    } = req.body;

    const nuovoOperatore = await Operatore.create({
      uuid_operatore,
      operatore,
      email,
      telefono,
      stato,
      data_creazione,
    });

    res.json({ ok: true, message: 'Operatore inserito correttamente', operatore: nuovoOperatore });
  } catch (error) {
    res.status(500).json({ error: 'Errore durante la creazione dell\'operatore' });
  }
}

// Update an operator
export const updateOperatore = async (req, res) => {
  try {
    const id_operatore = req.params.id;
    const {
      operatore,
      email,
      telefono,
      stato,
      data_creazione,
    } = req.body;

    const [updatedRows] = await Operatore.update(
      {
        operatore,
        email,
        telefono,
        stato,
        data_creazione,
      },
      { where: { id_operatore } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Operatore non trovato' });
    }

    const operatoreAggiornato = await Operatore.findByPk(id_operatore);
    res.json(operatoreAggiornato);
  } catch (error) {
    res.status(500).json({ error: 'Errore durante l\'aggiornamento dell\'operatore' });
  }
}

// Delete an operator
export const deleteOperatore = async (req, res) => {
  try {
    const id_operatore = req.params.id;

    const deletedRows = await Operatore.destroy({ where: { id_operatore } });

    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Operatore non trovato' });
    }

    res.json({ message: 'Operatore eliminato correttamente' });
  } catch (error) {
    res.status(500).json({ error: "Errore durante l'eliminazione dell'operatore" });
  }
}
