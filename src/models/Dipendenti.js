import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Dipendente = sequelize.define('Dipendente', {
  id_dipendente: {
    type: DataTypes.TINYINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  uuid_dipendente: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  nome: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  iban: {
    type: DataTypes.STRING(64),
    defaultValue: null
  },
  email: {
    type: DataTypes.STRING(32),
    defaultValue: null
  },
  telefono: {
    type: DataTypes.STRING(24),
    defaultValue: null
  },
  data_nascita: {
    type: DataTypes.DATE,
    defaultValue: null
  },
  codice_fiscale: {
    type: DataTypes.STRING(16),
    allowNull: false,
    defaultValue: ''
  },
  provincia: {
    type: DataTypes.STRING(2),
    allowNull: false,
    defaultValue: ''
  },
  citta: {
    type: DataTypes.STRING(64),
    allowNull: false,
    defaultValue: ''
  },
  indirizzo: {
    type: DataTypes.STRING(128),
    allowNull: false,
    defaultValue: ''
  },
  cap: {
    type: DataTypes.STRING(5),
    allowNull: false,
    defaultValue: ''
  },
  note: {
    type: DataTypes.STRING(1024),
    allowNull: false,
    defaultValue: ''
  },
  stato: {
    type: DataTypes.ENUM('ATTIVO','INATTIVO'),
    allowNull: false,
    defaultValue: 'ATTIVO'
  }
}, {
    tableName: 'dipendenti'
  });

export default Dipendente;
