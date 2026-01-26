import { DataTypes } from "sequelize";
import db from "#config/database.js";

const InstitutionStatus = db.define('institution_status',{
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
},{
  tableName: 'institution_status',
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

export default InstitutionStatus;