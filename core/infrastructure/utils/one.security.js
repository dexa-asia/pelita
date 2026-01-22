import bcrypt from 'bcrypt';
import crypto from 'crypto';
class OneSecurity{
    static instance;
  
    constructor() {
      if (OneSecurity.instance) {
        return OneSecurity.instance;
      }
      OneSecurity.instance = this;
    }

    async genPassword(password) {
      const saltRounds = 6;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(password, salt);
      return { salt, hash };
    }

    async checkPassword(password, salted, hashed) {
      try {
        const result = await bcrypt.hash(password, salted);
        return result === hashed;
      } catch (error) {
        console.error('Error hashing password:', error);
        return false;
      }
    }

    async genAccessToken(username) {
      const length = 45;
      const par = Buffer.from(username).toString('base64');
      const p1 = crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
      return p1 + par;
    }

    async genRandomString(length) {
      return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
    }

}
export default new OneSecurity()