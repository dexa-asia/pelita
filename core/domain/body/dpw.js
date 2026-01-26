import { DataTypes } from "sequelize";
import db from "#config/database.js";
import Province from "#domain/area/province.js";
import MemberData from "#domain/member/member_data.js";
import InstitutionStatus from "#domain/models/institution_status.js";

const DPW = db.define('dpw',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  code: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'code',
  },
  provCode: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'prov_code',
  },
  officeAddress: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'office_address',
  },
  officeDisCode: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'office_dis_code',
  },
  officeSudCode: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'office_sud_code',
  },
  officeVilCode: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'office_vil_code',
  },
  officePhone: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'office_phone',
  },
  officeEmail: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'office_email',
  },
  officeWeb: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'office_web',
  },
  location: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'location',
  },
  createDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'create_date',
  },
  approveDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: 'approve_date',
  },
  statusId: {
    type: DataTypes.INTEGER(11),
    allowNull: false,
    field: 'status_id',
  },
  isOffice: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_office',
    defaultValue:false,
  },
  isStaff: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_staff',
    defaultValue:false,
  },
  leaderId: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'leader_id',
  },
  memberCount: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    field: 'member_count',
  },
  staffCount: {
    type: DataTypes.INTEGER(11),
    allowNull: true,
    field: 'staff_count',
  },
  remark: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'remark',
  },
  
},{
  tableName: 'dpw',
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


DPW.belongsTo(Province,{
  foreignKey: 'prov_code',
  targetKey:'code',
  as:'province'
});


DPW.belongsTo(MemberData,{
  foreignKey: 'leader_id',
  targetKey:'memberId',
  as:'leader'
});

DPW.belongsTo(InstitutionStatus,{
  foreignKey: 'status_id',
  targetKey:'id',
  as:'status'
});


export default DPW;