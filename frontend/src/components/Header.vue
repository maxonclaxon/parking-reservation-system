<template >
    <div>
        <ul>
            <li>{{login}}</li>
            <li>Parkings</li>
            <li>Money</li>
            <li>SetOnParking</li>


        </ul>
    </div>
</template>

<script>

import readCookie from '../js/readcookie'
export default {
    data() {
        return {
            
        }
    },
    computed: {
        token: function(){
            return readCookie('token')
        },
        login: function(){
            return readCookie('login')
        }
    },
}
</script>

<style scoped>
ul{
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    justify-content: space-around;
    
}
li{
    width: 35%;
}
</style>