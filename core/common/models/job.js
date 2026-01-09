import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } =Sequelize;

const Job = db.define('job',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  job: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'job',
  }
  
},{
  tableName: 'job',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});

export default Job;