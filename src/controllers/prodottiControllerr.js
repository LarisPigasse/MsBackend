import { pool } from "../db.js"
import getUUID from '../helpers/generaUUID.js'

export const getProdotti = async (req,res) => {

  try {

    const [result] = await pool.query('SELECT * FROM prodotti');

    res.json(result);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Errore", error: error });
  }
}

export const getProdotto = async (req,res) => {
  try {
    let {id} = req.params;

    const [result] = await pool.query(`SELECT * FROM prodotti WHERE uuid_prodotto = ?`,[id]);

    if (result.length === 0) {
      return res.status(404).send('User not found');
    }

    res.json(result[0])
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Errore", error: error });
  }
}

export const insertProdotto = async (req,res) => {
  try {
      const { prodotto, prezzo, visibile } = req.body;
      let uuid = getUUID();
      const [result] = await pool.query(
          `INSERT INTO prodotti (prodotto, prezzo, visibile, uuid_prodotto) VALUES (?, ?, ?, ?)`,
          [prodotto, prezzo, visibile, uuid]
      );
      const id = result.insertId;
      const [rows] = await pool.query('SELECT * FROM prodotti WHERE id_prodotto = ?', [id]);
      res.json({ ok:true, message:"Prodotto inserito correttamente", prodotto:rows[0]});
  } catch (err) {
      console.error(err);
      res.status(500).json({ ok:false, message: 'Error server'});
  }
}

export const updateProdotto = async (req, res) => {
  try {
      const { prodotto, prezzo,visibile } = req.body;
      const [result] = await pool.query(
          'UPDATE prodotti SET prodotto = ?, prezzo = ?, visibile = ? WHERE uuid_prodotto = ?',
          [prodotto, prezzo,visibile, req.params.id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ ok:false, message: 'Errore prodotto'});
      }
      const [rows] = await pool.query('SELECT * FROM prodotti WHERE uuid_prodotto = ?', [req.params.id]);

      res.json({ ok:true, message:"Prodotto aggiornato correttamente", prodotto:rows[0]});
  } catch (err) {
      console.error(err);
      res.status(500).json({ ok:false, message: 'Error server'});
  }
}

export const deleteProdotto = async (req, res) => {
  try {
      const [result] = await pool.query('DELETE FROM prodotti WHERE uuid_prodotto = ?', [req.params.id]);
      if (result.affectedRows === 0) {
          return res.status(404).json({ ok:false, message: 'Errore prodotto'});
      }
      res.status(200).json({ ok:true, message: 'Prodotto eliminato correttamente'});
  } catch (err) {
      console.error(err);
      res.status(500).json({ ok:false, message: 'Error server'});
  }
}