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
                            <h1 class="form-title mt-3">Registrasi Diproses</h1>
                            <div class="text-gray mt-3 mb-5">
                                <p>Terimakasih telah mengisi form pendaftaran menjadi anggota Partai Pelita.</p>
                                
                                <div class="register-confirm d-none">
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
                                

                                <p>Selamat datang di Partai Pelita.<br/>Kehadiran Anda turut serta mendorong terciptanya bangsa yang dinamis dan progressif dalam perjuangan untuk terwujudnya kesejahteraan dan keadilan sosial bagi seluruh rakyat Indonesia</p>
                            </div>
                        </div>
                        
                        <div class="with-dashed pb-1"></div>
                        <div class="text-center mt-3 mb-2">
                            <router-link class="btn btn-primary text-white d-none" to="/">Kembali</router-link>
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
    import {ref,onMounted} from 'vue';
    import { useRoute } from "vue-router";

    const member = ref({})
    const route = useRoute();

    onMounted(()=>{
        fetchData()
    })

    async function fetchData(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({
                memberId:route.params.memberId
            })
        }
        const result = await api.post('/auth/view-processed',postData);
        member.value = result.data.data;
    }
</script>