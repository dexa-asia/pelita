import MemberStatus from "#domain/member/member_status.js";
import MemberLevel from "#domain/member/member_level.js";
import Job from "#domain/models/job.js";
import MaritalStatus from "#domain/models/marital_status.js";
import SystemChanel from "#domain/models/system_chanel.js";
import SystemSource from "#domain/models/system_source.js";


class DatasetService{
    
    
    static async getMemberStatus(){
        return await MemberStatus.findAll({
            attributes:['id','type']
        })
    }

    static async getMemberLevel(){
        return await MemberLevel.findAll({
            attributes:['id','level']
        })
    }

    static async getJob(){
        return await Job.findAll({
            attributes:['id','job']
        })
    }

    static async getMaritalStatus(){
        return await MaritalStatus.findAll({
            attributes:['id','marital']
        })
    }

    static async getSystemChanel(){
        return await SystemChanel.findAll({
            attributes:['id','chanel']
        })
    }

    static async getSystemSource(){
        return await SystemSource.findAll({
            attributes:['id','source']
        })
    }
}

export default DatasetService