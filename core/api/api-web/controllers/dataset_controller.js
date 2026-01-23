import areaService from "#domain/dataset/dataset.area.service.js"
import dataService from "#domain/dataset/dataset.service.js"

const dsProvince= async(req,res)=>{
    try{
        const result = await areaService.getProvince()
        
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

const dsDistrict= async(req,res)=>{
    try{
        let whereClause={}
        whereClause.provCode= req.data.provCode;
        const ds = await areaService.getDistrict(req.data.provCode)

        res.json({
            status:68,
            data:ds,
        })
    }
    catch (err){
        res.json({
            "status": 60,
            "message":err.message,
        });
    }   
}


const dsSubdistrict= async(req,res)=>{
    try{
        let whereClause={}
        whereClause.disCode= req.data.disCode;
        const result = await areaService.getSubdistrict(req.data.disCode)
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

const dsVillage= async(req,res)=>{
    try{
        let whereClause={}
        whereClause.sudCode= req.data.sudCode;
       const result = await areaService.getVillage(req.data.sudCode)
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

const dsJob= async(req,res)=>{
    try{
        const result = await dataService.getJob()
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

const dsMarital= async(req,res)=>{
    try{
        const result = await dataService.getMaritalStatus()
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

const dsEducation= async(req,res)=>{
    try{
        const result = await dataService.getEducation()
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



export{
    dsProvince,dsDistrict,dsSubdistrict,dsVillage,dsJob,dsMarital,dsEducation
}