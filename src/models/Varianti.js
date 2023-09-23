import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Varianti = sequelize.define('varianti', {
  id_variante: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  variante: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
    allowNull: false,
    defaultValue: 'ATTIVO'
  }
}, {
  tableName: 'varianti',
  timestamps: false
});


export default Varianti;