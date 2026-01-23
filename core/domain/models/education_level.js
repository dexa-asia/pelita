import { DataTypes } from "sequelize";
import db from "#config/database.js";

const EducationLevel = db.define('education_level',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  level: {
    type: DataTypes.STRING(40),
    allowNull: false,
    field: 'level',
  }
  
},{
  tableName: 'education_level',
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

export default EducationLevel;