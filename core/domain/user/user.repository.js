import MemberData from "#domain/member/member_data.js";
import User from "#domain/user/user.js"
import UserPrivilege from "#domain/user/user_privilege.js"
class UserRepository{
    static async findAll(){
        return await User.findAll({
            include:[
                { model: UserPrivilege,as:'privilege',attributes:['privilege']},
                { model: MemberData, as:'data',attributes:['name','mobile']}
            ]
        })
    }
    static async findByMemberId (memberId){
        return await User.findOne({
            where:{memberId:memberId},
            include:[
                { model: UserPrivilege,as:'privilege',attributes:['privilege']},
                { model: MemberData, as:'data',attributes:['name','mobile']}
            ]
        })
    }

    static async setAdminStatus(memberId, status) {
        const [affectedRows] = await User.update(
            { isAdmin: !!status },
            { where: { memberId } }
        );

        if (affectedRows === 0) {
            throw new Error('User not found or status unchanged');
        }

        return affectedRows;
    }

    static async setStaffStatus(memberId, status) {
        console.log(memberId + " "+ status)
        const [affectedRows] = await User.update(
            { isStaff: !!status },
            { where: { memberId } }
        );

        if (affectedRows === 0) {
            throw new Error('User not found or status unchanged');
        }

        return affectedRows;
    }

    static async setAccessStatus(memberId, status) {
        console.log(memberId + " "+ status)
        const [affectedRows] = await User.update(
            { isEnabled: !!status },
            { where: { memberId } }
        );

        if (affectedRows === 0) {
            throw new Error('User not found or status unchanged');
        }

        return affectedRows;
    }
}

export default UserRepository;