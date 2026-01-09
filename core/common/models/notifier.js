import StarSender from '#root/common/components/starsender'

class Notifier{
    constructor(name) {
        this.name=name
    }

    sendWelcome=async(member)=>{
        const message = 'Terimakasih '+ member.Name+' sudah memberikan dukungan yang luar biasa kepada saya *Desembri, SH, MA* dalam Pencalonan Pemilihan Bupati Kab. Limapuluh Kota pada Pilkada 2024.\n\nDukungan ini merupakan Langkah Menuju Limapuluh Kota yang Berkeadaban, Berkualitas, dan Berkemajuan.\n\n#BerkhidmatUntukNegeri';
        const sd = new StarSender();
        return sd.sendMessage(member.Mobile,message);
    }

    sendNewPassword = async(member,username,password)=>{
        const message='Yth '+member.Name+'\nInformasi akun anda di koperasi BMT ASA telah diperbarui.\n\nUsername: *'+username+'*\nPassword: *'+password+'*\n\nSilakan login ulang di aplikasi ASAKu Mobile untuk menggunakan layanan';
        return StarSender.sendMessage(member.Mobile,message);
    }

    sendOTA = async(mobile,ota)=>{

        const message='Kode OTP ASA '+ ota+'\n\n_Anda menerima pesan ini karena melakukan login ke ASA. Jika anda tidak melakukannya, berarti akun, username dan password anda telah digunakan oleh orang lain_';
        return StarSender.sendMessage(mobile,message);
    }

}

export default Notifier