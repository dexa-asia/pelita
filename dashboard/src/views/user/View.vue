<template>
    <div class="row">
        <div class="col-md-7">
            <div class="card">
                <div class="card-header">
                    <div class="row">
                        <div class="col">
                            <div class="card-title">Detail Pengguna</div>
                        </div>
                        <div class="col text-end">
                            <router-link class="btn btn-outlline-primary" :to="'/user'"><i class="fa fa-bars"></i> List Pengguna</router-link>
                        </div>
                    </div>
                </div>
                <div class="card-body detail-view">
                    <div class="row">
                        <div class="col-md-4">Name</div>
                        <div class="col-md-8"><router-link :to="'/member/view/'+usr.MemberId">{{usr.name}}</router-link></div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">Username</div>
                        <div class="col-md-8">{{usr.userName}}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">Whatsapp</div>
                        <div class="col-md-8">{{usr.mobile}}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">Email</div>
                        <div class="col-md-8">{{usr.email}}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">Level Akses</div>
                        <div class="col-md-8">{{usr.privilege}}</div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">Akses Staff</div>
                        <div class="col-md-8">
                            <span v-if="usr.isStaff === true" class="badge badge-success"><i class="fa fa-check"></i> Ya</span>
                           <span v-else class="badge badge-danger"><i class="fa fa-times"></i> Tidak</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">Akses Admin</div>
                        <div class="col-md-8">
                            <span v-if="usr.isAdmin === true" class="badge badge-success"><i class="fa fa-check"></i> Ya</span>
                           <span v-else class="badge badge-danger"><i class="fa fa-times"></i> Tidak</span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">Status</div>
                        <div class="col-md-8">
                           <span v-if="usr.isEnabled === true" class="badge badge-success"><i class="fa fa-check"></i> Active</span>
                           <span v-else class="badge badge-danger"><i class="fa fa-ban"></i> Blocked</span>
                        </div>
                    </div>
                </div>
                <div  class="card-footer d-flex justify-content-between">
                    <div>
                        <router-link class="btn btn-primary btn-round me-3" :to ="'/user/password/'+route.params.memberId"><i class="fa fa-key"></i> Password</router-link>
                        <template v-if="usr.isAdmin ==false">
                            <button class="btn btn-warning btn-round ms-auto" @click="promote"><i class="fa fa-star"></i> Set Admin</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-secondary btn-round ms-auto" @click="demote"><i class="fa fa-star"></i> Set Non Admin</button>
                        </template>
                        <template v-if="usr.isStaff ==false">
                            <button class="btn btn-warning btn-round ms-2" @click="promoteStaff"><i class="fa fa-shield"></i> Set Staff</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-secondary btn-round ms-2" @click="demoteStaff"><i class="fa fa-shield"></i> Set Non Staff</button>
                        </template>
                    </div>
                    
                    <template v-if="usr.isEnabled==true">
                        <button class="btn btn-danger btn-round ms-auto" @click="blockUser"><i class="fa fa-ban"></i> Block User</button>
                    </template>
                    <template v-else>
                        <button class="btn btn-success btn-round" @click="unblockUser"><i class="fa fa-check"></i> Unblock User</button>
                    </template>

                    
                    
                </div>
            </div>
        </div>
        <div class="col">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <div class="card-title">Hak Akses Pengguna</div>
                    <button class="btn btn-success" @click="openModal"><i class="fa fa-plus"></i> Tambah</button>
                </div>
                <div class="card-body">
                    <div class="alert bg-light text-warning">
                        <i class="fa fa-warning"></i> Pengguna wajib relogin untuk me-refresh hak akses nya
                    </div>
                    
                    <div class="d-flex pt-2 pb-2 hover-effect d-flex justify-content-between" v-for ="(item,index) in roles" :key="item.id">
                        <div>
                            <i class="fa fa-check-circle text-success mt-1 me-1"></i> {{ item.description }}
                        </div>
                        <div class="text-end">
                            <div class="badge bg-warning text-black" @click="removeRole(item.id)">Hapus</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FindRole :isOpen="isModalOpen" @close="closeModal" @select="itemSelected" />
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import FindRole from './FindRole.vue';


// Route and user
const route = useRoute();
const usr = ref({});
const roles = ref([]);
const isModalOpen=ref(false);

// Fetch user data
const fetchData = async () => {
  try {
    const postData = {
      uagent: 'vue-dashboard',
      data: JSON.stringify({ memberId: route.params.memberId }),
    };
    const response = await api.post('/user/view', postData);
    if (response.data.status === 68) {
      usr.value = response.data.data;
      roles.value = response.data.data.roles;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Generic function for user access/admin/staff updates
const updateUserState = async (endpoint, state) => {
  try {
    const postData = {
      uagent: 'vue-dashboard',
      data: JSON.stringify({ memberId: route.params.memberId, state }),
    };
    const response = await api.post(endpoint, postData);
    if (response.data.status === 68) {
      fetchData()
    }
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
  }
};

// User access functions
const blockUser = () => updateUserState('/user/set-access-status', 0);
const unblockUser = () => updateUserState('/user/set-access-status', 1);

// User admin functions
const promote = () => updateUserState('/user/set-admin-status', 1);
const demote = () => updateUserState('/user/set-admin-status', 0);

// User staff functions
const promoteStaff = () => updateUserState('/user/set-staff-status', 1);
const demoteStaff = () => updateUserState('/user/set-staff-status', 0);

function openModal(){
    isModalOpen.value=true
}

function closeModal(){
    isModalOpen.value=false;
}

async function itemSelected(item){
    
    try {
        const postData = {
        uagent: 'vue-dashboard',
        data: JSON.stringify({
             userId: usr.value.id,
             roleId:item.id
            }),
        };
        const response = await api.post('/user/role-add', postData);
        if (response.data.status === 68) {
            fetchData()
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function  removeRole(id) {
    console.log("deleting role "+ id)
    try {
        const postData = {
        uagent: 'vue-dashboard',
        data: JSON.stringify({
             id:id,
            }),
        };
        const response = await api.post('/user/role-remove', postData);
        if (response.data.status === 68) {
            fetchData()
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Fetch data on mount
onMounted(() => {
  fetchData();
});
</script>
