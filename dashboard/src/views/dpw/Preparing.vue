<template>
  <main>
    <div class="d-flex mb-2">
        <div class="page-title">
          DPW Persiapan
          <div class="annotation">Data DPW dalam proses persiapan</div>
        </div>
        <div class="col text-end align-item-center">
            
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
  if(params.data.statusId ===4){
        return `<a href="/dpw/view/${params.data.code}">${params.value} <i class="fa fa-check-circle text-check-valid"></i> </a>`;
    }
    else{
        return `<a href="/dpw/view/${params.data.code}">${params.value}</a>`;
    }
}

function statusRenderer(params) {
  return `<span class="fst-italic text-gray">${params.data.status}</span>`;
}

const columnDefs = ref([
    { headerName: '#', valueGetter: 'node.rowIndex + 1',width:70,headerClass:'header-center',cellStyle:{'text-align':'center'} },
    { headerName: 'KODE SYSTEM', field: 'code',width:150,filter: 'agTextColumnFilter',floatingFilter:true },
    { headerName: 'DPW', field: 'province',cellRenderer: linkRenderer,filter: 'agTextColumnFilter',floatingFilter:true },
    { headerName: 'KEPALA DPW', field: 'leader',floatingFilter:true},
    { headerName: 'STATUS', field: 'status',floatingFilter:true,cellRenderer:statusRenderer},
    { headerName: 'KANTOR', field: 'isOffice',floatingFilter:true},
    { headerName: 'STAFF', field: 'isStaff',floatingFilter:true},
    { headerName: 'JML ANGGOTA', field: 'memberCount',valueFormatter:formatPriceAdapter},
    { headerName: 'JML STAFF', field: 'staffCount',valueFormatter:formatPriceAdapter},
    
])

const defaultColDef = ref({filter: true,})
// ✅ Data fetch function
async function fetchData() {
  try {
    const postData = {
      data: JSON.stringify({
        statusRange: [2,3],
      }),
    }

    const response = await api.post('/dpw', postData)
    rowData.value = response.data.data

  } catch (error) {
    console.error('Error fetching data:', error)
  }
}
</script>