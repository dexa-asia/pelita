import { DataTypes} from "sequelize";
import db from "#config/database.js";
import User from "#domain/user/user.js";
import Role from "#domain/user/role.js";

const UserRole=db.define('user_role',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  userId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field:'user_id'
  },
  roleId: {
    type: DataTypes.STRING(20),
    allowNull: false,
    field:'role_id'
  },
},{
  tableName: 'user_role',
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

UserRole.belongsTo(User,{
  foreignKey: 'user_id',
  targetKey:'id',
  as:'user',
});

UserRole.belongsTo(Role,{
  foreignKey: 'role_id',
  targetKey:'id',
  as:'role',
});

export default UserRole;