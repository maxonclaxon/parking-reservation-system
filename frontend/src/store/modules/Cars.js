import {request_get, request_post} from '../../js/request'
import readCookie from '../../js/readcookie'
export default{
    actions:{
        async loadProfileCars(context){
            return  request_get('api/authenticated/profile/getProfileCars',
            {login:readCookie('login')},
            readCookie('token')).then((response)=>{
                if(response.status==200){
                    //console.log('cars loaded');
                    //console.log(response.data)
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
            return request_post('api/authenticated/profile/registerCar',
            carObject,
            readCookie('token'))


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