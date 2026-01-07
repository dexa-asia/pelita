import { DataTypes } from "sequelize";
import db from "../config/database.js";

const UserPrivilege = db.define('user_privilege',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  privilege: {
    type: DataTypes.STRING(18),
    allowNull: true
  },
},
{
  tableName: 'user_privilege',
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

export default UserPrivilege;

