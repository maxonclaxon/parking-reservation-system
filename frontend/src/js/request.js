import axios from 'axios'
export async function request_post(api, data=null, authorization=null){
    return await axios({
        url:'http://127.0.0.1:8000/'+api,
        method:'POST',
        params:{
            
        },
        data:data,
        headers:{
            'content-type':'application/json',
            'authorization':authorization? authorization : null
        }
    })
}
export async function request_get(api, pars=null, authorization=null){
    return await axios({
        url:'http://127.0.0.1:8000/'+api,
        method:'GET',
        params:pars,
        headers:{
            'content-type':'application/json',
            'authorization':authorization? authorization : null
        }
    })
}