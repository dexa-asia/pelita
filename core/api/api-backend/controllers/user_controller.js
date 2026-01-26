import UserViewService from "#domain/user/user.view.service.js";
import UserService from "#domain/user/user.service.js";

const userIndex=async(req,res)=>{
    try{
        const result = await UserViewService.listAll()
        
        res.json({
            status:68,
            data:result,
        })
    }
    catch (err){
        res.json({
            "status": 60,
            "message":err.message,
        });
    }   
}

const userView=async(req,res)=>{
    try{
        const result = await UserViewService.viewUserWithRoles(req.data.memberId)
        
        res.json({
            status:68,
            data:result,
        })
    }
    catch (err){
        res.json({
            "status": 60,
            "message":err.message,
        });
    }   
}

const usrSetAccess=async(req,res)=>{
    try{
        const result = await UserService.setAccess(req.data);
        res.json({
            status:68,
            data:result
        })
    }
    catch(err){
        res.json({
            "status":60,
            "message":err.message,
        })
    }
}


const usrSetAdminStatus=async(req,res)=>{
    try{
        const result = await UserService.setAdmin(req.data);
        res.json({
            status:68,
            data:result
        })
    }
    catch(err){
        res.json({
            "status":60,
            "message":err.message,
        })
    }
}

const usrSetStaffStatus=async(req,res)=>{
    try{
        const result = await UserService.setStaff(req.data);
        res.json({
            status:68,
            data:result
        })
    }
    catch(err){
        res.json({
            "status":60,
            "message":err.message,
        })
    }
}

const usrRoleList=async(req,res)=>{
    try{
        const result = await UserViewService.listRole();  
        return res.status(200).json({
            "status": 68,
            "data":result,
        });
    }
    catch(err){
        res.json({
            "status":60,
            "message":err.message,
        })
    }
}

const usrRoleAdd=async(req,res)=>{
    try{
        const result = await UserService.addRole(req.data);  
        return res.status(200).json({
            "status": 68,
            "data":result,
        });
    }
    catch(err){
        res.json({
            "status":60,
            "message":err.message,
        })
    }
}

const usrRoleRemove=async(req,res)=>{
    try{
        const result = await UserService.removeRole(req.data,req.origin);  
        return res.status(200).json({
            "status": 68,
            "data":result,
        });
    }
    catch(err){
        res.json({
            "status":60,
            "message":err.message,
        })
    }
}

const usrSetPassword=async(req,res)=>{
    try{
        const result = await UserService.changePassword(req.data,req.origin);  
        return res.status(200).json({
            "status": 68,
            "data":result,
        });
    }
    catch(err){
        res.json({
            "status":60,
            "message":err.message,
        })
    }
}


export{
    userIndex,userView,usrRoleList,usrRoleAdd,usrRoleRemove,
    usrSetAdminStatus,usrSetStaffStatus,usrSetPassword,usrSetAccess
}