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
            <input type="button" value="У меня нет аккаутна" class="btn" @click="changeState"><br><br>
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
            <div class="input-field row">
                <input type="text" name="" id="password"  v-model="pass" required>
                <label for="login">Серия и номер паспорта</label>
            </div>
            <div class="input-field row">
                <input type="text" name="" id="password"  v-model="license" required>
                <label for="login">Серия и номер вод. удостоверения</label>
            </div>
            <div class="input-field row">
                <input type="text" name="" id="password"  v-model="fio" required>
                <label for="login">ФИО</label>
            </div>
            <div class="input-field row">
                <input type="text" name="" id="password"  v-model="phone" required>
                <label for="login">Номер телефона</label>
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
import {request_post} from '../js/request'
import $ from 'jquery'

export default {
    name: 'Auth',
    data(){
        return{
            login:'',
            password:'',
            token:'',
            pass:'',
            license:'',
            fio:'',
            phone:'',
            authentication:true,
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
            await request_post('api/auth', {login:this.login, password:this.password}).then((response)=>{
                if(response.data.code==1){
                    this.loginError=true;
                    this.loading=false;
                }
                else{
                    let date = new Date(Date.now() + 86400e3);
                    date = date.toUTCString();
                    document.cookie = "token="+response.data.token+"; expires="+date+"; ";
                    document.cookie = "login="+response.data.login+"; expires="+date+"; ";
                    this.$router.push('/profile');
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
        var response = await request_post('api/register',{login:this.login,
        password:this.password,pass:this.pass,license:this.license,fio:this.fio, phone:this.phone})
        if(response.code==404){console.log('aa')}
        console.log(response)
        if(response.data.message=='Profile already exists')this.profileExists=true
        else if (response.data.message=='Profile created') {
            this.login='';
            this.password='';
            alert('Профиль создан');
            this.changeState();
            this.$router.push('/auth');
        }
        else{
            alert('Ошибка создания профиля');
        }
        this.loading=false;
    },
    changeState(){
        this.authentication=!this.authentication;
        this.loginError=this.profileExists=false;
        this.login = this.password=this.license=this.fio=this.phone=this.pass='';
    }  
    }
}
</script>

<style lang="scss" scoped>

@import "../css/main.scss";
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
    .btn{
        background-color: $color_sub;
        margin: 10px;
    }
    .input-field{
        border-bottom: $color_sub;
        box-shadow: $color_sub;
    }
    
    
}

form{
    width: 300px;
    margin: 5% auto;
}
</style>