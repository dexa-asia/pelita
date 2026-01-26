<template>
    <main>
        <form @submit.prevent="submitForm">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Update Data Anggota</div>
                        </div>
                        <div class="card-body detail-view">
                            <div class="row">
                                <div class="col-md-4 col-lg-3 align-self-center">Nama Lengkap</div>
                                <div class="col">
                                    <input type="text" class="form-control" v-model="name">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-lg-3 align-self-center">NIK</div>
                                <div class="col">
                                    <input type="text" class="form-control" v-model="nik" @input="sanitizeNIK">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-lg-3 align-self-center">Jenis Kelamin</div>
                                <div class="col">
                                    <select id="gender" v-model="gender" class="form-select">
                                        <option value="L">Pria</option>
                                        <option value="P">Wanita</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-lg-3 mt-2">Tempat & Tgl Lahir</div>
                                <div class="col">
                                    <input type="text" v-model="birthPlace" placeholder="kota kelahiran" class="form-control text-uppercase" required/>
                                    <div class="row">
                                        <div class="col">
                                            <select id="date" v-model="selectedDate" class="form-select" required>
                                                    <option v-for="date in dates" :key="date" :value="date">{{ date }}</option>
                                                </select>
                                        </div>
                                        <div class="col">
                                            <select id="month" v-model="selectedMonth" class="form-select" required>
                                                    <option v-for="m in months" :value="m.Id" :key="m.Month">{{ m.Month }}</option>
                                                </select>
                                         </div>
                                         <div class="col">
                                                <select id="year" v-model="selectedYear" class="form-select" required>
                                                    <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
                                                </select>
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-lg-3 align-self-center">No Whatsapp</div>
                                <div class="col">
                                    <input type="text" class="form-control" v-model="mobile" @input="sanitizeMobile">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-lg-3 align-self-center">Email</div>
                                <div class="col">
                                    <input type="text" class="form-control" v-model="email">
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4 col-lg-3 align-self-center">Pendidikan Terakhir</div>
                                <div class="col">
                                     <select id="eduid" v-model="eduId" class="form-select" required="">
                                        <option v-for="e in educations" :value="e.id" :key="e.id">{{ e.level }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-lg-3 align-self-center">Pekerjaan</div>
                                <div class="col">
                                     <select id="jobid" v-model="jobId" class="form-select" required="">
                                        <option v-for="j in jobs" :value="j.id" :key="j.id">{{ j.job }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 col-lg-3 align-self-center">Status Perkawinan</div>
                                <div class="col">
                                    <select id="marid" v-model="marId" class="form-select" required="">
                                        <option v-for="m in maritals" :value="m.id" :key="m.id">{{ m.marital }}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="card-footer">

                        </div>
                    </div>
                </div>
            </div>
        </form>
    </main>
</template>

<script setup>
import api from '@/services/api';
import {ref,onMounted} from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

</script>