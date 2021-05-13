import {request_get} from '../../js/request'
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