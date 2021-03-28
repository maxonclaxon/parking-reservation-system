import {request_get} from '../../js/request'
import readCookie from '../../js/readcookie'
export default{
    actions:{
        async loadParkings(context){
            return  request_get('api/authenticated/profile/getParkingAdresses',
            {login:readCookie('login')},
            readCookie('token')).then((response)=>{
                if(response.status==200){
                    context.commit('updateAdresses', response.data.adresses);
                }
            })
        },

    },
    mutations:{
        updateAdresses(state, object){
            state.adresses=object;
        }
    },
    state:{
        adresses:[],
    },
    getters:{
        getParkingAdresses(state){
            return state.adresses
        }
    }
}