<template>
    <div class="row main">
        <img src="@/assets/log.png" alt="">
        <form class="col s12" v-if="authentication" @submit.prevent="Auth()">
            <div class="input-field row">
                <input class="validate" type="text" name="" id="login" v-model="login" autofocus  required>
                <label for="login">Логин</label>
            </div>
            <div class="input-field row">
                <input type="text" name="" id="password" v-model="password"  required>
                <label for="login">Пароль</label>
            </div>
            
            
            <input type="submit" value="Войти" class="btn">
            <input type="button" value="У меня нет аккаутна" class="btn" @click="authentication=false"><br><br>
            <span v-if="loginError" class="badge red" data-badge-caption="Неверный логин и/или пароль"></span>
        </form>
        <form class="col s12" v-else @submit.prevent="Registration()">
             <div class="input-field row">
                <input type="text" name="" id="login"  v-model="login" required>
                <label for="login">Логин</label>
            </div>
             <div class="input-field row">
                <input type="text" name="" id="password"  v-model="password" required>
                <label for="login">Пароль</label>
            </div>
            <span v-if="loginError" class="badge red" data-badge-caption="Профиль с таким логином уже существует"></span>
            <input type="submit" value="Зарегистрироваться" class="btn">
        </form>
         <div v-if="loading" class="progress">
            <div class="indeterminate"></div>
        </div>
    </div>
</template>

<script>
//import {request} from '../js/request'
import {request} from '../js/request'
import $ from 'jquery'
//import {readCookie} from '../js/readcookie'
export default {
    name: 'Auth',
    data(){
        return{
            login:'admin',
            password:'password',
            token:'',
            authentication:true,
            profileExists:false,
            loginError:false,
            loading:false
        }
    },
    methods:{
    async Auth(){
        this.loading=true;
        this.loginError=false;
        var response;
        try{
            await request('api/auth','post', {login:this.login, password:this.password}).then((response)=>{
                if(response.code!=201)this.loginError=true
                if(response.status==201){
                    let date = new Date(Date.now() + 86400e3);
                    date = date.toUTCString();
                    document.cookie = "token="+response.data.token+"; expires="+date+"; secure";
                    document.cookie = "login="+response.data.login+"; expires="+date+"; secure";
                    this.$router.push('/')
                    this.loading=false;
                }
            })
            
        } catch(e){
            console.log('ERROR:'+e)
            $('.main').append(e)
            this.loginError=true
            this.loading=false;
        }
        console.log(response);
    },
    async Registration(){
        this.profileExists=false;
        this.loading=true
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
            this.$router.push('/auth')
        }
        this.loading=false
    }    
    }
}
</script>

<style lang="scss" scoped>
.main{
    width: 100%;
    height: 500px;
    img{
        margin: 25% auto;
    }
    span{
        width: 100%;
        margin: 0 auto;
        color: white;
    }
    
    
}

form{
    width: 300px;
    margin: 5% auto;
}
</style>