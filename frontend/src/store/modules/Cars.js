import {request_get, request_post} from '../../js/request'
import readCookie from '../../js/readcookie'
export default{
    actions:{
        async loadProfileCars(context){
            await request_get('api/authenticated/profile/getProfileCars',
            {login:readCookie('login')},
            readCookie('token')).then((response)=>{
                if(response.status==200){
                    context.commit('updateCars', response.data.cars);
                }
            })
        },
        async registerCar(context, carInfo){
            let carObject = 
                {number:carInfo.num,
                mark:carInfo.mark,
                login:readCookie('login')}
            console.log('request for car add with object: ')
            console.log(carObject)
            await request_post('api/authenticated/profile/registerCar',
            carObject,
            readCookie('token')).then((response)=>{
                if(response.status==200&&response.data.message=="Car added"){
                    context.dispatch('loadProfileCars');
                }
                else{
                    console.log('CARR ADDING ERROR. STATUS: '+response.status+'\n message: '+response.data.message)
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