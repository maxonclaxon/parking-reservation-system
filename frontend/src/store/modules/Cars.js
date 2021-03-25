import {request} from '../../js/request'
import readCookie from '../../js/readcookie'
export default{
    actions:{
        async loadProfileCars(context){
            await request('api/authenticated/getProfileCars','POST',
            {login:readCookie('login')},
            readCookie('token')).then((response)=>{
                if(response.status==200){
                    context.commit('updateCars', response.data.cars);
                }
            })
        }
    },
    mutations:{
        updateCars(state, object){
            state.cars=object;
        }
    },
    state:{
        cars:[]
    },
    getters:{
        getProfileCars(state){
            return state.cars
        }
    }
}