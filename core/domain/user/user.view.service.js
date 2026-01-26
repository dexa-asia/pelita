import UserRepository from "#domain/user/user.repository.js";
import UserRoleRepository from "#domain/user/user_role.repository.js";
import Role from "#domain/user/role.js";
import OneUtils from "#utils/one.utils.js";

class UserViewService{
    static async listAll(){
        const result = await UserRepository.findAll()
        return result.map(u=>({
            id:u.id,
            memberId:u.memberId,
            name:u.data.name,
            userName:u.userName,
            privilege:u.privilege.privilege,
            email:u.email,
            isAdmin:u.isAdmin,
            isEnabled:u.isEnabled,
            isStaff:u.isStaff
        }))
    }
     
    static async view(memberId){
        const u = await UserRepository.findByMemberId(memberId)
        return {
            id:u.id,
            memberId:u.memberId,
            name:u.data.name,
            userName:u.userName,
            mobile:OneUtils.decodePhone(u.data.mobile),
            privilege:u.privilege.privilege,
            email:u.email,
            isAdmin:u.isAdmin,
            isEnabled:u.isEnabled,
            isStaff:u.isStaff
        }
    }

    static async viewUserWithRoles(memberId){
        try{
            const u = await UserRepository.findByMemberId(memberId);
            const roles = await UserRoleRepository.findAll({userId:u.id})

            return {
                'id':u.id,
                'userName':u.userName,
                'email':u.email,
                'lastUpdate':u.lastUpdate,
                'privilege':u.privilege.privilege,
                'name':u.data.name,
                'mobile':OneUtils.decodePhone(u.data.mobile),
                'isEnabled':u.isEnabled,
                'memberId':u.memberId,
                'isAdmin':u.isAdmin,
                'isStaff':u.isStaff,
                'tfaToken':u.tfaToken,
                'roles':roles.map(r=>({
                    id:r.id,
                    roleId:r.roleId,
                    role:r.role.role,
                    description:r.role.description
                }))
            }
        }
        catch(error){
            throw error;
        }
    }

   
    static async listRole(){
         try{
            const rows = await Role.findAll({
                order:[['groupId']]
            })
            return rows.map(r=>({
                id:r.id,
                role:r.role,
                description:r.description
            }))
        }
        catch(error){
            throw error;
        }
    }

    static async removeRole(payload){
        try{
            return UserRoleRepository.remove(payload.id)
        }
        catch(error){
            throw error;
        }
    }

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

    static async setAccess(payload){
        try{
            return await userRepo.setAccessStatus(payload.memberId,payload.state)
        }
        catch(error){
            throw error;
        }
    }
}

export default UserViewService;