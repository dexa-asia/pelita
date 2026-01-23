<template>
    <main class="bg-me-gradient">
        <div class="row d-flex vh-100 justify-content-center">
            <div class="col-10 col-lg-5 align-self-center">
                <div class="card">
                    <div class="card-header">
                        <div class="card-title"></div>
                    </div>
                    <div class="card-body">
                        <div class="text-center mb-4">
                            <router-link to="/" class="mb-5">
                                <img src="@/assets/images/identities/logo.png" class="img-icon"/>
                            </router-link>
                            <h1 class="form-title mt-3">Pusat Data & Informasi</h1>
                            <div class="text-gray mb-5">Silakan pilih menu yang sesuai</div>
                        </div>
                        <div class="row mb-3">
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/daftar">
                                    <i class="pi pi-user-plus fa-2x"></i><br/>
                                    Daftar<br/>Jadi Anggota
                                </router-link>
                            </div>
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/cekstatus">
                                    <i class="pi pi-search fa-2x"></i><br/>
                                    Cek Status<br/>Keanggotaan
                                </router-link>
                            </div>
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/">
                                    <i class="pi pi-user-edit fa-2x"></i><br/>
                                    Perbarui<br/>Data
                                </router-link>
                            </div>
                        </div>

                        <div class="row mb-3 d-none">
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/">
                                    <i class="pi pi-eye fa-2x"></i><br/>
                                    Informasi<br/>Partai
                                </router-link>
                            </div>
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/">
                                    <i class="pi pi-calendar fa-2x"></i><br/>
                                    Agenda dan<br/>Pengumuman
                                </router-link>
                            </div>
                            <div class="col">
                                <router-link class="iconized text-center p-3 d-block" to="/register">
                                    <i class="pi pi-share-alt fa-2x"></i><br/>
                                    Rekomendasikan<br/>Ke Teman
                                </router-link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
    .form-title{font-size: 1.5em;font-weight: 600;}
    .img-icon{width:100px}
    .iconized{background-color: var(--me-light);border-radius: 20px;}
    .iconized:hover{background-color: var(--me-primary);color:#fff;}
</style>