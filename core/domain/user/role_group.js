import { DataTypes} from "sequelize";
import db from "#config/database.js";

const RoleGroup=db.define('role_group',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  group: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ""
  },
},{
  tableName: 'role_group',
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

export default RoleGroup;