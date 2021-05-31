<template>   
<div class="main">
  <Sidebar v-if="authenticated"/>
  <router-view />
</div>
</template>

<script>
import readCookie from './js/readcookie'
import Sidebar from './components/Sidebar.vue'
import M from 'materialize-css'
import inicializeSideBar from './js/inicializeSideBar'
export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  components: {
    Sidebar,
  },
  computed:{
    authenticated: function(){
      if(readCookie('token')) {return true}
      else return false;
    }},
  mounted(){
    if(!readCookie('token')) this.$router.push('/auth')
    else if(readCookie('type')=='0') {this.$router.push('/profile')}
    else if(readCookie('type')=='1') {this.$router.push('/admin')}
    inicializeSideBar(M)
    
  }
  //load-grunt-config, module
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  /* width: 400px; */
  margin: 0 auto;
  height: 100%;
}
</style>