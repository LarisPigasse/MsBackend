import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Attributi = sequelize.define('attributi', {
  id_variante: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_attributo: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  attributo: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
    allowNull: false,
    defaultValue: 'ATTIVO'
  }
}, {
  tableName: 'attributi',
  timestamps: false
});


export default Attributi;