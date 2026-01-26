<template>
    <main class="bg-me-gradient">
        <div class="row d-flex vh-100 justify-content-center">
            <div class="col-12 col-md-10 col-lg-5 align-self-center">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title"></div>
                    </div>
                    <div class="card-body">
                        <div class="text-center mb-4">
                            <router-link to="/" class="mb-5">
                                <img src="@/assets/images/identities/logo.png" class="img-icon"/>
                            </router-link>
                            <h1 class="form-title mt-3">Pusat Data & Informasi</h1>
                            <div class="text-gray mb-5">Silakan pilih menu yang sesuai</div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/daftar">
                                    <i class="pi pi-user-plus fa-2x"></i><br/>
                                    Daftar<br/>Jadi Anggota
                                </router-link>
                            </div>
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/cekstatus">
                                    <i class="pi pi-search fa-2x"></i><br/>
                                    Cek Status<br/>Keanggotaan
                                </router-link>
                            </div>
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/">
                                    <i class="pi pi-user-edit fa-2x"></i><br/>
                                    Perbarui<br/>Data
                                </router-link>
                            </div>
                        </div>

                        <div class="row mb-3 d-none">
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/">
                                    <i class="pi pi-eye fa-2x"></i><br/>
                                    Informasi<br/>Partai
                                </router-link>
                            </div>
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/">
                                    <i class="pi pi-calendar fa-2x"></i><br/>
                                    Agenda dan<br/>Pengumuman
                                </router-link>
                            </div>
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/register">
                                    <i class="pi pi-share-alt fa-2x"></i><br/>
                                    Rekomendasikan<br/>Ke Teman
                                </router-link>
                            </div>
                        </div>
                        <div class="text-center">
                            <h4 class="form-title mt-5">Bagikan Link Pendaftaran melalui QR</h4>
                            <div class="col-8 col-md-6 ms-auto me-auto">
                                <img :src="qrCodeImage" alt="QR Code" class="img-fluid w-100 mt-3"/>
                            </div>
                        </div>
                        
                        
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
    .form-title{font-size: 1.5em;font-weight: 600;}
    .img-icon{width:100px}
    .iconized{background-color: var(--me-light);border-radius: 20px;}
    .iconized:hover{background-color: var(--me-primary);color:#fff;}
</style>
<script setup>
import {ref,onMounted} from 'vue';
import QRCode from 'qrcode-generator';

const qrData='https://partaipelita.or.id/daftar';
const qrCodeImage = ref(null);

const qrOptions={
    width: 200,
    height: 200,
    typeNumber: 4,
    correctLevel: 'M',
}

onMounted(()=>{
    qrToImage()
})


function qrToImage() {
    const data = qrData;
    const qr = QRCode(0, 'M');
    qr.addData(data);
    qr.make();

    const moduleCount = qr.getModuleCount();
    const cellSize = 6;
    const margin = 4;

    // Additional text you want to display
    //const extraText = `${this.st.name} - ${this.st.nisn}`;
    const extraText = `${qrData}`;
    const fontSize = 16;
    const textPadding = 10;

    // Calculate size
    const qrSize = moduleCount * cellSize + margin * 2;
    const extraHeight = fontSize + textPadding * 2;
    const totalHeight = qrSize + extraHeight;

    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = qrSize;
    canvas.height = totalHeight;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw QR code
    ctx.fillStyle = '#000000';
    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (qr.isDark(row, col)) {
                ctx.fillRect(col * cellSize + margin, row * cellSize + margin, cellSize, cellSize);
            }
        }
    }

    // Draw text
    ctx.font = `${fontSize}px Arial`;
    ctx.fillStyle = '#000000';
    ctx.textAlign = 'center';
    //ctx.fillText(extraText, canvas.width / 2, qrSize + fontSize + textPadding / 2);

    // Save image as base64
    qrCodeImage.value = canvas.toDataURL('image/png');
}
</script>