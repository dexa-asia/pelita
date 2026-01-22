<template>
  <main>
    <div class="d-flex mb-2">
        <div class="page-title">
          Anggota Aktif
          <div class="annotation">Data semua anggota aktif</div>
        </div>
        <div class="col text-end align-item-center">
            <router-link class="btn btn-me" :to="'/member/create'">+ Daftarkan Anggota</router-link>
        </div>
    </div>

    <div style="height: 80vh;">
        <ag-grid-vue
          style="width: 100%; height: 100%;"
          class="ag-theme-quartz"
          :columnDefs="columnDefs"
          :rowData="rowData"
          :pagination="true"
          :paginationPageSize="20"
          :animateRows="true"
          :floatingFilter="true"
          @grid-ready="onGridReady"
          :defaultColDef="defaultColDef"
        ></ag-grid-vue>
      </div>  
  </main>

</template>


<script setup>

import api from '@/services/api';
import {ref,onMounted} from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridVue } from "ag-grid-vue3";
import { useAuthStore } from '@/stores/auth';
import { formatDate,formatPrice } from '@/services/onebizz';

const formatPriceAdapter = params => formatPrice(params.value)
const formatDateAdapter = params => formatDate(params.value)

const auth = useAuthStore();
const rowData =ref(null)

onMounted(()=>{
  fetchData()
})

function linkRenderer(params) {
  if(params.data.IsVerified ==true){
        return `<a href="/member/view/${params.data.memberId}">${params.data.name} <i class="fa fa-check-circle text-check-valid"></i> </a>`;
    }
    else{
        return `<a href="/member/view/${params.data.memberId}">${params.data.name}</a>`;
    }
}

function birthRenderer(params) {
  return `${params.data.birthPlace}, ${formatDate(params.data.birthDate)}`;
}

const columnDefs = ref([
    { headerName: '#', valueGetter: 'node.rowIndex + 1',width:70,headerClass:'header-center',cellStyle:{'text-align':'center'} },
    { headerName: 'KODE SYSTEM', field: 'memberId',width:150,filter: 'agTextColumnFilter',floatingFilter:true },
    { headerName: 'NAMA', field: 'name',cellRenderer: linkRenderer,filter: 'agTextColumnFilter',floatingFilter:true },
    { headerName: 'JENIS KELAMIN', field: 'gender',filter: 'agTextColumnFilter',floatingFilter:true },
    { headerName: 'KAB/KOTA', field: 'district',filter: 'agTextColumnFilter',floatingFilter:true },
    { headerName: 'NO WHATSAPP', field: 'mobile',filter: 'agTextColumnFilter',floatingFilter:true },
    { headerName: 'TGL DAFTAR', field: 'registerDate',valueFormatter:formatDateAdapter},
             
])

const defaultColDef = ref({filter: true,})
// ✅ Data fetch function
async function fetchData() {
  try {
    const postData = {
      data: JSON.stringify({
        statusId: 2,
      }),
    }

    const response = await api.post('/member', postData)
    rowData.value = response.data.data

  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>