import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const ProdottiSottocategorie = sequelize.define('prodotti_sottocategorie', {
  id_categoria: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  id_sottocategoria: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  uuid_sottocategoria: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  sottocategoria: {
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
  tableName: 'prodotti_sottocategorie',
  timestamps: false
});


export default ProdottiSottocategorie;