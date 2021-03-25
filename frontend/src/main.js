import { createApp } from 'vue'
import App from './App.vue'
import '../node_modules/materialize-css/dist/css/materialize.min.css'
import '../node_modules/materialize-css/dist/js/materialize'
import '../node_modules/jquery'
import router from './js/router'
import store from './store'
createApp(App).use(router).use(store).mount('#app')

