import memberService from "#domain/member/member.service.js";

const mbUploadCard=async(req,res)=>{
    try {
        if (!req.file) {
            return res.status(400).json({
                status: 61,
                message: 'No file uploaded'
            });
        }

        let memberId;
        if(req.data.memberId!==undefined){
            memberId=req.data.memberId
        }
        else{
            memberId = await memberService.viewByNik(req.data.nik)
        }
        const result = await memberService.updateCard(
            memberId,
            req.uploadedFilename
        );

        res.json({
            status: 68,
            message: 'Member Card Successfully Uploaded',
            data: result
        });

  } catch (err) {
        res.status(400).json({
            status: 60,
            message: err.message
        });
  }
}
export{
    mbUploadCard
}