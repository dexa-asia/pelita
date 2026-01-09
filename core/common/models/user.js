import { Op,DataTypes,QueryTypes } from "sequelize";
import db from "../config/database.js";
import MemberData from "./member_data.js";
import UserPrivilege from "./user_privilege.js";
import OneBizz from "../services/onebizz.js";
import Notifier from "./notifier.js";

import {imgPath} from "#common/config/params";

const User=db.define('user',{
  id: {
    autoIncrement: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  userName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: "",
    field: 'user_name',
    unique: true
  },
  accessToken: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'access_token',
    defaultValue: null,
  },
  primaryAuth: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'primary_auth',
    defaultValue: null
  },
  verificationAuth: {
    type: DataTypes.STRING(255),
    field: 'verification_auth',
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: "email"
  },
  privId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'priv_id',
    defaultValue: 0
  },
  memberId: {
    type: DataTypes.STRING(18),
    allowNull: true,
    field: 'member_id',
    defaultValue: null,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: true
  },
  lastUpdate: {
    type: DataTypes.DATE,
    field: 'last_update',
    allowNull: true
  },
  lastLogin: {
    type: DataTypes.DATE,
    field: 'last_login',
    allowNull: true
  },
  lastIP: {
    type: DataTypes.STRING(24),
    allowNull: false,
    field: 'last_ip',
    defaultValue: ""
  },
  isEnabled: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_enabled',
    defaultValue: false
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_verified',
    defaultValue: false
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_admin',
    defaultValue: false
  },
  isManagement: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    field: 'is_management',
    defaultValue: false
  },
  fcmToken: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'fcm_token',
    defaultValue: false
  },
  pin: {
    type: DataTypes.STRING(6),
    allowNull: false,
    field: 'pin',
    defaultValue: false
  },
  isTfa: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    field: 'is_tfa',
    defaultValue: false
  },
  tfaToken: {
    type: DataTypes.STRING(6),
    allowNull: false,
    field: 'tfa_token',
    defaultValue: false
  },
  tfaExpiration: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'tfa_expiration',
    defaultValue: null
  }

},
{
  tableName: 'user',
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
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
      {
        name: "email",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "memberId",
        using: "BTREE",
        fields: [
          { name: "member_id" },
        ]
      },
      {
        name: "privId",
        using: "BTREE",
        fields: [
          { name: "priv_id" },
        ]
      },
    ],
});


User.belongsTo(MemberData,{
  foreignKey: 'member_id',
  targetKey:'memberId',
  as:'data',
});


User.belongsTo(UserPrivilege,{
  foreignKey: 'priv_id',
  targetKey:'id',
  as:'privilege',
});


User.login = async(username,password)=>{
  const user = await db.query("SELECT user_name,email,privilege,`user`.`member_id`,name,access_token,is_enabled,primary_auth,verification_auth FROM `user` JOIN `member_data` ON `user`.`member_id`=`member_data`.`member_id` JOIN `user_privilege` ON `user`.`priv_id`=`user_privilege`.`id` WHERE `user_name`=:pusername", { 
    type: QueryTypes.SELECT,
    replacements: {
      pusername: username,
    },
  });
  if(user !== null){
    const checkPass = await OneBizz.checkPassword(password,user[0].primary_auth,user[0].verification_auth);
    
    if(checkPass){
      const response ={
        "status":68,
        "message":"user found",
        "data":{
          "username":user[0].user_name,
          "name":user[0].name,
          "privilege":user[0].privilege,
          "accessToken":user[0].access_token,
          "memberId":user[0].member_id,
          "check":checkPass,
        }
      }
      return response;
    }
    else{
      const response ={
        "status":60,
        "message":"invalid password",
      }
      return response;
    }

  }
  else{
    const response ={
      "status":60,
      "message":"invalid user",
    }
    return response;
  }
}


User.loginAdmin = async(username,password)=>{
  const user = await db.query("SELECT user_name,email,privilege,`user`.`member_id`,name,access_token,is_enabled,primary_auth,verification_auth FROM `user` JOIN `member_data` ON `user`.`member_id`=`member_data`.`member_id` JOIN `user_privilege` ON `user`.`priv_id`=`user_privilege`.`id` WHERE `user_name`=:pusername AND is_admin=1", { 
    type: QueryTypes.SELECT,
    replacements: {
      pusername: username,
    },
  });

  if(user.length > 0){
    const checkP = await OneBizz.checkPassword(password,user[0].primary_auth,user[0].verification_auth);
    if(checkP){
      const response ={
        "status":68,
        "message":"user found",
        "data":{
          "userName":user[0].username,
          "name":user[0].name,
          "privilege":user[0].privilege,
          "accessToken":user[0].access_token,
          "memberId":user[0].member_id,
          "check":checkP,
        }
      }
      return response;
    }
    else{
      const response ={
        "status":60,
        "message":"invalid password",
      }
      return response;
    }

  }
  else{
    const response ={
      "status":60,
      "message":"invalid user",
    }
    return response;
  }
}



User.confirmOTA = async (memberId, ota) => {
  const now = new Date();

  const isExists = await User.findOne({
    where: {
      memberId: memberId,
      tfaToken: ota,
      tfaExpiration: {
        [Op.gte]: new Date(now.getTime() - 300 * 1000) // not older than 60 seconds
      }
    }
  });

  return isExists!==null?true:false;
};

User.makeOTA = async(memberId)=>{

  const now = new Date();
  const usr = await User.findOne({
    where:{
      memberId:memberId,
    }
  })

  usr.tfaToken = OneBizz.genRandomNumber(6);
  usr.tfaExpiration = new Date(now.getTime() + 300 * 1000)

  await usr.save();

  const md = await MemberData.findOne({
    where:{
       memberId:memberId,
    }
  })

  const nf = new Notifier()
  await nf.sendOTA(md.mobile,usr.tfaToken);
}
export default User;