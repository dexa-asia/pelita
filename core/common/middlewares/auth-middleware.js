import cache from '#root/common/config/cache';
import User from '#root/common/models/user';
import MemberData from '#root/common/models/member_data';
import Member from '#root/common/models/member';
import Employee from '#root/common/models/employee';
import Branch from '#root/common/models/branch';

class authMiddleware {
    constructor(name) {
        this.name = name;
    }
    //validate for admin access
    validateBackend = async (req, res, next) => {
        let token = req.headers.token;
        
        if (!token) {
          return res.status(401).json({ error: 'Illegal Connection' });
        }
      
        try {
          const user = await User.findOne({
            where: {
              accessToken: token,
              isAdmin:true,
            },
            include:[
              {
                  model:MemberData,
                  as:'data',
                  attributes:['name'],
              },
              
             ],
          });
      
          if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
          }

          const cachedOrigin = cache.get(token);
          if (cachedOrigin) {
            console.log('\x1b[35m%s\x1b[0m', "🔹Verification loaded from cache");
            console.log('\x1b[35m%s\x1b[0m', cache.getStats());
            
            req.origin = cachedOrigin;
            return next(); // ✅ Skip DB lookup
          }
      
          const origin = {
            "memberId": user.memberId,
            "name":user.data.name,
            "token": token,
            "ip": req.socket.remoteAddress,
          };
          
          // 🔹 Store in cache for future requests
          cache.set(token, origin, 300); // 300s = 5 minutes TTL
          
          req.origin = origin;
          next();
        } catch (error) {
          console.error('Error during authentication:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      };


      //validate for admin access
    validateStaff = async (req, res, next) => {
        let token = req.headers.token;
        
        if (!token) {
          return res.status(401).json({ error: 'Illegal Connection' });
        }
      
        try {
          const user = await User.findOne({
            where: {
              accessToken: token,
            },
            include:[
              {
                  model:MemberData,
                  as:'data',
                  attributes:['name'],
              },
            ],
            attributes:['memberId']
          });
      
          if (!user) {
            return res.status(401).json({ error: 'Unauthorized' });
          }

          const cachedOrigin = cache.get(token);
          if (cachedOrigin) {
            console.log('\x1b[35m%s\x1b[0m', "🔹Verification loaded from cache");
            console.log('\x1b[35m%s\x1b[0m', cache.getStats());
            
            req.origin = cachedOrigin;
            return next(); // ✅ Skip DB lookup
          }
          else{
            const ep = await Employee.findOne({
              where:{
                memberId:user.memberId
              },
              attributes:['empId','branchId']
            })

            const origin = {
              "memberId": user.memberId,
              "name":user.data.name,
              "token": token,
              "branchId":ep.branchId,
              "empId":ep.empId,
              "ip": req.socket.remoteAddress,
            };
            
            // 🔹 Store in cache for future requests
            cache.set(token, origin, 300); // 300s = 5 minutes TTL
            
            req.origin = origin;
            next();

          }
      
          
        } catch (error) {
          console.error('Error during authentication:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      };

}

export default authMiddleware;6868