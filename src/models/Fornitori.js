import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Fornitore = sequelize.define('Fornitore', {
  id_fornitore: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  uuid_fornitore: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  fornitore: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  indirizzo: {
    type: DataTypes.STRING(128),
    allowNull: false
  },
  citta: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  cap: {
    type: DataTypes.STRING(5),
    allowNull: false
  },
  provincia: {
    type: DataTypes.STRING(2),
    allowNull: false
  },
  iban: {
    type: DataTypes.STRING(32),
    allowNull: false
  },
  partita_iva: {
    type: DataTypes.STRING(24),
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(512),
    allowNull: false
  }
}, {
  tableName: 'fornitori',
  timestamps: true
})
export default Fornitore;