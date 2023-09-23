import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Aliquote = sequelize.define('aliquote', {
    id_aliquota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
     },
    aliquota: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    stato: {
        type: DataTypes.ENUM('ATTIVO', 'INATTIVO', 'ELIMINATO'),
        allowNull: false,
        defaultValue: 'ATTIVO',
    },
    descrizione: {
        type: DataTypes.STRING(64),
        allowNull: false,
        defaultValue: '',
    },
}, {
  tableName: 'aliquote',
  timestamps: false
});

export default Aliquote;