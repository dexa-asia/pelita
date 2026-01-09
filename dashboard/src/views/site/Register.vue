<template>
    <main class="main-page bg-me p-4">
        <router-link to="/" class="mb-5">
            <img src="@/assets/images/identities/logo.png" class="img-icon"/>
        </router-link>
        <div class="card w-100 round-big">
            <div class="card-header round-big text-center">
                <div class="card-title mt-5">Buat Akun</div>
                <div class="smallest text-secondary mb-3">Dapatkan berbagai benefit dengan mendaftar akun Bizz</div>
            </div>
            <div class="card-body">
                <div class="m-1">
                    <!-- Username -->
                    <label class="text-label">Nama Anda</label>
                    <div class="input-group mb-2">
                        <span class="input-group-text text-secondary"><i class="pi pi-user"></i></span>
                        <input type="text" placeholder="nama" class="form-control"/>
                    </div>


                    <label class="text-label">No Whatsapp</label>
                    <div class="input-group mb-2">
                        <span class="input-group-text text-secondary"><i class="pi pi-whatsapp"></i></span>
                        <input type="text" placeholder="081xxx" class="form-control"/>
                    </div>

                    <label class="text-label">Email</label>
                    <div class="input-group mb-2">
                        <span class="input-group-text text-secondary"><i class="pi pi-envelope"></i></span>
                        <input type="text" placeholder="email@domain.com" class="form-control"/>
                    </div>


                    <!-- Password -->
                    <label class="text-label mt-3">Password</label>
                    <div class="input-group mb-2">
                        <span class="input-group-text"><i class="pi pi-lock"></i></span>
                        <input type="password" placeholder="password" class="form-control"/>
                    </div>
                   

                    <!-- Button -->
                    <button class="btn btn-me w-100 round-big mt-5 mb-5">Lanjutkan <i class="fa fa-arrow-right"></i></button>
                </div>
                </div>
        </div>
        <div class="mb-3 small mt-5">Sudah punya akun? 
            <router-link to="/auth" class="text-bold text-white">Login</router-link>
        </div>

        
      
    </main>
</template>
<style scoped>
.main-page{height: 100vh;display:flex;justify-content: center;align-items: center;flex-direction: column;background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);}
.card-title{font-size:1.5em;font-weight: 600;color:#4A00E0;}
.img-icon{width:100px}
.input-group-text{background-color: #fff;border-right:none!important;}
.input-group .form-control{border-left:none!important;}

</style>
