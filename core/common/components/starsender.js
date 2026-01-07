import axios from 'axios';
import OneBizz from '../services/onebizz.js';


class StarSender {
    constructor() {
        if (!StarSender.instance) {
            //this.apiKey = 'f51b45bf-57ae-4381-ba81-c5db679d62b9';
            //this.apiKey = '32b8bd3a-8734-46e6-b202-8fc082136ac5';
            //this.apiKey = 'dc1e4197-5478-49d5-9f78-9d8c330ad678';
            this.apiKey ='d42f9005-d250-4e67-9337-21789de2ef92';
            this.endpoint = 'https://api.starsender.online/api/send';
            StarSender.instance = this;
        }
        return StarSender.instance;
    }

    async sendMessage(destination, message) {
        try {
            
            const payload = {
                messageType: 'text',
                to: destination,
                body: message,
                delay: 0
            };
            //console.log("____ sending whatsapp to :"+destination+" message :"+ message+ " ref :"+ this.apiKey);
            
            const response = await axios.post(this.endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey,
                },
            });

            console.log(response.data);
            return response.data.message;
        } catch (error) {
            if (error.response) {
                console.log(error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                throw new Error('Request failed');
            }
        }
    }

    async sendWelcome(name,mobile,type,nia) {
        try {
            
            const message ='*Selamat Bergabung dengan KSPPS BMT ASA Nusantara*\n\nYth '+name +', anda telah terdaftar di Koperasi BMT ASA Nusantara sebagai '+ type+' Nomor Registrasi Anda '+ nia +'\n\nTingkatkan Saldo anda dan nikmati berbagai produk BMT ASA melalui Simpanan Ummat, Simpanan Pendidikan, Simpanan Qurban dan Simpanan Lainnya. Aktifkan Saldo Bisnis Anda agar dapat beli pulsa, bayar berbagai macam tagihan dan transfer dana ke rekening bank';
            const payload = {
                messageType: 'text',
                to: mobile,
                body: message,
                delay: 0
            };

            const response = await axios.post(this.endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey,
                },
            });

            console.log(response.data);
            return response.data.message;
        } catch (error) {
            if (error.response) {
                console.log(error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                throw new Error('Request failed');
            }
        }
    }

    async sendReceipt(name,mobile,product,accountNo,accountName,amount,lastBalance,officer) {
        try {
            
            const message ='*Penyetoran Dana Berhasil*\n\nYth '+name +',\n'+'Terimakasih telah melakukan penyetoran dana ke Rekening Simpanan\n\nNomor Rekening : '+accountNo+'\nAtas Nama : '+ accountName+'\nJenis Rekening : '+ product+'\nJumlah Setor : '+ OneBizz.formatPrice(amount)+'.\nSaldo Akhir :'+ OneBizz.formatPrice(lastBalance)+'\nPetugas : '+officer +'\n\nTingkatkan Saldo anda dan nikmati berbagai produk BMT ASA melalui Simpanan Ummat, Simpanan Pendidikan, Simpanan Qurban dan Simpanan Lainnya. Aktifkan Saldo Bisnis Anda agar dapat beli pulsa, bayar berbagai macam tagihan dan transfer dana ke rekening bank';
            const payload = {
                messageType: 'text',
                to: mobile,
                body: message,
                delay: 0
            };

            const response = await axios.post(this.endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey,
                },
            });

            console.log(response.data);
            return response.data.message;
        } catch (error) {
            if (error.response) {
                console.log(error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                throw new Error('Request failed');
            }
        }
    }

    async sendReceiptWithdraw(name,mobile,product,accountNo,accountName,amount,lastBalance,officer) {
        try {
            
            const message ='*Informasi Penarikan Dana*\n\nYth '+name +',\n'+'Anda telah melakukan penarikan dana dari Simpanan\n\nNomor Rekening : '+accountNo+'\nAtas Nama : '+ accountName+'\nJenis Simpanan : '+ product+'\nJumlah Penarikan : '+ OneBizz.formatPrice(amount)+'.\nSaldo Akhir :'+ OneBizz.formatPrice(lastBalance)+'\nPetugas : '+officer +'\n\nTingkatkan Saldo anda dan nikmati berbagai produk BMT ASA melalui Simpanan Ummat, Simpanan Pendidikan, Simpanan Qurban dan Simpanan Lainnya. Aktifkan Saldo Bisnis Anda agar dapat beli pulsa, bayar berbagai macam tagihan dan transfer dana ke rekening bank';
            const payload = {
                messageType: 'text',
                to: mobile,
                body: message,
                delay: 0
            };

            const response = await axios.post(this.endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey,
                },
            });

            console.log(response.data);
            return response.data.message;
        } catch (error) {
            if (error.response) {
                console.log(error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                throw new Error('Request failed');
            }
        }
    }

    async sendPassword(name,mobile,userName,password) {
        try {
            
            const message ='*Permintaan Reset Password*\n\nYth '+name +', Username dan Password anda telah direset menjadi\n\nUsername :'+userName+' \nPassword : '+ password+'\n\nTingkatkan Saldo anda dan nikmati berbagai produk BMT ASA melalui Simpanan Ummat, Simpanan Pendidikan, Simpanan Qurban dan Simpanan Lainnya. Aktifkan Saldo Bisnis Anda agar dapat beli pulsa, bayar berbagai macam tagihan dan transfer dana ke rekening bank';
            const payload = {
                messageType: 'text',
                to: mobile,
                body: message,
                delay: 0
            };

            const response = await axios.post(this.endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.apiKey,
                },
            });

            console.log(response.data);
            return response.data.message;
        } catch (error) {
            if (error.response) {
                console.log(error);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
                throw new Error('Request failed');
            }
        }
    }
}

const instance = new StarSender();
Object.freeze(instance);

export default instance;
