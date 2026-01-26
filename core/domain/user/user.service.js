import userRepo from "#domain/user/user.repository.js";
import UserRoleRepository from '#domain/user/user_role.repository.js'
class UserService{
    static async setAdmin(payload){
        try{
            return await userRepo.setAdminStatus(payload.memberId,payload.state)
        }
        catch(error){
            throw error;
        }
    }

    static async setStaff(payload){
        try{
            return await userRepo.setStaffStatus(payload.memberId,payload.state)
        }
        catch(error){
            throw error;
        }
    }

    static async changePassword(payload){
        try{
            return await userRepo.changePassword(payload.memberId)
        }
        catch(error){
            throw error;
        }
    }

     static async addRole(payload){
            try{
                UserRoleRepository.create({
                    userId:payload.userId,
                    roleId:payload.roleId
                })
                return payload;
            }
            catch(error){
                throw error;
            }
        } 
    
}

export default UserService;