import Province from "#domain/area/province.js"
import District from "#domain/area/district.js"
import Subdistrict from "#domain/area/subdistrict.js"
import Village from "#domain/area/village.js"

class DatasetAreaService{

    static async getProvince(){
        return await Province.findAll({
            order:[['province']]
        })
    }

    static async getDistrict(provCode){
        return await District.findAll({
            where:{provCode:provCode},
            order:[['district']],
            attributes:['id','code','district','remark']
        })
    }

    static async getSubdistrict(disCode){
        return await Subdistrict.findAll({
            where:{disCode:disCode},
            order:[['subdistrict']],
            attributes:['id','code','subdistrict']
        })
    }

    static async getVillage(sudCode){
        return await Village.findAll({
            where:{sudCode:sudCode},
            order:[['village']],
            attributes:['id','code','village']
        })
    }
}
export default DatasetAreaService