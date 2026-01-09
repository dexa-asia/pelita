import District from "#root/common/models/district";
import Member from "#root/common/models/member";
import MemberData from "#root/common/models/member_data";
import User from "#root/common/models/user";
import OneBizz from "#root/common/services/onebizz";
import { Op } from "sequelize";

const siteIndex = async(req,res)=>{
    try{
        const latestMems = await MemberData.findAll({
            where:{id:{[Op.gt]:5}},
            include:[
                { model:District,as:'district',attributes:['remark']},
                { model:Member,as:'member'}
            ],
            order:[['id','DESC']],
            limit:req.data.limit,
            attributes:['memberId','name','mobile','address']
        });

        const arrLatest = latestMems.map(m=>({
            memberId:m.memberId,
            name:m.name,
            mobile:OneBizz.decodePhone(m.mobile),
            address:m.address.toUpperCase(),
            district:m.district!==null?m.district.remark:'',
        }))

        const countMember = await Member.count({
            where:{memberId:{[Op.gt]:5}}
        })
        
        res.status(200).json({
            status: 60,
            message:"welcome to terracoop",
            data:{
                latest:arrLatest,
                resume:{
                    member:countMember,
                   
                },
                
            }
        });
    }
    catch (err){
        res.json({
            "status": 60,
            "message":err.message,
        });
    }   
}

const siteAuth = async (req,res)=>{
    try{
        
        const result = await User.loginAdmin(req.data.userName,req.data.password);
        if (result.status==68){
            res.json({
                "status":68,
                "data":result.data,
                "message":"authorization succeed",
            })
        } 
        else{
            res.json({
                "status":60,
                "message":result.message,
            })
        }
       
    }
    catch (err){
        console.log(err);
    }
}


export{
    siteIndex,siteAuth
}