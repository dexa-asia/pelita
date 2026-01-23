<template>
    <main>
        <div>
            <div class="top row">
                <div class="col-md-3 d-flex">
                    <img src="@/assets/images/resources/res_2.avif" alt="Login Image" class="img-avatar-md rounded-circle me-3 mb-3"/>
                    <div>
                        <div class="greeting">Selamat Datang</div>
                        <h1 class="page-title mb-0">{{ loggedUser.name }}</h1>
                        <div class="badge bg-me">{{ loggedUser.privilege }}</div>
                    </div>
                </div>
                <div class="col-md-3 bdr">
                    <div class="d-flex justify-content-between mb-2">
                        Kantor Layanan:
                        <div class="color-me">{{ loggedUser.branch }}</div>
                    </div>
                    <div class="d-flex justify-content-between mb-2">
                        Kode Cabang:
                        <div class="color-me">{{ loggedUser.branchId }}</div>
                    </div>
                    
                </div>
                <div class="col d-flex justify-content-end">
                    <i class="pi pi-map-marker color-me icon-stat me-3 pe-2 pt-3"></i>
                    <div class="small ms-3">
                        {{ loggedUser.branchAddress }}<br/>
                        Bandung, Jawa Barat<br/>
                        022 1121123
                    </div>
                    
                    
                </div>
            </div>
            
            <div class="row mt-3">
                <div class="col-md-8">
                    <div class="bg-me-primary p-3 round-big shadow">
                        <div class="row">
                            <div class="col d-flex bdr">
                                <i class="pi pi-users icon-stat align-self-center ms-3"></i>
                                <div class="col text-end">
                                    Total Anggota
                                    <h2 class="param-value">{{ resume.memberTotal }}</h2>
                                    <div class="smaller">{{ resume.memberMale }} Pria <span class="me-3"></span> {{ resume.memberFemale }} Wanita</div>
                                </div>
                                
                            </div>
                            <div class="col d-flex bdr">
                                <i class="pi pi-user-plus icon-stat align-self-center ms-3"></i>
                                <div class="col text-end">
                                    Registrasi Bulan Ini
                                    <h2 class="param-value">{{ formatPrice(resume.actualRegister) }}</h2>
                                    <div class="smaller">Anggota Baru</div>
                                </div>
                                
                            </div>
                            <div class="col d-flex">
                                <i class="pi pi-share-alt icon-stat align-self-center ms-3"></i>
                                <div class="col text-end">
                                    Sebaran Anggota
                                    <h2 class="param-value">{{ resume.disCodes }} <sup class="smallest text-gray">of 514</sup></h2>
                                    <div class="smaller">Kabupaten/Kota</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3">
                        <div class="col">
                            <div class="card round-big borderless shadow">
                                <div class="card-body">
                                    <h6 class="superbold mb-4"><i class="pi pi-user-plus color-me me-2"></i>Anggota Terbaru</h6>
                                    <router-link class="d-flex mb-2 with-soft-border pb-2" v-for="(item,index) in latest" :to="'/member/view/'+item.memberId">
                                        <div class="align-self-center me-3 small color-me">
                                            <img src="https://tanzolymp.com/images/default-non-user-no-photo-1.jpg" class="img-avatar rounded-circle"/>
                                        </div>
                                        <div>
                                            <div>{{ item.name }}</div>
                                            <div class="smallest text-secondary">{{ item.area }}</div>
                                        </div>
                                        <div class="col text-end small align-self-center">
                                            {{ item.mobile }}
                                        </div>
                                    </router-link>

                                    
                                    
                                </div>
                            </div>
                        </div>

                        <div class="col">
                            <div class="card round-big borderless shadow">
                                <div class="card-body">
                                    <h6 class="superbold mb-4"><i class="pi pi-comment color-me me-2"></i>Rekrutment Teraktif</h6>
                                    <div class="d-flex mb-2 with-soft-border pb-2 d-none">
                                        <div class="align-self-center me-3 small color-me">
                                            07:45
                                        </div>
                                        <div>
                                            <div>Sule Ferdinand</div>
                                            <div class="smaller text-secondary">Jalan Gumuruh No 1 A</div>
                                        </div>
                                        <div class="col text-end small">
                                            0812 1122 111
                                        </div>
                                    </div>

                                    <div class="fst-italic text-secondary bg-light p-4 rounded">Belum ada data referrer</div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card round-big borderless shadow mb-3 mt-3">
                        <div class="card-body">
                            <h6 class="superbold mb-4 text-me"><i class="pi pi-chart-line color-me me-2"></i>Progress Registrasi Harian</h6>
                            <div class="fst-italic text-secondary bg-light p-4 rounded">Belum ada visualisasi grapik yang dapat ditampilkan</div>
                         </div>
                    </div>
                </div>
                <div class="col">
                    
                    <div class="card round-big borderless shadow mb-3">
                        <div class="card-body">
                            <h6 class="superbold mb-4"><i class="pi pi-chart-bar color-me me-2"></i>Indeks Parameter Ver KPU</h6>
                            
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    100<sup class="smaller text-gray">%</sup> Provinsi
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    75<sup class="smaller text-gray">%</sup> Kabupaten/Kota
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    30<sup class="smaller text-gray">%</sup> Keterwakilan Perempuan
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                    <div class="card round-big borderless shadow mb-3">
                        <div class="card-body">
                            <h6 class="superbold mb-4"><i class="pi pi-shop color-me me-2"></i>DPW</h6>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    Dikukuhkan
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    Terbentuk
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    Dalam proses
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    Belum Terbentuk
                                </div>
                                <div class="col align-self-center text-end small">
                                    34 <i class="fa fa-caret-right text-dark"></i> <span class="text-gray">100 <sup class="smaller">%</sup></span>
                                </div>
                            </div>

                            

                            
                        </div>
                    </div>

                    <div class="card round-big borderless shadow mb-3">
                        <div class="card-body">
                            <h6 class="superbold mb-4"><i class="pi pi-shop color-me me-2"></i>DPD</h6>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    Dikukuhkan
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    Terbentuk
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    Dalam proses
                                </div>
                                <div class="col align-self-center text-end small">
                                    0 <sup class="smaller text-gray">%</sup>
                                </div>
                            </div>
                            <div class="d-flex mb-2 with-soft-border pb-2">
                                <div class="align-self-center me-3 small color-me">
                                    Belum Terbentuk
                                </div>
                                <div class="col align-self-center text-end small">
                                    514 <i class="fa fa-caret-right text-dark"></i> <span class="text-gray">100 <sup class="smaller">%</sup></span>
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
.icon-stat{font-size: 2em;}
.img-avatar{width: 30px;}
.img-avatar-md{width: 60px;}
.param-value{font-size: 1.5em;font-weight: 600;}
</style>

<script setup>
import api from '@/services/api'
import {useAuthStore} from '@/stores/auth';
import {formatDateTime,formatDate,formatPrice} from '@/services/onebizz';

import{ref,onMounted} from 'vue';

const auth = useAuthStore()
const loggedUser = auth.user;
const latest =ref([])
const resume = ref({})
const recents = ref([])

onMounted(() => {
  fetchData()
});

async function fetchData() {
  try {
    const postData = {
      data: JSON.stringify({
        limit:3
      }),
    }

    const response = await api.post('/', postData)
    const datas = response.data.data
    resume.value = datas.resume;
    latest.value = datas.latest;
  
} catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>
