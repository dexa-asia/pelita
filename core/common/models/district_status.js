import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } =Sequelize;

const DistrictStatus = db.define('district_status',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field: 'status',
  },
  remark: {
    type: DataTypes.STRING(50),
    allowNull: false,
    field: 'remark',
  }
},{
  tableName: 'district_status',
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

export default DistrictStatus;