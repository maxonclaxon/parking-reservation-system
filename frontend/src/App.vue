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
    },
  }
}
</script>

<style lang='scss' scoped>

</style>
