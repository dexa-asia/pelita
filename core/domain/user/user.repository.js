import User from "#domain/user/user.js"
import UserPrivilege from "#domain/user/user_privilege.js"
class UserRepository{
    static async findAll(){
        return await User.findAll({
            include:[
                { model: UserPrivilege,as:'privilege',attributes:['privilege']}
            ]
        })
    }
    static async findbyMemberId (memberId){
        return await User.findOne({
            where:{memberId:memberId},
            include:[
                { model: UserPrivilege,as:'privilege',attributes:['privilege']}
            ]
        })
    }
}

export default UserRepository;