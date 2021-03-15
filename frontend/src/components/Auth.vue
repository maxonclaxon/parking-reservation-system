<template>
    <div>
        <form v-if="authentication" @submit.prevent="Auth()">
            <input type="text" name="" id="login" v-model="login" autofocus placeholder="Логин" required>
            <input type="text" name="" id="password" v-model="password" placeholder="Пароль" required>
            <span v-if="loginError">Неверно введён логин и/или пароль</span>
            <input type="submit" value="Войти" class="btn">
            <input type="button" value="У меня нет аккаутна" class="btn" @click="authentication=false">
        </form>
        <form v-else @submit.prevent="Registration()">
            <input type="text" name="" id="login" placeholder="Логин" v-model="login" required>
            <input type="text" name="" id="password" placeholder="Пароль" v-model="password" required>
            <span v-if="profileExists">Профиль с таким логином уже существует</span>
            <input type="submit" value="Зарегистрироваться" class="btn">
        </form>
    </div>
</template>

<script>
//import {request} from '../js/request'
import {request} from '../js/request'
export default {
    name: 'Auth',
    data(){
        return{
            login:'admin',
            password:'password',
            authentication:true,
            profileExists:false,
            loginError:false
        }
    },
    methods:{
    async Auth(){
        var response;
        try{
            response = await request('api/auth','post', {login:this.login, password:this.password})
            if(response.code!=201)this.loginError=true
            if(response.status==201){
                //
            }
        } catch(e){
            this.loginError=true
        }
        console.log(response)
    },
    async Registration(){
        var response = await request('api/register','post',{login:this.login,password:this.password})
        if(response.code==404){console.log('aa')}
        console.log(response)
        if(response.data.code==1)this.profileExists=true
        else if (response.data.code==2) {
            this.login=''
            this.password=''
            alert('Профиль создан')
            this.authentication=true
            this.profileExists=false
        }
    }    
    }
}
</script>

<style scoped>
form{
    width: 300px;
    margin: 0 auto;
    border: 1px solid black;
}
</style>