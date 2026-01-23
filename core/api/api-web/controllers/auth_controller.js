import memberService from "#domain/member/member.service.js";
import MemberViewService from "#domain/member/member.view.service.js";

const auRegister= async(req,res)=>{
    try{
        req.data.sourceId = 1;
        req.data.chanelId = 1;
        
        const result = await memberService.register(req.data)
        res.status(201).json({
            status:68,
            data:result,
        })
    }
    catch (err){
        res.status(400).json({
            "status": 60,
            "message":err.message,
        });
    }   
}

const auViewProcessed = async(req,res)=>{
    try{
        const result = await MemberViewService.viewDetail(req.data)
        res.status(200).json({
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

const auCheckStatus = async(req,res)=>{
     try{
        const result = await MemberViewService.findByNik(req.data.nik)
        res.status(200).json({
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

const auCheckMobile = async(req,res)=>{
     try{
        const result = await MemberViewService.findByMobile(req.data.mobile)
        res.status(200).json({
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
    auRegister,auViewProcessed,auCheckStatus,auCheckMobile
}