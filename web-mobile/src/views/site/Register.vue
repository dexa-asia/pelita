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
                            <h1 class="form-title mt-3">Form Registrasi Anggota Partai Pelita</h1>
                            <div class="text-gray mb-5">Silakan isi data sesuai dengan Kartu Tanda Penduduk</div>
                        </div>
                        <form @submit.prevent="submitForm" role="form">
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Nama Lengkap</div>
                                <div class="col">
                                    <input type="text" placeholder="Nama" class="form-control" required/>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Jenis Kelamin</div>
                                <div class="col">
                                    <select id="gender" v-model="gender" class="form-select">
                                        <option value="L">Pria</option>
                                        <option value="P">Wanita</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Nomor Whatsapp</div>
                                <div class="col">
                                    <input type="text" placeholder="08xxx" class="form-control" required/>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Email <span class="small fst-italic text-gray">***jika ada</span></div>
                                <div class="col">
                                    <input type="text" placeholder="opsional" class="form-control" required/>
                                </div>
                            </div>

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Alamat</div>
                                <div class="col">
                                    <input type="text" placeholder="Jalan atau Desa" class="form-control" required/>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Provinsi</div>
                                <div class="col">
                                    <select id="provcode" v-model="provCode" class="form-select" @change="fetchDistrict">
                                        <option v-for="p in provinces" :value="p.code" :key="p.province">{{ p.province }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Kabupaten/Kota</div>
                                <div class="col">
                                    <select id="discode" v-model="disCode" class="form-select" @change="fetchSubdistrict">
                                        <option v-for="d in districts" :value="d.code" :key="d.district">{{ d.remark }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Kecamatan</div>
                                <div class="col">
                                    <select id="sudcode" v-model="sudCode" class="form-select" @change="fetchVillage">
                                        <option v-for="s in subdistricts" :value="s.code" :key="s.subdistrict">{{ s.subdistrict }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Desa</div>
                                <div class="col">
                                    <select id="vilcode" v-model="vilCode" class="form-select">
                                        <option v-for="v in villages" :value="v.code" :key="v.village">{{ v.village }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end"></div>
                                <div class="col">
                                    <label class="mb-2">
                                        <input type="checkbox" v-model="isReadyStaff" />
                                        Siap menjadi pengurus partai jika diperlukan
                                    </label>
                                    <label class="mb-2">
                                        <input type="checkbox" v-model="isReadyAction" />
                                        Siap berkontribusi moril dan materil jika diperlukan
                                    </label>
                                </div>
                            </div>
                            <div class="with-dashed pb-1"></div>
                            <label class="mb-2 small fst-italic d-flex">
                                <input type="checkbox" class="me-1 mt-1" v-model="isReal" />
                                Saya menyatakan bahwa formulir ini disi dengan data sesungguhnya dan dapat dipertanggungjawabkan
                            </label>
                            <div class="with-dashed pb-1"></div>
                            <div class="text-center mt-3 mb-2">
                                <button class="btn btn-primary" type="submit">Kirim Pendaftaran</button>
                            </div>
                        </form>
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
    import {ref,onMounted} from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const isReal = ref(false);

    function submitForm(){
        router.push('/register-processed');
    }
</script>