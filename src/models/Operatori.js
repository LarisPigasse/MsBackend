import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Operatore = sequelize.define('operatori', {
  id_operatore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  uuid_operatore: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: '',
  },
  operatore: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: '',
  },
  email: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: '',
  },
  telefono: {
    type: DataTypes.STRING(32),
    allowNull: false,
    defaultValue: '',
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
    allowNull: false,
    defaultValue: 'ATTIVO',
    comment: 'attivo, inattivo, eliminato',
  },
  data_creazione: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  data_modifica: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'operatori',
  timestamps: false,
});

export default Operatore;
