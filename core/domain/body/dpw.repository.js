import Province from "#domain/area/province.js";
import DPW from "#domain/body/dpw.js";
import MemberData from "#domain/member/member_data.js";
import InstitutionStatus from "#domain/models/institution_status.js";
import { Op } from 'sequelize'

class DPWRepository{
    static async findAll(where={}){
        return await DPW.findAll({
            where,
            include:[
                { model: Province,as:'province',attributes:['province']},
                { model: MemberData, as:'leader',attributes:['name','mobile'],required:false},
                { model: InstitutionStatus, as:'status',attributes:['status']}
            ]
        })
    }

    static async findByCode(code){
        return await DPW.findOne({
            where:{
                code:code
            },
            include:[
                { model: Province,as:'province',attributes:['province']},
                { model: MemberData, as:'leader',attributes:['name','mobile'],required:false},
                { model: InstitutionStatus, as:'status',attributes:['status']}
            ]
        })
    }
}
export default DPWRepository;
