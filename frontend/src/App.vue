<template>
  <div v-if="authenticated">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
  <Auth v-else/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Auth from './components/Auth.vue'

export default {
  name: 'App',
  data(){
    return{
      authenticated:false,
    }
  },
  components: {
    HelloWorld,
    Auth
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
}
</style>
