<template>
    <main class="bg-me-gradient">
        <div class="row d-flex vh-100 justify-content-center">
            <div class="col-12 col-md-10 col-lg-5 align-self-center">
                
                <div class="card">
                   <div class="card-body p-5">
                        <div class="text-center mb-4">
                            <router-link to="/" class="mb-5">
                                <img src="@/assets/images/identities/logo.png" class="img-icon"/>
                            </router-link>
                            <h1 class="form-title mt-3">Cek Status Keanggotaan</h1>
                            <div class="text-dark mt-3 mb-5">
                                <p>Masukan NIK untuk mengetahui apakah anda sudah terdaftar<br/>sebagai anggota Partai Pelita</p>
                                <div class="col-md-6 ms-auto me-auto">
                                    <input type="text" class="form-control text-center" v-model="nik" placeholder="Nomor Induk Kependudukan/KTP" maxlength="16"/>
                                    <p class="text-danger">{{ errorText }}</p>
                                    <button class="btn btn-primary mt-3" @click="checkStatus">Cek Status</button>
                                </div>
                                <div class="mt-4" v-if="isFound">
                                    <p class="text-success">Selamat, NIK anda telah terdaftar sebagai anggota Partai Pelita}</p>
                                    <div class="d-flex mb-2 text-dark">
                                        <div class="col text-end pe-2">Nomor Pendaftaran : </div>
                                        <div class="col text-start">{{ member.memberId }}</div>
                                    </div>
                                    <div class="d-flex mb-2 text-dark">
                                        <div class="col text-end pe-2">Nama Lengkap : </div>
                                        <div class="col text-start">{{ member.name }}</div>
                                    </div>
                                    <div class="d-flex mb-2 text-dark">
                                        <div class="col text-end pe-2">NIK : </div>
                                        <div class="col text-start">{{ member.nik }}</div>
                                    </div>
                                    <div class="d-flex mb-2 text-dark">
                                        <div class="col text-end pe-2">NO WHATSAPP : </div>
                                        <div class="col text-start">{{ member.mobileDecoded }}</div>
                                    </div>
                                    <div class="d-flex mb-4 text-dark">
                                        <div class="col text-end pe-2">Wilayah : </div>
                                        <div class="col text-start">{{ member.district }}</div>
                                    </div>
                                    <div class="d-flex mb-4 text-dark">
                                        <div class="col text-end pe-2">Alamat : </div>
                                        <div class="col text-start">
                                            {{ member.address }}<br/>
                                            <span class="text-gray">KELURAHAN</span> {{ member.village }}<br/>
                                            <span class="text-gray">KECAMATAN</span> {{ member.subdistrict }}<br/>
                                            {{ member.district }}
                                        </div>
                                    </div>

                                </div>
                                
                                
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
</style>
<script setup>
    import api from "@/services/api";
    import {ref,watch} from 'vue';
    import { useRoute } from "vue-router";
    import Swal from "sweetalert2";
    
    const member = ref({})
    const route = useRoute();
    const isFound=ref(false);
    const nik = ref(null)
    const errorText=ref('');

    async function checkStatus(){

        const nikValue = nik?.value?.trim();

        if (!nikValue || !/^\d{16}$/.test(nikValue)) {
            Swal.fire({
                title: 'NIK tidak valid',
                text: 'NIK harus terdiri dari 16 digit angka',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }

        try{
            const postData={
                uagent: 'web',
                data: JSON.stringify({
                    nik:nik.value
                })
            }
            const response = await api.post('/auth/check-status',postData);
            if(response.data.status==68){
                isFound.value = true
                member.value =response.data.data;
                errorText.value='';
            }
            else{
                isFound.value = false
                errorText.value = "NIK ini belum terdaftar sebagai anggota Partai Pelita"
            }
        }
        catch(err){
            Swal?.fire({
                title: 'NIK tidak ditemukan',
                text: err.message || 'Please check your credentials.',
                icon: 'error',
                confirmButtonText: 'OK',
            })
        }
        
    }

    watch(nik, (value) => {
        isReal.value = value.length === 16
    })

</script>