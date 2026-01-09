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
                                    <h2 class="param-value">{{ resume.member }}</h2>
                                   
                                </div>
                                
                            </div>
                            <div class="col d-flex bdr">
                                <i class="pi pi-money-bill icon-stat align-self-center ms-3"></i>
                                <div class="col text-end">
                                    Total Simpanan
                                    <h2 class="param-value">{{ formatPrice(resume.savingAmount) }}</h2>
                                    <div class="smaller">{{ resume.account }} Rekening</div>
                                </div>
                                
                            </div>
                            <div class="col d-flex">
                                <i class="pi pi-share-alt icon-stat align-self-center ms-3"></i>
                                <div class="col text-end">
                                    Total Pembiayaan
                                    <h2 class="param-value">{{ resume.loanAmount }}</h2>
                                    <div class="smaller">{{ resume.lender }} Nasabah</div>
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
                                            <div class="smallest text-secondary">{{ item.address }}, {{ item.district }}</div>
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
                                    <h6 class="superbold mb-4"><i class="pi pi-comment color-me me-2"></i>Pengajuan Pembiayaan</h6>
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

                                    <div class="fst-italic text-secondary bg-light p-4 rounded">Belum ada data pembiayaan diajukan</div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card round-big borderless shadow mb-3 mt-3">
                        <div class="card-body">
                            <h6 class="superbold mb-4 text-me"><i class="pi pi-chart-line color-me me-2"></i>Progress Transaksi Harian</h6>
                            <div class="fst-italic text-secondary bg-light p-4 rounded">Belum ada visualisasi grapik yang dapat ditampilkan</div>
                         </div>
                    </div>
                </div>
                <div class="col">
                    
                    <div class="card round-big borderless shadow mb-3">
                        <div class="card-body">
                            <h6 class="superbold mb-4"><i class="pi pi-cart-plus color-me me-2"></i>Transaksi Hari Ini</h6>
                            <template v-if="recents.length > 0">
                                <router-link v-for="(item,index) in recents" :key="index" class="d-flex mb-2 with-soft-border pb-2" :to="'/trx/view/'+item.trxId">
                                    <div class="align-self-center me-3 small color-me">
                                        {{ item.time }}
                                    </div>
                                    <div>
                                        <div>{{ item.member }}</div>
                                        <div class="smaller text-secondary">{{ item.type }}</div>
                                    </div>
                                    <div class="col align-self-center text-end small">
                                        {{ formatPrice(item.total) }}
                                    </div>
                                </router-link>
                            </template>
                            <template v-else>
                                <div class="fst-italic text-secondary bg-light p-4 rounded">Belum ada data transaksi</div>
                            </template>

                            
                            

                        </div>
                    </div>

                    <div class="card round-big borderless shadow">
                        <div class="card-body">
                            <h6 class="superbold mb-4"><i class="pi pi-shop color-me me-2"></i>ATM/CRM Management</h6>
                            <div class="d-flex mb-2 with-soft-border pb-2 d-none">
                                <div class="align-self-center me-3 small color-me">
                                    <i class="pi pi-cog pi-spin"></i>
                                </div>
                                <div>
                                    <div>ATM #1</div>
                                    <div class="smaller text-secondary">Jalan Kliningan No 7</div>
                                </div>
                                <div class="col align-self-center text-end small color-me">
                                    Online
                                </div>
                            </div>

                            <div class="fst-italic text-secondary bg-light p-4 rounded">Tidak ada mesin ATM terkoneksi pada system koperasi ini</div>


                            

                            
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
import { Bar,Line } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, PointElement,LineElement,CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale,LineElement,PointElement)

const auth = useAuthStore()
const loggedUser = auth.user;
const latest =ref([])
const resume = ref({})
const recents = ref([])

const chartData = ref({
  labels: [],  // Dates
  datasets: []
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Progress Transaksi Keuangan Cabang'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      suggestedMax: 300
    }
  }
});

function fetchDataChart(){
    // Generate dummy data (last 7 days)
  const labels = [];
  const data = [];
  const data2 = [];

  const today = new Date();
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    labels.push(date.toISOString().split('T')[0]); // YYYY-MM-DD format
    data.push(Math.floor(Math.random() * 250)); // Dummy transaction value
    data2.push(Math.floor(Math.random() * 80)); 
  }
  console.log('data:', chartData);

  chartData.value = {
    labels,
    datasets: [
      {
        label: 'Penyetoran',
        data:data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Penarikan',
        data:data2,
        borderColor: 'rgba(255, 165, 0, 1)',
        backgroundColor: 'rgba(255, 165, 0, 0.2)',
        tension: 0.3,
        fill: false,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  };

}

onMounted(() => {
  fetchDataChart();
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
    latest.value = datas.latest
    resume.value = datas.resume
    recents.value = datas.recents

  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>
