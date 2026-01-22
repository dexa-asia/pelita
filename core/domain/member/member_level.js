import { DataTypes} from "sequelize";
import db from "#config/database.js";

const MemberLevel=db.define('member_level',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  level: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ""
  },
  remark: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ""
  }
},{
  tableName: 'member_level',
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

export default MemberLevel;