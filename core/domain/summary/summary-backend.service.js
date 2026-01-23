import District from "#domain/area/district.js";
import MemberData from "#domain/member/member_data.js";
import oneUtils from "#utils/one.utils.js";
import { Op } from "sequelize";
class SummaryBackendService{
    
    
    static async getResume(){

        const memberTotal = await MemberData.count({
            where:{
                id:{[Op.gt]:5},
            }
        })
    
        const memberFemale= await MemberData.count({
            where:{
                id:{[Op.gt]:5},
                gender:'P'
            }
        })
        const memberMale=await MemberData.count({
            where:{
                id:{[Op.gt]:5},
                gender:'L'
            }
        })

        const distinctDisCode = await MemberData.count({
            where: {
                id: { [Op.gt]: 5 },
            },
            distinct: true,
            col: 'disCode'
        })


        return {
            memberTotal,
            memberMale,
            memberFemale,
            actualRegister:memberTotal,
            disCodes:distinctDisCode
        }
    }

    static async getLatestMember(){
        const mems= await MemberData.findAll({
            where:{
                id:{[Op.gt]:5},
            },
            include:[
                { model:District,as:'district',attributes:['remark']}
            ],
            order:[['id','desc']],
            attributes:['memberId','name','mobile'],
            limit:5
        })

        return mems.map(m=>({
            memberId:m.memberId,
            name:m.name,
            mobile:oneUtils.decodePhone(m.mobile),
            area:m.district.remark,
        }))
    }
}
export default SummaryBackendService;