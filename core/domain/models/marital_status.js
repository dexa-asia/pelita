import { DataTypes } from "sequelize";
import db from "#config/database.js";

const MaritalStatus = db.define('marital_status',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  marital: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'marital',
  },
},{
  tableName: 'marital_status',
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

export default MaritalStatus;