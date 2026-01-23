<template>
     <div class="card">
      <div class="card-header">
          <div class="row">
              <div class="col d-flex align-item-center">
                  <div class="page-title">Admin</div>
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
import axios from 'axios';
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridVue } from "ag-grid-vue3";
import { getUserSession } from '@/services/auth_service';

// Reactive variables
const user = ref(getUserSession());
const rowData = ref([]);

// Column definitions
const linkRenderer = (params) => {
  return `<a href="/user/view/${params.data.Id}">${params.value}</a>`;
};

const columnDefs = ref([
  { headerName: '#', valueGetter: 'node.rowIndex + 1', width: 70, headerClass:'header-center', cellStyle: {'text-align':'center'} },
  { headerName: 'User', field: 'Name', cellRenderer: linkRenderer, filter: 'agTextColumnFilter', floatingFilter: true, flex: 1 },
  { headerName: 'Privilege', field: 'Privilege', filter: 'agTextColumnFilter', floatingFilter: true },
  { headerName: 'Username', field: 'Username', cellRenderer: linkRenderer, filter: 'agTextColumnFilter', floatingFilter: true },
  { headerName: 'Email', field: 'Email' },
  { headerName: 'Active', field: 'Enabled', cellStyle: { 'text-align': 'center' } },
  { headerName: 'Last Update', field: 'LastUpdate' },
]);

const defaultColDef = ref({
  filter: true,
});

// Fetch user data
const fetchUsers = async () => {
  try {
    const postData = { uagent: 'vue-dashboard', data: JSON.stringify({ isadmin: true }) };
    const response = await axios.post('/user/', postData, {
      headers: { token: user.value.data.accessToken },
    });
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
