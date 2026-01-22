import OneSecurity from "#utils/one.security.js";
import db from "#config/database.js";
import { QueryTypes } from "sequelize";

class AuthorizationService{

    static async loginAdmin(userName,password){
        try{

            const user = await db.query("SELECT user_name,email,privilege,`user`.`member_id`,name,access_token,is_enabled,primary_auth,verification_auth FROM `user` JOIN `member_data` ON `user`.`member_id`=`member_data`.`member_id` JOIN `user_privilege` ON `user`.`priv_id`=`user_privilege`.`id` WHERE `user_name`=:pusername AND is_admin=1", { 
                type: QueryTypes.SELECT,
                replacements: {
                pusername: userName,
                },
            });

            if(user == null){
                throw new Error('Invalid Username');
            }

            const checkPassResult = await OneSecurity.checkPassword(password,user[0].primary_auth,user[0].verification_auth);
            if(!checkPassResult){
                throw new Error('Invalid Password');
            }

            return {
                name : user[0].name,
                privilege : user[0].privilege,
                accessToken : user[0].access_token,
                memberId : user[0].member_id,
            }
        }
        catch(error){
            throw error;
        }
    }
}

export default AuthorizationService;