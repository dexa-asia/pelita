import { Sequelize,DataTypes } from "sequelize";
import db from "#config/database.js";
import RoleGroup from "#domain/user/role_group.js";

const Role = db.define('role',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  role: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'role',
  },
  groupId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    field: 'group_id',
  },
  description: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'description',
  }
  
},{
  tableName: 'role',
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

Role.belongsTo(RoleGroup,{
  foreignKey: 'group_id',
  targetKey:'id',
  as:'group',
});

export default Role;