import dotenv from "dotenv"
import { Sequelize } from 'sequelize';
dotenv.config();
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql'
});

export default sequelize;