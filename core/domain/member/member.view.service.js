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
                source:m.member.source.source,
                chanel:m.member.chanel.chanel,
                age:m.age,
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
            education:mb.education.level,
            card:imgPath+"cards/"+mb.card,
            photo: imgPath+"users/"+mb.photo,
            registerDate:mb.member.registerDate,
            source:mb.member.source.source,
            chanel:mb.member.chanel.chanel,
            status:mb.member.status.status,
            lastUpdate:mb.lastUpdate,
            statusId:mb.member.statusId,
        }
    }

    static async findByNik(nik){
        const result = await MemberRepository.findByMemberByNik(nik)
        if(result!==null){
            return this.viewDetail(result)
        }
    }

    static async findByMobile(mobile){
        const result = await MemberRepository.findByMemberByMobile(oneUtils.normalizePhone(mobile))
        if(result!==null){
            return this.viewDetail(result)
        }
    }
}

export default MemberViewService;