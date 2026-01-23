<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';


</script>

<template>
    <div class="main-wrapper bg-me-gradient">
        <div class="main-container bg-me-gradient-base">
            <div class="p-4">
                <img src="@/assets/images/identities/logo.png" class="img-logo"/>
            </div>

            
             <Navbar/>
             <router-view/>

        </div>
       
        <div class="bg-me bottom">
            <div class="container">
                <div class="row">
                    <div class="col">
                        <h5 class="mb-5">SEKRETARIAT DPP</h5>
                        Jalan Margasatwa<br/>
                        Cilandak<br/>
                        Jakarta Selatan
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
    .img-logo{height:100px}
    .bottom{padding:100px 40px 100px 40px}
</style>
