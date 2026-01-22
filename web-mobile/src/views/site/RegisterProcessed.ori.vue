<template>
    <main class="bg-me-gradient">
        <div class="row d-flex vh-100 justify-content-center">
            <div class="col-10 col-lg-5 align-self-center">
                
                <div class="card">
                   <div class="card-body p-5">
                        <div class="text-center mb-4">
                            <router-link to="/" class="mb-5">
                                <img src="@/assets/images/identities/logo.png" class="img-icon"/>
                            </router-link>
                            <h1 class="form-title mt-3">Registrasi Diproses</h1>
                            <div class="text-gray mt-3 mb-5">
                                <p>Terimakasih telah mengisi form pendaftaran menjadi anggota Partai Pelita.<br/>Team Admin akan melakukan validasi dan verifikasi.</p>
                                <div class="d-flex mt-4 mb-2 text-dark">
                                    <div class="col text-end pe-2">Nama Lengkap : </div>
                                    <div class="col text-start">{{ member.name }}</div>
                                </div>
                                <div class="d-flex mb-2 text-dark">
                                    <div class="col text-end pe-2">Nomor Pendaftaran : </div>
                                    <div class="col text-start">{{ member.memberId }}</div>
                                </div>
                                <div class="d-flex mb-4 text-dark">
                                    <div class="col text-end pe-2">Status Keanggotaan : </div>
                                    <div class="col text-start text-warning"><i class="fa fa-spin fa-hourglass"></i>Menunggu verifikasi</div>
                                </div>

                                <p>Status keanggotaan anda akan diinformasikan melalui whatsapp atau email</p>
                            </div>
                        </div>
                        
                        <div class="with-dashed pb-1"></div>
                        <div class="text-center mt-3 mb-2">
                            <button class="btn btn-primary">Kembali</button>
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