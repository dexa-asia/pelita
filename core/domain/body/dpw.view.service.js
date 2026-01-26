import DPWRepository from "#domain/body/dpw.repository.js";
import { Op } from "sequelize";
class DPWViewService{
    static async listAll(payload){
        const where = {}
        let result;
        if (payload.statusRange) {
            where.statusId = {
                [Op.between]: payload.statusRange
            }
            result = await DPWRepository.findAll(where)
        }
        else{
            result = await DPWRepository.findAll(payload);
        }
        
        
        return result.map(w=>({
            id:w.id,
            code:w.code,
            province:w.province.province,
            status:w.status.status,
            isOffice:w.isOffice,
            isStaff:w.isStaff,
            memberCount:w.memberCount,
            staffCount:w.staffCount,
            leader:'-',
        }))
    }

    static async view(code){
        const result = DPWRepository.findByCode(code);
        return result;
    }
}
export default DPWViewService;