<template>
    <main>
        <div class="d-flex mb-2">
            <div class="page-title">
                Detail Anggota
            <div class="annotation">Profil Detail Anggota</div>
            </div>
            <div class="col text-end align-item-center">
                <router-link class="btn btn-me" :to="'/member'">List Anggota</router-link>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="card-title">Data Personal</div>
                    </div>
                    <div class="card-body detail-view">
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Kode System</div>
                            <div class="col">{{ mb.memberId }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Nama Lengkap</div>
                            <div class="col">{{ mb.name }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">NIK</div>
                            <div class="col">{{ mb.nik }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Tempat, Tgl Lahir</div>
                            <div class="col">{{ mb.birthPlace }}, {{ mb.birthDate }} <span class="fst-italic text-gray">({{ mb.age }} tahun)</span></div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Jenis Kelamin</div>
                            <div class="col">{{ mb.gender }}</div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Status Marital</div>
                            <div class="col">{{ mb.marital }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Pekerjaan</div>
                            <div class="col">{{ mb.job }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Pendidikan Terakhir</div>
                            <div class="col">{{ mb.education }}</div>
                        </div>
                    </div>
                </div>

                <div class="card mb-3">
                    <div class="card-header">
                        <div class="card-title">Alamat & Domisili</div>
                    </div>
                    <div class="card-body detail-view">
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Alamat</div>
                            <div class="col">{{ mb.address }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Desa</div>
                            <div class="col">{{ mb.village }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Kecamatan</div>
                            <div class="col">{{ mb.subdistrict }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Kab/Kota</div>
                            <div class="col">{{ mb.district }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Provinsi</div>
                            <div class="col">{{ mb.province }}</div>
                        </div>
                    </div>
                </div>

                <div class="card mb-3">
                    <div class="card-header">
                        <div class="card-title">Data Kontak</div>
                    </div>
                    <div class="card-body detail-view">
                        <div class="row">
                            <div class="col-md-4 text-me-soft">No Whatsapp</div>
                            <div class="col">{{ mb.mobileDecoded }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Email</div>
                            <div class="col">{{ mb.email }}</div>
                        </div>
                        
                    </div>
                </div>

            </div>
            <div class="col-md-4">
                
                 <div class="card mb-3">
                    <div class="card-header">
                        <div class="card-title">Dokumen</div>
                    </div>
                    <div class="card-body">
                        <img :src="mb.card" class="img-fluid"/>
                    </div>
                </div>
                <div class="card mb-3">
                    <div class="card-header">
                        <div class="card-title">Kartu Anggota</div>
                    </div>
                    <div class="card-body">
                        <img :src="mb.card" class="img-fluid"/>
                    </div>
                </div>

                <div class="card mb-3">
                    <div class="card-header">
                        <div class="card-title">Data System</div>
                    </div>
                    <div class="card-body detail-view">
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Tgl Daftar</div>
                            <div class="col text-end">{{ formatUtcToWib(mb.registerDate) }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Referensi</div>
                            <div class="col text-end">{{ mb.referrer }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Source</div>
                            <div class="col text-end">{{ mb.source }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Chanel</div>
                            <div class="col text-end">{{ mb.chanel }}</div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Status</div>
                            <div v-if="mb.statusId===2" class="col text-end text-success">
                                <i class="fa fa-check-circle me-1"></i>{{ mb.status }}
                            </div>
                            <div v-else class="col text-end text-warning">
                                <i class="fa fa-exclamation-circle me-1"></i>{{ mb.status }}
                            </div>
                           
                        </div>
                        <div class="row">
                            <div class="col-md-4 text-me-soft">Terakhir Update</div>
                            <div class="col text-end">{{ formatUtcToWib(mb.lastUpdate) }}</div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<script setup>
    import api from '@/services/api';
    import { ref,onMounted } from 'vue';
    import { useRoute } from 'vue-router';
    import { formatDate, formatUtcToWib } from '@/services/onebizz';

    const route = useRoute()
    const mb = ref({})

    onMounted(()=>{
        fetchData()
    })

    async function fetchData() {
        try {
            const postData = {
                data: JSON.stringify({
                    memberId: route.params.memberId,
                }),
            }
            const response = await api.post('/member/view', postData)
            mb.value = response.data.data

        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }
</script>