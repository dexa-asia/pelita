
import Subdistrict from '#common/models/subdistrict';
import District from '#common/models/district';
import Province from '#common/models/province';
import Village from '#common/models/village';
import Job from '#common/models/job';
import MemberClass from '#root/common/models/member_class';

const dsIndex= async(req,rs)=>{
    try{

    }
    catch (err){
        res.json({
            "status": 60,
            "message":err.message,
        });
    }   
}


const dsProvince= async(req,res)=>{
    try{
        const ps = await Province.findAll({
            order:[['province']]
        })
        res.json({
            status:68,
            data:ps,
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
        const ds = await District.findAll({
            where:whereClause,
            include:[
                {
                    model:Province,
                    as:'province',
                    attributes:['province']
                }
            ],
            order:[['district']],
        })

        const arrData = ds.map(d=>({
            id:d.id,
            code:d.code,
            district:d.district,
            province:d.province.province,
            remark:d.remark,
        }))

        res.json({
            status:68,
            data:arrData,
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
        const sb = await Subdistrict.findAll({
            where:whereClause,
            include:[
                {
                    model:Province,
                    as:'province',
                    attributes:['province']
                },
                {
                    model:District,
                    as:'district',
                    attributes:['district']
                }
            ],
            order:[['subdistrict']],
        })

        const arrData = sb.map(s=>({
            id:s.id,
            code:s.code,
            subdistrict:s.subdistrict,
            district:s.district.district,
            province:s.province.province,
            remark:s.remark,
        }))

        res.json({
            status:68,
            data:arrData,
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
        const sb = await Village.findAll({
            where:whereClause,
            include:[
                {
                    model:Province,
                    as:'province',
                    attributes:['province']
                },
                {
                    model:District,
                    as:'district',
                    attributes:['district']
                }
            ],
            order:[['village']],
        })

        const arrData = sb.map(s=>({
            id:s.id,
            code:s.code,
            village:s.village,
            subdistrict:s.subdistrict,
            district:s.district.district,
            province:s.province.province,
            remark:s.remark,
        }))

        res.json({
            status:68,
            data:arrData,
        })
    }
    catch (err){
        res.json({
            "status": 60,
            "message":err.message,
        });
    }   
}

const dsMemberClass= async(req,res)=>{
    try{
        const mcs = await MemberClass.findAll({
            attributes:['id','class']
        })

        res.json({
            status:68,
            data:mcs,
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
        const jobs = await Job.findAll({
            order:[['job','asc']]
        })
        res.json({
            status:68,
            data:jobs,
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
    dsIndex,dsProvince,dsDistrict,dsSubdistrict,dsVillage,
    dsMemberClass,dsJob,
}