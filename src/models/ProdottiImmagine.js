import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const ProdottoImmagine = sequelize.define('prodotti_immagini', {
  id_prodotto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  id_immagine: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  immagine: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
  descrizione: {
    type: DataTypes.STRING(256),
    allowNull: false,
    defaultValue: '',
  },
  tags: {
    type: DataTypes.STRING(256),
    allowNull: false,
    defaultValue: '',
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
    allowNull: false,
    defaultValue: 'ATTIVO',
  },
  uuid_immagine_prodotto: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: '',
  },
  ordinamento: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'prodotti_immagini',
  timestamps: false
});

export default ProdottoImmagine;
