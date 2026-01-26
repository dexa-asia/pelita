<template>
     <div class="card">
      <div class="card-header">
          <div class="row">
              <div class="col d-flex align-item-center">
                  <div class="page-title">Pengguna</div>
              </div>
               
          </div>
          
      </div>
      <div class="card-body">
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
      </div>
     </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridVue } from "ag-grid-vue3";

const rowData = ref([]);

// Column definitions
const linkRenderer = (params) => {
  return `<a href="/user/view/${params.data.memberId}">${params.value}</a>`;
};

const columnDefs = ref([
  { headerName: '#', valueGetter: 'node.rowIndex + 1', width: 100, headerClass:'header-center', cellStyle: {'text-align':'center'} },
  { headerName: 'Pengguna', field: 'name', width: 350, cellRenderer: linkRenderer, filter: 'agTextColumnFilter', floatingFilter: true },
  { headerName: 'Hak Akses', field: 'privilege', filter: 'agTextColumnFilter', floatingFilter: true },
  { headerName: 'Username', field: 'userName', cellRenderer: linkRenderer, filter: 'agTextColumnFilter', floatingFilter: true },
  { headerName: 'Email', field: 'email' },
  { headerName: 'Aktif', field: 'enabled', cellStyle: { 'text-align': 'center' } },
  { headerName: 'Staff', field: 'isManagement', cellStyle: { 'text-align': 'center' } },
  { headerName: 'Admin', field: 'isAdmin', cellStyle: { 'text-align': 'center' } },
  { headerName: 'Last Update', field: 'lastUpdate' },
]);

const defaultColDef = ref({
  filter: true, // Enable filtering by default
});

// Fetch user data
const fetchUsers = async () => {
  try {
    const postData = { uagent: 'vue-dashboard', data: JSON.stringify({}) };
    const response = await api.post('/user', postData);
    setTimeout(() => {
      rowData.value = response.data.data;
    }, 200);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
};

// Grid ready callback
const onGridReady = (params) => {
  params.api.sizeColumnsToFit();
};

onMounted(() => {
  fetchUsers();
});
</script>

