import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Contatto = sequelize.define('contatti', {
  id_contatto: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  uuid_contatto: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  contatto: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING(16),
    defaultValue: null
  },
  email: {
    type: DataTypes.STRING(64),
    defaultValue: null
  },
  note: {
    type: DataTypes.STRING(256),
    defaultValue: null
  },
  stato: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1
  },
  ultimo_anno: {
    type: DataTypes.STRING(4),
    allowNull: false
  }
}, {
  tableName: 'contatti',
  timestamps: true
});

export default Contatto;
