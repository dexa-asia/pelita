import MemberData from "#domain/member/member_data.js";
import Member from "#domain/member/member.js";
import MemberLevel from "#domain/member/member_level.js";
import District from "#domain/area/district.js";
import Subdistrict from "#domain/area/subdistrict.js";
import Province from "#domain/area/province.js";
import Village from "#domain/area/village.js";
import Job from "#domain/models/job.js";
import MaritalStatus from "#domain/models/marital_status.js";
import SystemSource from "#domain/models/system_source.js";
import SystemChanel from "#domain/models/system_chanel.js";
import MemberStatus from "#domain/member/member_status.js";
import EducationLevel from "#domain/models/education_level.js";

class MemberRepository{

    static async findAll(whereClause={},memberWhere={},limit=1000){
        
        const includeClause =[
            {
                model:Member,
                as:'member',
                where:memberWhere,
                include:[
                    { model: MemberLevel,as:'level',attributes:['level']},
                    { model: SystemSource,as:'source',attributes:['source']},
                    { model: SystemChanel,as:'chanel',attributes:['chanel']}
                ],
                attributes:['statusId','registerDate']
            },
            {
                model:District, as:'district',attributes:['remark']
            }
        ]
        return await MemberData.findAll({
            where:whereClause,
            include:includeClause,
            order:[['id','DESC']],
            limit:limit,
            attributes:['memberId','name','gender','mobile','birthDate','age']
        })
    }
    static async findByMemberId(memberId){
        return MemberData.findOne({ where: { memberId } });
    }

    static async findByMemberByNik(nik){
        try{
            return MemberData.findOne(
                { 
                    where: { nik },
                    attributes:['memberId','name']
            });
        }
        catch(error){
            throw error
        }
        
    }

    static async findByMemberByMobile(mobile){
        try{
            return MemberData.findOne(
                { 
                    where: { mobile },
                    attributes:['memberId','name']
            });
        }
        catch(error){
            throw error
        }
        
    }

    static async updatePhoto(memberId, filename) {
        return MemberData.update(
            { avatar: filename },
            { where: { memberId } }
        );
    }

    static async updateCard(memberId, filename) {
        return MemberData.update(
            { card: filename },
            { where: { memberId } }
        );
    }

    static async findDetailByMemberId(memberId){
        return await MemberData.findOne({
            where: { memberId },
            include:[
                { model: Province, as: 'province', attributes: ['province'] },
                { model: District, as: 'district', attributes: ['remark'] },
                { model: Subdistrict, as: 'subdistrict', attributes: ['subdistrict'] },
                { model: Village, as: 'village', attributes: ['village'] },
                { model: Job, as: 'job', required: false },
                { model: MaritalStatus, as: 'marital', required: false },
                { model: EducationLevel, as: 'education', required: false },
                { model: Member, as: 'member', attributes: ['registerDate','statusId'],
                    include:[
                        { model: SystemSource,as:'source',attributes:['source']},
                        { model: SystemChanel,as:'chanel',attributes:['chanel']},
                        { model: MemberStatus,as:'status',attributes:['status']}
                    ]
                 },
            ]
        })
    }

}

export default MemberRepository;