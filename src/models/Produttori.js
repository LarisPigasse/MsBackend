import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Produttore = sequelize.define('produttore', {
  id_produttore: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  produttore: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
    allowNull: false,
    defaultValue: 'ATTIVO',
  },
}, {
  tableName: 'produttori',
  timestamps: false,
});

export default Produttore;