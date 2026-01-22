import UserRepository from "./user.repository";

class UserViewService{
    static async listAll(){
        const result = await UserRepository.findAll()
        return result.map(u=>({
            id:u.id,
            memberId:u.memberId,
            userName:u.userName,
            privilege:u.privilege.privilege,
            email:u.email,
            isAdmin:u.isAdmin,
            isEnabled:u.isEnabled,
            isStaff:u.isStaff
        }))
    }
     
    static async view(memberId){
        const u = await UserRepository.findOne(memberId)
        return {
            id:u.id,
            memberId:u.memberId,
            userName:u.userName,
            privilege:u.privilege.privilege,
            email:u.email,
            isAdmin:u.isAdmin,
            isEnabled:u.isEnabled,
            isStaff:u.isStaff
        }
    }
}

export default UserViewService;