import {createStore} from 'vuex'
import Cars from './modules/Cars'
import Parking from './modules/Parking'
import Profile from './modules/Profile'
import Admin from './modules/Admin'
export default new createStore({
    modules:{
        Cars,
        Parking,
        Profile,
        Admin,
    }
})