import UserRole from "#domain/user/user_role.js"
import Role from "#domain/user/role.js";
class UserRoleRepository{
    
    create(data){
      return UserRole.create(data)
    }

    remove(id) {
      return UserRole.destroy({where:{id}});
    }

    findAll(where = {}, options = {}) {
      return UserRole.findAll({
        where,
        attributes: options.attributes,
        include: [
          { model:Role,as:'role',attributes:['role','description']}
        ],
        order: options.order || [['roleId']]
      });
    }

    getAll() {
      return UserRole.findAll({
        include: [
          { model:Role,as:'role',attributes:['role','description']}
        ],
        order: [['roleId']]
      });
    }
 
}

export default new UserRoleRepository;