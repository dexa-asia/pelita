<!-- ModalDialog.vue -->
<template>
  <div v-if="isOpen" class="modal modal-md">
    <div class="modal-content">
      <h4 class="modal-title text-me"> Pilih Hak Akses</h4>
      <div style="height:400px;">
        <AgGridVue
            style="width: 100%; height: 100%;"
            class="ag-theme-quartz"
            :gridOptions="gridOptions"
            :columnDefs="columnDefs"
            :rowData="rowData"
            @rowClicked="selectItem"
            :onGridReady= "onGridReady"
            :onFirstRendered="onFirstDataRendered"
        />
      </div>
      <div class="justify-content-end text-end">
        <button @click="closeModal" class="btn btn-outline-primary mt-3">Close</button>
      </div>
    </div>
   
  </div>
</template>

<style scoped>
.modal {position: fixed;top: 0;left: 0;width: 100%;height: 100%;background-color: rgba(0, 0, 0, 0.5);display: flex;justify-content: center;align-items: center;z-index: 9999;}
.modal-content {padding: 40px;border-radius: 8px;box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);max-width: 60%;max-height: 80%;overflow: auto;}
.modal-title{font-size:1.3em;font-weight: 500;margin-bottom: 20px;}
.close-button {position: absolute;top: 10px;right: 10px;cursor: pointer;}
</style>

<script setup>
import api from '@/services/api';
import {ref,watch} from 'vue';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridVue } from "ag-grid-vue3";
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const props = defineProps({
  isOpen: Boolean,
  params: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['close', 'select'])

const rowData =ref(null)

const columnDefs = ref([
    { headerName: '#', valueGetter: 'node.rowIndex + 1',width:70,headerClass:'header-center',cellStyle:{'text-align':'center'} },
    { headerName: 'HAK AKSES', field: 'role',width:300,filter: 'agTextColumnFilter',floatingFilter:true },
    { headerName: 'KETERANGAN', field: 'description',width:500,filter: 'agTextColumnFilter',floatingFilter:true },
])

async function fetchData() {
  try {
    const postData = {
      data: JSON.stringify({
        statusId: 2,
      }),
    }
    const response = await api.post('/user/role-list', postData)
    rowData.value = response.data.data
  } 
  catch (error) {
    console.error('Error fetching data:', error)
  }
}

const selectItem = (params) => {
  emit('select', params.data)
  closeModal()
}

const closeModal = () => {
  emit('close')
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (isOpen) {
      fetchData()
    }
  }
)


</script>