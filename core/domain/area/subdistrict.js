import { DataTypes} from "sequelize";
import db from "#config/database.js";
import Province from "#domain/area/province.js";
import District from "#domain/area/district.js";

const Subdistrict = db.define('subdistrict',{
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
  subdistrict: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'subdistrict',
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
  disCode: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'dis_code',
    references: {
      model: 'district',
      key: 'Code'
    }
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
    field: 'remark',
    allowNull: true
  }
},{
  tableName: 'subdistrict',
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
        name: "DisCode",
        using: "BTREE",
        fields: [
          { name: "dis_code" },
        ]
      },
      {
        name: "ProvCode",
        using: "BTREE",
        fields: [
          { name: "prov_code" },
        ]
      },
    ]
});

Subdistrict.belongsTo(Province,{
  foreignKey:'prov_code',
  targetKey:'code',
  as:'province',
})

Subdistrict.belongsTo(District,{
  foreignKey:'dis_code',
  targetKey:'code',
  as:'district'
})

export default Subdistrict;
