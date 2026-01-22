import MemberRepository from "./member.repository.js";
import { Op } from "sequelize";
import oneUtils from "#utils/one.utils.js";
import {imgPath} from "#config/params.js"
import UserRepository from "#domain/user/user.repository.js";

class MemberViewService{

    static async listAll(payload,origin){
        try{
            let whereClause={id:{[Op.gt]:5}}
            let memberFilter={}
            
            const limit = payload.limit ?? 1000;
            const mbs = await MemberRepository.findAll(
                whereClause,
                memberFilter,
                limit
            )
            
            return mbs.map(m=>({
                id:m.memberId,
                memberId:m.memberId,
                name:m.name,
                mobile:oneUtils.decodePhone(m.mobile),
                registerDate:m.member.registerDate,
                gender:m.gender,
                district:m.district.remark,
            }))
        }
        catch (error) {
            throw error;
        }
    }

    static async viewDetail(payload,origin){
        const mb = await MemberRepository.findDetailByMemberId(payload.memberId)
        const usr = await UserRepository.findbyMemberId(payload.memberId)
        return {
            id:mb.id,
            memberId:mb.memberId,
            name:mb.name,
            nik:mb.nik,
            gender:mb.gender,
            birthPlace:mb.birthPlace,
            birthDate:mb.birthDate,
            age:mb.age,
            address:mb.address,
            province:mb.province.province,
            district:mb.district.remark,
            subdistrict:mb.subdistrict.subdistrict,
            village:mb.village.village,
            mobile:mb.mobile,
            mobileDecoded:oneUtils.decodePhone(mb.mobile),
            email:usr.email,
            job:mb.job.job,
            marital:mb.marital.marital,
            card:imgPath+"cards/"+mb.card,
            photo: imgPath+"users/"+mb.photo,
            registerDate:mb.member.registerDate,
            lastUpdate:mb.lastUpdate,
        }
    }

    static async findByNik(nik){
        const result = await MemberRepository.findByMemberByNik(nik)
        console.log(result.memberId)
        if(result!==null){
            return this.viewDetail(result)
        }
    }
}

export default MemberViewService;