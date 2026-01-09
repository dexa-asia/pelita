import { DataTypes } from "sequelize";
import db from "../config/database.js";

const SystemChanel = db.define('system_chanel',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  chanel: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: ""
  },
},
{
  tableName: 'system_chanel',
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


export default SystemChanel;
