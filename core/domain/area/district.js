import { DataTypes } from "sequelize";
import db from "#config/database.js";
import Province from "#domain/area/province.js";
import DistrictStatus from "#domain/area/district_status.js";

const District= db.define('district',{
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
    defaultValue: ""
  },
  district: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'district',
    defaultValue: ""
  },
  areaCode: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'area_code',
    defaultValue: ""
  },
  provCode: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'prov_code',
    references: {
      model: 'province',
      key: 'code'
    }
  },
  statusId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'status_id',
    references: {
      model: 'district_status',
      key: 'id'
    }
  },
  subdistrictNumber: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'subdistrict_number',
  },
  villageNumber: {
    type: DataTypes.INTEGER,
    field: 'village_number',
    allowNull: true
  },
  remark: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'remark',
    defaultValue: ""
  }
},
{
  tableName: 'district',
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
        name: "code",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "code" },
        ]
      },
      {
        name: "provCode",
        using: "BTREE",
        fields: [
          { name: "prov_code" },
        ]
      },
      {
        name: "StatId",
        using: "BTREE",
        fields: [
          { name: "status_id" },
        ]
      },
    ]
});

District.belongsTo(Province,{
  foreignKey: 'prov_code',
  targetKey:'code',
  as:'province',
})

District.belongsTo(DistrictStatus,{
  foreignKey: 'status_id',
  targetKey:'id',
  as:'status',

})

export default District;