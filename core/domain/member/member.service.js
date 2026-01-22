import OneDates from "#utils/one.dates.js";
import OneSecurity from "#utils/one.security.js";
import OneUtils from "#utils/one.utils.js";
import Member from "#domain/member/member.js";
import MemberData from "#domain/member/member_data.js";
import User from "#domain/user/user.js";
import db from "#config/database.js";

import MemberRepository from '#domain/member/member.repository.js';
class MemberService{
 
    static async register(payload){

        let transaction;
        try{
            const today     = OneDates.getCurrentDateTime();
            const memberId  = await Member.genMemberId();
            const levelId   = 6;//default anggota
            const statusId  = 2;//default active
            const classId   = 2;//anggota
            const age       = OneDates.calculateAge(payload.birthDate);
            const mobile    = OneUtils.normalizePhone(payload.mobile);
            const email     = payload.email!==null?payload.email.toLowerCase():OneBizz.genRandomString(16)+"@terracoop.net";
            
            const crypted   = await OneSecurity.genPassword(today);
            const token     = await OneSecurity.genAccessToken(mobile);

            const member = Member.build({
                memberId,
                levelId,
                statusId,
                classId,
                registerDate:today,
                sourceId:payload.sourceId,
                chanelId:payload.chanelId,
                lastUpdate:today,
            })

            const memberData = MemberData.build({
                memberId,
                name:payload.name.toUpperCase(),
                nik:payload.nik,
                address: payload.address?.toUpperCase(),
                provCode: payload.provCode,
                disCode: payload.disCode,
                sudCode: payload.sudCode,
                vilCode: payload.vilCode,
                mobile:mobile,
                gender:payload.gender,
                birthPlace: payload.birthPlace,
                birthDate: payload.birthDate,
                jobId:payload.jobId,
                marId:payload.marId,
                avatar: "no_photo.png",
                card: payload.nik+".png",
                age:age,
                lastUpdate:today
            })

            const user = User.build({
                memberId,
                userName: mobile,
                privId: 80,
                email: email,
                primaryAuth: crypted.salt,
                verificationAuth: crypted.hash,
                createdAt: today,
                lastUpdate: today,
                accessToken: token,
                isEnabled: true,
            })

            transaction = await db.transaction()
            await member.save({transaction})
            await memberData.save({transaction})
            await user.save({transaction})
            await transaction.commit()

            return {
                memberId,
                name:memberData.name,
                mobile,
            }

        }
        catch (error) {
            if (transaction && !transaction.finished) {
                await transaction.rollback();
            }
            throw error;
        }
    }
    
    static async updateCard(memberId, filename) {
        if (!memberId) {
            throw new Error('MemberId is required');
        }

        const member = await MemberRepository.findByMemberId(memberId);
        if (!member) {
            throw new Error('Member not found');
        }

        return await MemberRepository.updateCard(memberId, filename);
    }



}

export default MemberService;