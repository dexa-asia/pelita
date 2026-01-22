import cache from '#config/cache.js';
import User from '#domain/user/user.js';
import MemberData from '#domain/member/member_data.js';

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



}

export default authMiddleware;