import DPWViewService from "#domain/body/dpw.view.service.js";

const dpwIndex = async(req,res)=>{
    try{
        const result = await DPWViewService.listAll(req.data)
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
    dpwIndex,
}