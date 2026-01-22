
import authService from "#domain/user/authorization.service.js";
const siteIndex = async(req,res)=>{
    try{
        
        
        res.status(200).json({
            status: 68,
            message:"welcome to terracoop",
            data:{}
        });
    }
    catch (err){
        res.json({
            "status": 60,
            "message":err.message,
        });
    }   
}

const siteAuth = async (req,res)=>{
    try{
        
        const result = await authService.loginAdmin(req.data.userName,req.data.password);   
        res.status(200).json({
            "status":68,
            "data":result
        });
    }
    catch (error){
        res.status(401).json({
            "status":60,
            "message":error.message,
        })
    }
}


export{
    siteIndex,siteAuth
}