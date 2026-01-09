
/**
 * dateString eg 2024-01-30
 * returns eg 30nd Jan 2024
 */
export function formatDate(dateString) {
    if (!dateString) {
        return '';
    }

    // Extract only the date part
    const [datePart] = dateString.split(' ');
    const [year, month, dayStr] = datePart.split('-');

    const day = parseInt(dayStr, 10);

    const getOrdinalSuffix = (d) => {
        if (d > 3 && d < 21) return 'th'; // 11th–13th
        switch (d % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthName = monthNames[parseInt(month, 10) - 1];
    const suffix = getOrdinalSuffix(day);

    return `${day}${suffix} ${monthName} ${year}`;
}


export function formatDateTime(dateString) {

    if (!dateString) {
        return '';
    }
    
    const dateParts = dateString.split('T')[0].split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const dayParts = dateParts[2].split(' ')
    const day = dayParts[0]
    const time = dayParts[1]
    
    const monthNumber = parseInt(dateParts[1]); // Parse month number as integer    
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const monthName = monthNames[monthNumber - 1]
    const formattedDate = `${day}/${month}/${year} ${time}`;
    return formattedDate;

    /*
    const timeParts = dateString.split('T')[1].split('.')[0].split(':');

    

    const hour = timeParts[0];
    const minute = timeParts[1];

    const formattedDate = `${day}/${month}/${year} ${hour}:${minute}`;
    return formattedDate;
    */
  }

/**
 * 
 * price eg 25000.00
 * return eg 25.000
 */
export function formatPrice(price) {
    console.log("here is "+typeof price); 
    if (isNaN(price)) {return 'invalid'+ price;}
    const numericPrice = parseInt(price);
    const formattedPrice = numericPrice.toLocaleString("id-ID", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
        useGrouping:true
    });
    return formattedPrice;
}

export function formatAccount(str) {
    if(str===undefined ){
        return "";
    }
    let formatted = "";
    let positions = [2,6,10];

    for (let i = 0; i < str.length; i++) {
        formatted += str[i];
        if (positions.includes(i + 1)) {
            formatted += ".";
        }
    }

    if (formatted.endsWith(".")) {
        formatted = formatted.slice(0, -1);
    }

    return formatted;
}

export function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



export function formatUtcToWib(utcString) {
    if (!utcString) return '-';

    const date = new Date(utcString);

    const datePart = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(date);

    const timePart = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hourCycle: 'h23'
    })
        .format(date)
        .replace('.', ':'); // fix locale separator

    return `${datePart}, ${timePart}`;
}


