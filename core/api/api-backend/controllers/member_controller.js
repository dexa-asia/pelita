import memberViewService from "#domain/member/member.view.service.js";
const mbIndex = async(req,res)=>{
    try{
        const result = await memberViewService.listAll(req.data,req.origin)
        
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

const mbView = async(req,res)=>{
    try{
        const result = await memberViewService.viewDetail(req.data,req.origin)
        
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
    mbIndex,mbView
}