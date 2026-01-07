import { Sequelize, DataTypes } from "sequelize";
import db from "../config/database.js";
import MemberType from "./member_type.js";
import MemberStatus from "./member_status.js";
import Branch from "./branch.js";
import Collection from "./collection.js";
import MemberClass from "./member_class.js";
import MemberCollection from "./member_collection.js";

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
  typeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'type_id',
    references: {
      model: 'member_type',
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
  joinDate: {
    type: DataTypes.DATEONLY,
    field: 'join_date',
    allowNull: true
  },
  point: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'point',
    defaultValue: 0
  },
  trxCount: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'trx_count',
    defaultValue: 0
  },
  balancePrincipal: {
    type: DataTypes.DECIMAL(15,2),
    field: 'balance_principal',
    allowNull: true,
    defaultValue: 0.00
  },
  balanceMandatory: {
    type: DataTypes.DECIMAL(15,2),
    field: 'balance_mandatory',
    allowNull: true,
    defaultValue: 0.00
  },
  balanceFree: {
    type: DataTypes.DECIMAL(15,2),
    field: 'balance_free',
    allowNull: true,
    defaultValue: 0.00
  },
  balance: {
    type: DataTypes.DECIMAL(15,2),
    field: 'balance',
    allowNull: true,
    defaultValue: 0.00
  },
  trxOmzet: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: true,
    field: 'trx_omzet',
    defaultValue: 0.00
  },
  billing: {
    type: DataTypes.DECIMAL(15,2),
    allowNull: false,
    field: 'billing',
    defaultValue: 0.00
  },
  isFunder: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_funder',
    defaultValue: false
  },
  isLender: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_lender',
    defaultValue: false
  },
  branchId: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'branch_id',
  },
  accountNum: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'account_num',
    defaultValue: 0
  },
  colId: {
    type: DataTypes.INTEGER,
    allowNull: null,
    field: 'col_id',
    defaultValue: null
  },
  isBusiness: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_business',
    defaultValue: false
  },
  businessActivationDatetime: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'business_activation_datetime',
    defaultValue: null
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

Member.belongsTo(MemberType,{
  foreignKey: 'type_id',
  targetKey:'id',
  as:'type'
});

Member.belongsTo(MemberCollection,{
  foreignKey: 'col_id',
  targetKey:'id',
  as:'collection'
});

Member.belongsTo(MemberStatus,{
  foreignKey: 'status_id',
  targetKey:'id',
  as:'status',
});

Member.belongsTo(Branch,{
  foreignKey: 'branch_id',
  targetKey:'branchId',
  as:'branch',
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

//sync all balance and account resume of a member
Member.syncAccount=async(memberId)=>{
  try {
    const query =`UPDATE member 
      SET mandatory_balance =(SELECT SUM(amount) FROM member_mandatory WHERE member_id=:memberId),
      free_balance = (SELECT balance FROM saving_account WHERE member_id=:memberId),
      account_num=(SELECT COUNT(*) FROM saving_account WHERE member_id=:memberId),
      trx=(SELECT COUNT(*) FROM trx WHERE member_id=:memberId)
      WHERE member_id=:memberId;`;
    await db.query(query,{
      replacements:
        {memberId:memberId}
    });

  } catch (error) {
    console.error('Error syncing member summary', error);
  }
}

export default Member;

