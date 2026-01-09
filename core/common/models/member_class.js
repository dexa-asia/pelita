import { DataTypes } from "sequelize";
import db from "../config/database.js";

const MemberClass = db.define('member_class',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  class: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: ""
  },
 },
{
  tableName: 'member_class',
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

export default MemberClass;
