import {createStore} from 'vuex'
import Cars from './modules/Cars'
import Parking from './modules/Parking'

export default new createStore({
    modules:{
        Cars,
        Parking
    }
})