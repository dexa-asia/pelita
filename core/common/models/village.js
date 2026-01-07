import { Sequelize } from "sequelize";
import db from "../config/database.js";
const { DataTypes } =Sequelize;
import Province from "./province.js";
import District from "./district.js";
import Subdistrict from "./subdistrict.js";

const Village = db.define('village',{
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
  village: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'village',
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
      key: 'code'
    }
  },
  sudCode: {
    type: DataTypes.STRING(18),
    allowNull: false,
    field: 'sud_code',
    references: {
      model: 'district',
      key: 'code'
    }
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  remark: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
},{
  tableName: 'village',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id"},
        ]
      },
      {
        name: "SudCode",
        using: "BTREE",
        fields: [
          { name: "sud_code"},
        ]
      },
      {
        name: "DisCode",
        using: "BTREE",
        fields: [
          { name: "dis_code"},
        ]
      },
      {
        name: "ProvCode",
        using: "BTREE",
        fields: [
          { name: "prov_code"},
        ]
      },
    ]
});

Village.belongsTo(Province,{
  foreignKey:'prov_code',
  targetKey:'code',
  as:'province',
})

Village.belongsTo(District,{
  foreignKey:'dis_code',
  targetKey:'code',
  as:'district'
})

Village.belongsTo(Subdistrict,{
  foreignKey:'sud_code',
  targetKey:'code',
  as:'subdistrict'
})

export default Village;
