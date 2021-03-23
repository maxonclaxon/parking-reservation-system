<template>
  <Main v-if="authenticated"/>
  <Auth v-else/>
</template>

<script>
import Auth from './components/Auth.vue'
import Main from './components/Main.vue'
import readCookie from './js/readcookie'

export default {
  name: 'App',
  data(){
    return{
      
    }
  },
  components: {
    Main,
    Auth
  },
  computed:{
    authenticated: function(){
      console.log(readCookie('token'));
      if(readCookie('token')) return true;
      else return false;
    }
  }
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
  width: 400px;
  margin: 0 auto;
  height: 100%;
}
</style>
