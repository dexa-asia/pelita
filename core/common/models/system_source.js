import { DataTypes } from "sequelize";
import db from "../config/database.js";

const SystemSource = db.define('system_source',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  source: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: ""
  },
},
{
  tableName: 'system_source',
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


export default SystemSource;
