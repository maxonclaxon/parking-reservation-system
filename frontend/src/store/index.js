import {createStore} from 'vuex'
import Cars from './modules/Cars'
import Parking from './modules/Parking'
import Profile from './modules/Profile'
export default new createStore({
    modules:{
        Cars,
        Parking,
        Profile
    }
})