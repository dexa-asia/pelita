
const siteIndex = async(req,res)=>{
    try{
      
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
        /*
        const result = await User.loginAdmin(req.data.userName,req.data.password);
        if (result.status==68){
            res.json({
                "status":68,
                "data":result.data,
                "message":"authorization succeed",
            })
        } 
        else{
            res.json({
                "status":60,
                "message":result.message,
            })
        }
       */
    }
    catch (err){
        console.log(err);
    }
}


export{
    siteIndex,siteAuth
}