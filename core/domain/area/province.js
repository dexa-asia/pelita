import { DataTypes } from "sequelize";
import db from "#config/database.js";

const Province= db.define('province',{
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
  province: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'province',
    defaultValue: ""
  },
  areaCode: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'area_code',
    defaultValue: ""
  },
  districNum: {
    type: DataTypes.INTEGER,
    field: 'district_number',
    allowNull: true
  },
  subdistrictNumber: {
    type: DataTypes.INTEGER,
    field: 'subdistrict_number',
    allowNull: true
  },
  villageNumber: {
    type: DataTypes.INTEGER,
    field: 'village_number',
    allowNull: true
  },
  population: {
    type: DataTypes.INTEGER,
    field: 'population',
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
  tableName: 'province',
  timestamps:false,
  indexes:[
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
  ]
}
);

export default Province;