<template>
    <main class="bg-me-gradient vh-min-100 pt-5 pb-5">
        <div class="row d-flex justify-content-center">
            <div class="col-10 col-lg-5 align-self-center">
                
                <div class="card">
                   <div class="card-body p-5">
                        <div class="text-center mb-4">
                            <router-link to="/" class="mb-5">
                                <img src="@/assets/images/identities/logo.png" class="img-icon"/>
                            </router-link>
                            <h1 class="form-title mt-3">Form Pendaftaran Anggota Partai Pelita</h1>
                            <div class="text-gray mb-5">Silakan isi data sesuai dengan Kartu Tanda Penduduk</div>
                        </div>
                        <form @submit.prevent="submitForm" role="form">
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">NIK/KTP</div>
                                <div class="col">
                                    <input type="text" v-model="nik" inputmode="numeric" placeholder="Nomor Induk Kependudukan/KTP" class="form-control" maxlength="16" @input="sanitizeNik" required/>
                                    <div v-if="nik && nik.length < 16" class="nik-info text-danger mt-2 fst-italic small">
                                        NIK harus 16 digit
                                    </div>

                                    <div v-if="isNikExist" class="alert bg-danger text-white mt-2">
                                    <i class="fa fa-warning"></i>
                                        NIK yang anda masukan telah terdaftar di System Partai Pelita
                                    </div>
                                </div>
                            </div>
                            
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Nama Lengkap</div>
                                <div class="col">
                                    <input type="text" placeholder="Nama" v-model="name" class="form-control text-uppercase" required/>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Jenis Kelamin</div>
                                <div class="col">
                                    <select id="gender" v-model="gender" class="form-select">
                                        <option value="L">Pria</option>
                                        <option value="P">Wanita</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Tempat & Tanggal Lahir</div>
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

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Nomor Whatsapp</div>
                                <div class="col">
                                    <input type="text" v-model="mobile" inputmode="numeric" placeholder="08xxx" class="form-control" @input="sanitizeMobile" maxlength="20" required/>
                                    <div v-if="mobile && mobile.length < 10" class="nik-info text-danger mt-2 fst-italic small">
                                        Nomor whatsapp minimal 10 digit
                                    </div>
                                    <div v-if="isNumberExist" class="alert bg-danger text-white mt-2">
                                        <i class="fa fa-warning"></i> Nomor whatsapp yang anda masukan telah terdaftar di System Partai Pelita
                                    </div>
                                   

                                   
                                </div>
                            </div>

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Email <span class="small fst-italic text-gray">***jika ada</span></div>
                                <div class="col">
                                    <input type="text" v-model="email" placeholder="opsional" class="form-control text-lowercase"/>
                                </div>
                            </div>

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Pendidikan Terakhir</div>
                                <div class="col">
                                    <select id="eduid" v-model="eduId" class="form-select">
                                        <option v-for="e in educations" :value="e.id" :key="e.id">{{ e.level }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Pekerjaan</div>
                                <div class="col">
                                    <select id="jobid" v-model="jobId" class="form-select">
                                        <option v-for="j in jobs" :value="j.id" :key="j.id">{{ j.job }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Status Perkawinan</div>
                                <div class="col">
                                    <select id="marid" v-model="marId" class="form-select">
                                        <option v-for="m in maritals" :value="m.id" :key="m.id">{{ m.marital }}</option>
                                    </select>
                                </div>
                            </div>

                            <div class="with-dashed pb-1"></div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center">Alamat</div>
                                <div class="col">
                                    <input type="text" v-model="address" placeholder="Jalan atau Desa" class="form-control text-uppercase" required/>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Provinsi</div>
                                <div class="col">
                                    <select id="provcode" v-model="provCode" class="form-select" @change="fetchDistrict">
                                        <option v-for="p in provinces" :value="p.code" :key="p.province">{{ p.province }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Kabupaten/Kota</div>
                                <div class="col">
                                    <select id="discode" v-model="disCode" class="form-select" @change="fetchSubdistrict">
                                        <option v-for="d in districts" :value="d.code" :key="d.district">{{ d.remark }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Kecamatan</div>
                                <div class="col">
                                    <select id="sudcode" v-model="sudCode" class="form-select" @change="fetchVillage">
                                        <option v-for="s in subdistricts" :value="s.code" :key="s.subdistrict">{{ s.subdistrict }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Desa</div>
                                <div class="col">
                                    <select id="vilcode" v-model="vilCode" class="form-select">
                                        <option v-for="v in villages" :value="v.code" :key="v.village">{{ v.village }}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="with-dashed pb-1"></div>

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end">Upload Foto KTP</div>
                                <div class="col" style="min-width:0">
                                   <div class="form-control d-flex align-items-center" style="min-height:40px">
                                        <input
                                            type="file"
                                            ref="fileInput"
                                            class="d-none"
                                            accept="image/*"
                                            @change="handleImageUpload"
                                        />

                                        <span
                                            :class="fileName ? 'text-dark' : 'text-muted'"
                                            class="flex-grow-1 text-truncate"
                                            style="min-width:0"
                                        >
                                            {{ fileName || 'Pilih file…' }}
                                        </span>

                                        <button
                                            type="button"
                                            class="btn btn-sm btn-secondary ms-2"
                                            @click="$refs.fileInput.click()"
                                                >
                                            Pilih Berkas
                                        </button>
                                    </div>

                                </div>
                            </div>

                            

                            <div class="row d-flex mb-2">
                                <div class="col-md-4 align-self-center text-end"></div>
                                <div class="col">
                                    <label class="mb-2">
                                        <input type="checkbox" v-model="isReadyStaff" />
                                        Siap menjadi pengurus partai jika diperlukan
                                    </label>
                                    <label class="mb-2">
                                        <input type="checkbox" v-model="isReadyAction" />
                                        Siap berkontribusi moril dan materil jika diperlukan
                                    </label>
                                </div>
                            </div>
                            <div class="with-dashed pb-1"></div>
                            <label class="mb-2 small fst-italic d-flex">
                                <input type="checkbox" class="me-1 mt-1" v-model="isReal" />
                                Dengan ini Saya menyatakan bahwa BENAR mengajukan diri sebagai Anggota PARTAI PELITA dan menyetujui persyaratan dengan sebenar-benarnya dan sadar, tanpa tekanan dari pihak manapun. Saya menyatakan tunduk dan patuh pada AD/ART serta keputusan DPP PARTAI PELITA, Jika suatu saat saya melakukan pelanggaran terhadap pernyaataan ini, saya bersedia diberhentikan dari keanggotaan PARTAI PELITA.
                            </label>
                            <div class="with-dashed pb-1"></div>
                            <div class="text-center mt-3 mb-2">
                                <button class="btn btn-primary" type="submit" :disabled="isSubmitDisabled">Kirim Pendaftaran</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
    .form-title{font-size: 1.5em;font-weight: 600;}
    .img-icon{width:100px}
</style>
<script setup>
    import api from '@/services/api';
    import {ref,onMounted,watch,computed} from 'vue';
    import { useRouter } from 'vue-router';
    import Swal from 'sweetalert2';

    const router = useRouter();
    const isNumberExist = ref(false);
    const isNikExist = ref(false);
    const years = ref([]);
    const dates = ref([]);
    const months = ref([]);
    const fileName = ref(null);

    const provinces = ref([]);
    const districts = ref([]);
    const subdistricts = ref([]);
    const villages = ref([]);
    const jobs = ref([])
    const maritals = ref([])
    const educations = ref([])

    const provCode = ref(null);
    const disCode = ref(null);
    const sudCode = ref(null);
    const vilCode = ref(null);
    const name = ref(null);
    const nik = ref('');
    const gender =ref(null);
    const birthDate = ref(null);
    const birthPlace = ref(null);
    const email = ref('');
    const mobile = ref('');
    const address = ref(null);
    const jobId = ref(null);
    const marId = ref(null);
    const eduId = ref(null);


    const isReal =ref(false);
    const isReadyAction=ref(false);
    const isReadyStaff =ref(false);
    const selectedFile = ref(null);
    const selectedDate = ref(null);
    const selectedMonth = ref(null);
    const selectedYear = ref(null);

    for (let year = 1945; year <= 2025; year++) {
        years.value.push(year);
    }

    months.value = [
        { "Id": "01", "Month": "Januari" },
        { "Id": "02", "Month": "Februari" },
        { "Id": "03", "Month": "Maret" },
        { "Id": "04", "Month": "April" },
        { "Id": "05", "Month": "Mei" },
        { "Id": "06", "Month": "Juni" },
        { "Id": "07", "Month": "Juli" },
        { "Id": "08", "Month": "Agustus" },
        { "Id": "09", "Month": "September" },
        { "Id": "10", "Month": "Oktober" },
        { "Id": "11", "Month": "November" },
        { "Id": "12", "Month": "Desember" }
    ];

    for (let date = 1; date <= 31; date++) {
        const formattedDate = String(date).padStart(2, '0'); // Pad with leading zeros if necessary
        dates.value.push(formattedDate);
    }

    onMounted(()=>{
        fetchProvince()
        fetchMarital()
        fetchJobs()
        fetchEducation()
    })

    const sanitizeNik = (e) => {
     nik.value = e.target.value.replace(/\D/g, '')
    }

    const sanitizeMobile = (e) => {
     mobile.value = e.target.value.replace(/\D/g, '')
    }

    function handleImageUpload(event) {
      const file = event.target.files?.[0]
      fileName.value = file ? file.name : null
      selectedFile.value = file;
    }

    async function fetchProvince(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({"word":"test"})
        }
        const result = await api.post('/public/get-province',postData);
        provinces.value = result.data.data;
    }

    async function fetchDistrict(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({provCode:provCode.value})
        }
        const result = await api.post('/public/get-district',postData);
        districts.value = result.data.data;
    }

    async function fetchSubdistrict(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({disCode:disCode.value})
        }
        const result = await api.post('/public/get-subdistrict',postData);
        subdistricts.value = result.data.data;
    }

    async function fetchVillage(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({sudCode:sudCode.value})
        }
        const result = await api.post('/public/get-village',postData);
        villages.value = result.data.data;
    }

    async function fetchJobs(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({})
        }
        const result = await api.post('/public/get-job',postData);
        jobs.value = result.data.data;
    }

    async function fetchEducation(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({})
        }
        const result = await api.post('/public/get-education',postData);
        educations.value = result.data.data;
    }

    async function fetchMarital(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({})
        }
        const result = await api.post('/public/get-marital',postData);
        maritals.value = result.data.data;
    }

    watch(nik, async (value, oldValue) => {
        isNikExist.value = false

        if (value.length === 16 && value !== oldValue) {
            await checkNIK()
        }
    })

    let mobileTimeout

    watch(mobile, (value, oldValue) => {
        isNumberExist.value = false
        clearTimeout(mobileTimeout)

        // terlalu pendek → tidak valid
        if (value.length < 10) return

        // terlalu panjang → invalid (guard)
        if (value.length > 18) return

        // tidak berubah secara substansial
        if (value === oldValue) return

        // debounce untuk hindari spam API
        mobileTimeout = setTimeout(() => {
            checkMobile()
        }, 400)
    })

    const isSubmitDisabled = computed(() => {
        // blokir jika ada duplikasi
        if (isNikExist.value || isNumberExist.value) return true

        // opsional: blokir jika input belum valid secara minimal
        if (nik.value.length !== 16) return true
        if (mobile.value.length < 10) return true

        return false
    })
    
    async function checkNIK(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({
                nik:nik.value
            })
        }
        const result = await api.post('/auth/check-status',postData);
        isNikExist.value = result.data.data;
    }

    async function checkMobile(){
        const postData={
            uagent: 'web',
            data: JSON.stringify({
                mobile:mobile.value
            })
        }
        const result = await api.post('/auth/check-mobile',postData);
        isNumberExist.value = result.data.data;
    }

    async function submitForm(){
         if (!selectedFile.value) {
            Swal.fire({
            title: '<span style="font-size: 20px;">Konfirmasi!</span>',
                html: 'Wajib mengupload foto KTP!<br/><small>Anda wajib menyertakan berkas/foto KTP</small>',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'Ulangi',
                customClass: {
                    popup: 'swal-popup-rounded',
                    icon: 'swal-icon-small',
                    title: 'swal-title-custom',
                    confirmButton: 'swal-btn-custom btn-round bg-me'
                }
            })
            return
         }
         try{

            birthDate.value = selectedYear.value+"-"+selectedMonth.value+"-"+selectedDate.value;
            const postData = JSON.stringify({
                name:name.value.toUpperCase(),
                nik:nik.value,
                birthPlace:birthPlace.value.toUpperCase(),
                birthDate:birthDate.value,
                gender:gender.value,
                address:address.value.toUpperCase(),
                provCode:provCode.value,
                sudCode:sudCode.value,
                disCode:disCode.value,
                vilCode:vilCode.value,
                mobile:mobile.value,
                email:email.value.toLowerCase(),
                jobId:jobId.value,
                marId:marId.value,
                eduId:eduId.value,
                isReadyAction:isReadyAction.value,
                isReadyStaff:isReadyStaff.value
            })

            const formData = new FormData()
            formData.append('data',postData)
            if (selectedFile.value) {
                formData.append('image', selectedFile.value)
            }

            const res = await api.post('/auth/register', formData)

            if (res.data.status == 68) {
                router.push(`/register-processed/${res.data.data.memberId}`)
            }
         }
         catch (error) {
            console.error('Error reg:', error)
            Swal.fire({
            title: '<span style="font-size: 20px;">Konfirmasi!</span>',
                html: error,
                icon: 'warning',
                customClass: {
                    popup: 'swal-popup-rounded',
                    icon: 'swal-icon-small',
                    title: 'swal-title-custom',
                    confirmButton: 'swal-btn-custom btn-round bg-me'
                }
            })
        }
         
   
        //router.push('/register-processed');
    }
</script>