
class OneUtils {
  static instance;

  constructor() {
    if (OneUtils.instance) {
      return OneUtils.instance;
    }
    OneUtils.instance = this;
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

  
}

export default new OneUtils();
