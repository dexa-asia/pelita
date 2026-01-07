import { DataTypes} from "sequelize";
import db from "../config/database.js";

const MemberStatus=db.define('member_status',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: ""
  },
  remark: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: ""
  }
},{
  tableName: 'member_status',
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

export default MemberStatus;