import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import MemberStatus from "./member_status.js";
import MemberClass from "./member_class.js";
import MemberLevel from "./member_level.js";
import SystemChanel from "./system_chanel.js";
import SystemSource from "./system_source.js";

const Member= db.define('member',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  memberId: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'member_id',
    unique: 'member_id',
  },
  registerId: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'register_id',
    unique: 'register_id',
  },
  levelId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'level_id',
    references: {
      model: 'member_level',
      key: 'id'
    }
  },
  classId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'class_id',
    references: {
      model: 'member_class',
      key: 'id'
    }
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'status_id',
    references: {
      model: 'member_status',
      key: 'id'
    }
  },
  registerDate: {
    type: DataTypes.DATEONLY,
    field: 'register_date',
    allowNull: true
  },
  referredBy: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'referred_by',
    defaultValue:null,
  },
  registeredBy: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'registered_by',
    defaultValue:null,
  },
  approvedBy: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'approved_by',
    defaultValue:null,
  },
  approveDateTime: {
    type: DataTypes.DATEONLY,
    field: 'approve_date_time',
    allowNull: true
  },
  sourceId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'source_id',
    references: {
      model: 'system_source',
      key: 'id'
    }
  },
  chanelId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'chanel_id',
    references: {
      model: 'system_chanel',
      key: 'id'
    }
  },
  
},
{
  tableName: 'member',
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
      {
        name: "member_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "type_id",
        using: "BTREE",
        fields: [
          { name: "type_id" },
        ]
      },
      {
        name: "status_id",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
    ]
});

Member.belongsTo(MemberClass,{
  foreignKey: 'class_id',
  targetKey:'id',
  as:'class'
});

Member.belongsTo(MemberLevel,{
  foreignKey: 'level_id',
  targetKey:'id',
  as:'level'
});

Member.belongsTo(MemberStatus,{
  foreignKey: 'status_id',
  targetKey:'id',
  as:'status',
});

Member.belongsTo(SystemChanel,{
  foreignKey: 'chanel_id',
  targetKey:'id',
  as:'chanel'
});

Member.belongsTo(SystemSource,{
  foreignKey: 'source_id',
  targetKey:'id',
  as:'source'
});


Member.genMemberId = async () => {
  const prefix = new Date().getFullYear();
  const max = await Member.findOne({
    where: {
      memberId: {
        [Sequelize.Op.like]: `${prefix}%`
      }
    },
    order: [['memberId', 'DESC']],
    attributes: ['memberId'],
    raw: true,
  });

  if (max!==null) {
    const lastNumber = parseInt(max.memberId.slice(prefix.toString().length)) + 1;
    const paddedNumber = lastNumber.toString().padStart(7, '0');
    return `${prefix}${paddedNumber}`;
  } else {
    return `${prefix}0000001`;
  }
};

export default Member;

