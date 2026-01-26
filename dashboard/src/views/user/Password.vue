<template>
    <form @submit.prevent="submitForm" role="form">
        <div class="row">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title">User Details</div>
                    </div>
                    <div class="card-body detail-view">
                        <div class="row">
                            <div class="col-md-4 col-lg-3">Name</div>
                            <div class="col-md-8 col-lg-9">{{usr.name}}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-3">Username</div>
                            <div class="col-md-8 col-lg-9">{{usr.userName}}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-3">Whatsapp</div>
                            <div class="col-md-8 col-lg-9">{{usr.mobile}}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-3">Email</div>
                            <div class="col-md-8 col-lg-9">{{usr.email}}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-3">Status</div>
                            <div class="col-md-8 col-lg-9">
                            <span v-if="usr.IsEnabled === true" class="badge badge-success"><i class="fa fa-check"></i> Active</span>
                            <span v-else class="badge badge-danger"><i class="fa fa-ban"></i> Blocked</span>
                            </div>
                        </div>
                        <div class="section-caption mt-3">Ganti Username</div>
                        <div class="row">
                            <div class="col-md-4 col-lg-3 col-form-label">Username Baru</div>
                            <div class="col-md-8 col-lg-9">
                                <input type="text" class="form-control" v-model="userName"/>
                            </div>
                        </div>
                        <div class="section-caption mt-3">Ganti Password</div>
                         <div class="row">
                            <div class="col-md-4 col-lg-3 col-form-label">Password Baru Baru</div>
                            <div class="col-md-8 col-lg-9">
                                <input type="password" class="form-control" v-model="password"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 col-lg-3 col-form-label">Reenter New Password</div>
                            <div class="col-md-8 col-lg-9">
                                <input type="password" class="form-control" v-model="password2" @input="checkPasswords"/>
                                <div class="bg-light p-2 mt-2" v-html="password_status"/>
                            </div>
                        </div>
                        
                    </div>
                    <div  class="card-footer d-flex justify-content-between">
                        <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
                        
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>
<style scoped>
.section-caption{font-weight: 600;}
</style>
<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';

// Router and route
const route = useRoute();
const router = useRouter();

// Reactive variables
const usr = ref([]);
const userName = ref('');
const password = ref('');
const password2 = ref('');
const password_status = ref('');

// Computed property to disable submit button if passwords mismatch
const isSubmitDisabled = computed(() => password.value !== password2.value);

// Fetch user data
const getData = async () => {
  try {
    const postData = {
      uagent: 'vue-dashboard',
      data: JSON.stringify({ memberId: route.params.memberId }),
    };
    const response = await api.post('/user/view', postData);
    if (response.data.status === 68) {
      usr.value = response.data.data;
      userName.value = response.data.data.userName;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// Check if passwords match
const checkPasswords = () => {
  if (password.value === password2.value) {
    password_status.value =
      '<span class="text-success"><i class="fa fa-check me-2"></i> Your new password matches</span>';
  } else {
    password_status.value =
      '<span class="text-danger"><i class="fa fa-warning me-2"></i>Inconsistent password</span>';
  }
};

// Submit password change form
const submitForm = async () => {
  try {
    const postData = {
      uagent: 'vue-dashboard',
      data: JSON.stringify({
        memberId: route.params.memberId,
        password: password.value,
        userName: userName.value,
      }),
    };
    const response = await api.post('/user/password', postData);
    if (response.data.status === 68) {
      router.push('/user/view/' + route.params.memberId);
    }
  } catch (error) {
    console.error('Error updating password:', error);
  }
};

// Run on mount
onMounted(() => {
  getData();
});
</script>
