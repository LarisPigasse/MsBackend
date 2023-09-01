import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Categoria = sequelize.define('prodotti_categorie', {
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  uuid_categoria: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  descrizione: {
    type: DataTypes.STRING(256),
    allowNull: false,
    defaultValue: ''
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
    allowNull: false,
    defaultValue: 'ATTIVO'
  }
}, {
  tableName: 'prodotti_categorie',
  timestamps: false
});

export default Categoria;
