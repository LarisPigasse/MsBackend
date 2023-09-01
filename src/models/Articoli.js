import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Articolo = sequelize.define('articoli', {
  id_articolo: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  uuid_articolo: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: '',
  },
  id_prodotto: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_variante: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  id_attributo: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prezzo_listino: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  prezzo_offerta: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  prezzo_minimo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  costo: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: '',
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
    allowNull: false,
    defaultValue: 'ATTIVO',
  },
}, {
  tableName: 'articoli',
  timestamps: false,
});

export default Articolo;
