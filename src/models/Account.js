import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Account = sequelize.define('account', {
    id_account: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
      },
      account: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(128),
        allowNull: false,
      },
      tipo_account: {
        type: DataTypes.ENUM('CLIENTE', 'RIVENDITORE', 'AGENTE'),
        allowNull: false,
        defaultValue: 'CLIENTE',
      },
      data_registro: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      data_modifica: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      ultimo_login: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      stato: {
        type: DataTypes.ENUM('ATTIVO', 'INATTIVO'),
        defaultValue: 'ATTIVO',
      },
      uuid_account: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
}, {
  tableName: 'account',
  timestamps: true
});

export default Account;
