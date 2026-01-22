import { Sequelize } from "sequelize";

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    timezone: '+00:00',
    //dialectOptions: { useUTC: true }
    //logging: false,
  }
);

export default db;