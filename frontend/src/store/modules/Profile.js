import {request_get, request_post} from '../../js/request'
import readCookie from '../../js/readcookie'
export default{
    actions:{
        async loadProfileInfo(context){
            return  request_get('api/authenticated/profile/getInfo',
            {login:readCookie('login')},
            readCookie('token')).then((response)=>{
                if(response.status==200){
                    //console.log('cars loaded');
                    //console.log(response.data)
                    context.commit('updateInfo', response.data.info);
                }
            })
        },
        async addToBalance(context, amount){
            return request_post('api/authenticated/profile/addToBalance',
            {login:readCookie('login'), amount:amount}, readCookie('token')).then((response)=>{
                return response
            })
        }

    },
    mutations:{
        updateInfo(state, object){
            state.profileInfo=object;
        }
    },
    state:{
        profileInfo:{}
    },
    getters:{
        getProfileInfo(state){
            return state.profileInfo;
        }
    }
}