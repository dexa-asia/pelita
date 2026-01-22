import { DataTypes,Op,Sequelize } from "sequelize";
import db from "#config/database.js";
import Member from "#domain/member/member.js";
import Province from "#domain/area/province.js";
import District from "#domain/area/district.js";
import Subdistrict from "#domain/area/subdistrict.js";
import Village from "#domain/area/village.js";
import Job from "#domain/models/job.js";
import MaritalStatus from "#domain/models/marital_status.js";


const MemberData= db.define('member_data',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  memberId: {
    type: DataTypes.STRING(18),
    field: 'member_id',
    allowNull: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'name',
    defaultValue: ""
  },
  gender: {
    type: DataTypes.ENUM('LAKI-LAKI','PEREMPUAN'),
    allowNull: true,
    field:'gender',
    defaultValue: null,
  },
  nik: {
    type: DataTypes.STRING(100),
    allowNull: null,
    defaultValue: null,
    unique:true,
    allowNull:false,
    field:'nik',
    validate: {
      len: {
        args: [16, 16],
        msg: "NIK harus 16 digit"
      },
      is: {
        args: /^[0-9]+$/,
        msg: "NIK hanya berupa angka"
      }
    }
    
  },
  address: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'address',
    defaultValue: ""
  },
  provCode: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'prov_code',
    defaultValue: null
  },
  disCode: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'dis_code',
    defaultValue: null
  },
  sudCode: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'sud_code',
    defaultValue: null
  },
  vilCode: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'vil_code',
    defaultValue: null
  },
  mobile: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'mobile',
    defaultValue: ""
  },
  birthPlace: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'birth_place',
    defaultValue: ""
  },
  birthDate: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'birth_date',
    defaultValue: null
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'job_id',
    defaultValue: null
  },
  marId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'mar_id',
    defaultValue: null
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'age',
    defaultValue: null
  },
  card: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'card',
    defaultValue: null
  },
  signature: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'signature',
    defaultValue: null
  },
  photo: {
    type: DataTypes.STRING(100),
    allowNull: true,
    field: 'photo',
    defaultValue: null
  },
  avatar: {
    type: DataTypes.STRING(160),
    allowNull: false,
    field: 'avatar',
    defaultValue: ""
  },
   lastUpdate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'last_update',
  },
  
},{
  tableName: 'member_data',
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
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      
    ]
});

MemberData.belongsTo(Member,{
  foreignKey: 'member_id',
  targetKey:'memberId',
  as:'member'
});

MemberData.belongsTo(Province,{
  foreignKey: 'prov_code',
  targetKey:'code',
  as:'province'
});


MemberData.belongsTo(District,{
  foreignKey: 'dis_code',
  targetKey:'code',
  as:'district'
});

MemberData.belongsTo(Subdistrict,{
  foreignKey: 'sud_code',
  targetKey:'code',
  as:'subdistrict'
});

MemberData.belongsTo(Village,{
  foreignKey: 'vil_code',
  targetKey:'code',
  as:'village'
});

MemberData.belongsTo(Job,{
  foreignKey: 'job_id',
  targetKey:'id',
  as:'job'
});

MemberData.belongsTo(MaritalStatus,{
  foreignKey: 'mar_id',
  targetKey:'id',
  as:'marital'
});

export default MemberData;