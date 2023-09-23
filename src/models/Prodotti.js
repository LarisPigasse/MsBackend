import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Prodotto = sequelize.define('prodotti', {
  id_prodotto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  uuid_prodotto: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  prodotto: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  descrizione: {
    type: DataTypes.STRING(256),
    allowNull: false,
    defaultValue: ''
  },
  scheda: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  tipo: {
    type: DataTypes.ENUM('SEMPLICE', 'VARIABILE'),
    allowNull: false,
    defaultValue: 'SEMPLICE'
  },
  tags: {
    type: DataTypes.STRING(256),
    allowNull: false,
    defaultValue: ''
  },
  codice: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: ''
  },
  sku: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: ''
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_sottocategoria: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_produttore: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  id_aliquota: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
    allowNull: false,
    defaultValue: 'ATTIVO'
  }
}, {
  tableName: 'prodotti',
  timestamps: false
});

Prodotto.removeAttribute('id');

export default Prodotto;
