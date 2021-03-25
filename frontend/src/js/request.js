import axios from 'axios'
export async function request(api, method='get', data=null, authorization=null){
    return await axios({
        url:'http://192.168.1.40:8000/'+api,
        method:method,
        params:{
            
        },
        data:data,
        headers:{
            'content-type':'application/json',
            'authorization':authorization? authorization : null
        }
    })
}