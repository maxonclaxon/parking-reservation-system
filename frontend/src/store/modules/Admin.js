import {request_get} from '../../js/request'
import readCookie from '../../js/readcookie'
export default{
    actions:{
        async getProfileByInfo(context,ProfileInfo){
            return request_get('api/admin/searchUser',
            {
                login:ProfileInfo.login,
                name:ProfileInfo.name,
                phone:ProfileInfo.phone,
                car_num:ProfileInfo.car_num,
            }, readCookie('token')).then((response)=>{
                if(response.status==200){
                    context.commit('updateProfile', response.data.profile)
                    return response;
                }
                else console.log('ОШИБКА ЗАГРУЗКИ ЮЗЕРА')
            })
        },
        async loadParkings(context){
            return request_get('api/admin/getParkings',{},readCookie('token')).then((response)=>{
                if(response.status==200){
                    context.commit('updateParkings', response.data.parkings)
                    return response;
                }
            })
        },
        async addParkingPlace(context, placeObject){
            return request_get('api/admin/addParkingPlace',{
                adress:placeObject.adress,
                floor:placeObject.floor,
            }, readCookie('token')).then((response)=>{
                if(response.status==200){
                    return response
                }
            })
        },
        async addParking(context, adress){
            return request_get('api/admin/addParking',
            {adress},
            readCookie('token')).then((response)=>{
                if(response.status==200){
                    return response;
                }
            })
        },
        async makeReport(context, reportObj){
            return request_get('api/admin/makeReport',reportObj,readCookie('token')).then((response)=>{
                if (response.status==200){
                    context.commit('updateReport', response.data.reportObject)
                    return response;
                }
            })
        }

    },
    mutations:{
        updateProfile(state,object){
            state.profile=object;
        },
        updateParkings(state, object){
            state.parkings=object;
        },
        updateReport(state, object){
            state.report=object;
        }
    },
    state:{
        profile:{},
        parkings:{},
        report:{}
    },
    getters:{
        getProfileObject(state){
            return state.profile
        },
        getParkings(state){
            return state.parkings;
        },
        getReport(state){
            return state.report;
        }
        
    }
}