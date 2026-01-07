import bcrypt from 'bcrypt';
import crypto from 'crypto';

class OneBizz {
  static instance;

  constructor() {
    if (OneBizz.instance) {
      return OneBizz.instance;
    }
    OneBizz.instance = this;
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

  genRandomString(length) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
  }

  genRandomNumber(length) {
    let result = '';
    for (let i = 0; i < length; i++) {
      result += Math.floor(Math.random() * 10); // generates a digit 0-9
    }
    return result;
  }


  normalizePhone(phone) {
    return phone.replace(/\s+/g, '').replace(/^08/, '628');
  }


  decodePhone(phone) {
    if (phone !== undefined && phone !==null) {
      const modifiedPhone = phone.replace(/^628/, '08');
      return modifiedPhone.match(/.{1,4}/g).join(' ');
    }
    return '';
  }

  extractPhone(phone) {
    if (phone !== undefined) {
      return phone
        .replace(/^\+62/, '0') // Replace "+62" with "0"
        .replace(/[\s-_]/g, '') // Remove spaces, dashes, and underscores
        .replace(/[^\d]/g, ''); // Remove any non-numeric characters
    }
    return '';
  }

  indoDayDate(tgl) {
    const date = new Date(tgl);
    const arrayHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const hari = arrayHari[date.getDay()];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${hari} ${day}/${month}/${year}`;
  }

  indoDay(tgl) {
    const date = new Date(tgl);
    const arrayHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    return arrayHari[date.getDay()];
  }

  indoDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  indoTimeLine(tgl) {
  const date = new Date(tgl);
  const arrayHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const arrayBulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const hari = arrayHari[date.getDay()];
  const year = date.getFullYear();
  const month = arrayBulan[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');

  return `${hari} ${day} ${month} ${year}`;
}


  formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  formatDateTime(dateString) {
    if (dateString == null) {
      return null;
    }
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getTimeOnly(time) {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  }

  parseTimeOnly(time) {
    const date = new Date(time);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCurrentMonthShort() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}${month}`;
  }

  getMonthRange() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const begin = `${year}-${month}-01`;
    const today = `${year}-${month}-${day}`;
    const end = `${year}-${month}-31`;
    return { begin, today, end };
  }

  cleanFileName(rawname) {
    try {
      return rawname.replace(/\s+/g, '_').replace(/([^\w\s\d\-_~,;:\[\]\(\).])/g, '').toLowerCase();
    } catch {
      return '';
    }
  }

  embedYoutube(url) {
    return url.replace(/watch\?v=/, 'embed/');
  }

  trimWord(text, n) {
    const textWithoutTags = text.replace(/<[^>]+>/g, '');
    return textWithoutTags.split(/\s+/).slice(0, n).join(' ');
  }

  formatAccount(str) {
    if (!str) return '';
    const positions = [2, 6, 10];
    return [...str].reduce(
      (formatted, char, index) => formatted + char + (positions.includes(index + 1) ? '.' : ''),
      ''
    ).replace(/\.$/, '');
  }

  formatPrice(price) {
    if (isNaN(price)) {return 'invalid'+ price;}
    const numericPrice = parseInt(price);
    const formattedPrice = numericPrice.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping:true
    });
    return formattedPrice;
  }

  calculateAge(birthDate) {
    if (!birthDate) return null;

    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();

    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();

    // Jika ulang tahun belum terjadi tahun ini → kurangi 1
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
  }
}




export default new OneBizz();
