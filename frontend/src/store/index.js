import {createStore} from 'vuex'
import Cars from './modules/Cars'

export default new createStore({
    modules:{
        Cars,
    }
})