<template>
    <div class="row">
        <div class="col-md-8">
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
                        <div class="col-md-4">Akses Staff</div>
                        <div class="col-md-8">
                            <span v-if="usr.isManagement === true" class="badge badge-success"><i class="fa fa-check"></i> Ya</span>
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
                        <router-link class="btn btn-primary btn-round me-3" :to ="'/user/password/'+this.$route.params.memberId"><i class="fa fa-key"></i> Password</router-link>
                        <template v-if="usr.isAdmin ==false">
                            <button class="btn btn-warning btn-round ms-auto" @click="promote"><i class="fa fa-star"></i> Set Admin</button>
                        </template>
                        <template v-else>
                            <button class="btn btn-secondary btn-round ms-auto" @click="demote"><i class="fa fa-star"></i> Set Non Admin</button>
                        </template>
                        <template v-if="usr.isManagement ==false">
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
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';

// Route and user
const route = useRoute();
const usr = ref({});

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
      getData();
    }
  } catch (error) {
    console.error(`Error updating ${endpoint}:`, error);
  }
};

// User access functions
const blockUser = () => updateUserState('/user/access', 0);
const unblockUser = () => updateUserState('/user/access', 1);

// User admin functions
const promote = () => updateUserState('/user/adminate', 1);
const demote = () => updateUserState('/user/adminate', 0);

// User staff functions
const promoteStaff = () => updateUserState('/user/staff-status', 1);
const demoteStaff = () => updateUserState('/user/staff-status', 0);

// Fetch data on mount
onMounted(() => {
  fetchData();
});
</script>
